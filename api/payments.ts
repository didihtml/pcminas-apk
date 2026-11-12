import { randomUUID } from "node:crypto";
import { paymentDb, hasCardAccess } from "./_lib/payment-db";
import { createPixSale, getSaleStatus, CARD_UPDATE_AMOUNT_CENTS } from "./_lib/blackcat";

type Request = { method?: string; body?: { action?: string; identifier?: string; email?: string; phone?: string; orderId?: string } };
type Response = { status: (code: number) => { json: (data: unknown) => void }; json: (data: unknown) => void };

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método não permitido." });
  if (process.env.PAYMENT_GATE_ENABLED !== "true") return res.status(503).json({ message: "Pagamento ainda não disponível." });
  const { action, identifier, email, phone, orderId } = req.body ?? {};
  try {
    const db = paymentDb();
    if (action === "create") {
      const value = identifier?.trim() ?? "";
      const digits = value.replace(/\D/g, "");
      if (!value || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !phone || phone.replace(/\D/g, "").length < 10) return res.status(400).json({ message: "Informe e-mail e telefone válidos." });
      const found = await db.query('SELECT id, nome, cpf FROM cards WHERE id = $1 OR ($2 <> \'\' AND regexp_replace(cpf, \'[^0-9]\', \'\', \'g\') = $2) ORDER BY "createdAt" DESC LIMIT 1', [value, digits]);
      const card = found.rows[0];
      if (!card) return res.status(404).json({ message: "Carteirinha não encontrada." });
      if (await hasCardAccess(card.id)) return res.json({ paid: true });
      const id = randomUUID();
      await db.query('INSERT INTO card_payment_orders (id, card_id, amount_cents) VALUES ($1, $2, $3)', [id, card.id, CARD_UPDATE_AMOUNT_CENTS]);
      let sale;
      try {
        sale = await createPixSale({ name: card.nome, cpf: card.cpf, email: email.trim(), phone }, id);
        if (!sale.transactionId || sale.amount !== CARD_UPDATE_AMOUNT_CENTS || !(sale.paymentData?.copyPaste || sale.paymentData?.qrCode)) throw new Error("Resposta de pagamento inválida");
        await db.query('UPDATE card_payment_orders SET transaction_id = $1, status = $2, updated_at = now() WHERE id = $3', [sale.transactionId, "PENDING", id]);
      } catch (error) {
        await db.query("UPDATE card_payment_orders SET status = 'ERROR', updated_at = now() WHERE id = $1", [id]);
        throw error;
      }
      return res.json({ orderId: id, pix: sale.paymentData?.copyPaste || sale.paymentData?.qrCode, expiresAt: sale.paymentData?.expiresAt });
    }
    if (action === "status") {
      if (!orderId || !/^[0-9a-f-]{36}$/i.test(orderId)) return res.status(400).json({ message: "Pedido inválido." });
      const found = await db.query('SELECT card_id, transaction_id FROM card_payment_orders WHERE id = $1', [orderId]);
      const order = found.rows[0];
      if (!order?.transaction_id) return res.status(404).json({ message: "Pedido não encontrado." });
      const sale = await getSaleStatus(order.transaction_id);
      if (sale.transactionId !== order.transaction_id || sale.amount !== CARD_UPDATE_AMOUNT_CENTS) throw new Error("Dados da transação divergentes");
      if (sale.status === "PAID") {
        const client = await db.connect();
        try {
          await client.query("BEGIN");
          await client.query("UPDATE card_payment_orders SET status = 'PAID', updated_at = now() WHERE id = $1", [orderId]);
          await client.query("INSERT INTO card_payment_access (card_id, paid_at) VALUES ($1, now()) ON CONFLICT (card_id) DO UPDATE SET paid_at = COALESCE(card_payment_access.paid_at, EXCLUDED.paid_at)", [order.card_id]);
          await client.query("COMMIT");
        } catch (error) { await client.query("ROLLBACK"); throw error; } finally { client.release(); }
        return res.json({ paid: true });
      }
      return res.json({ paid: false, status: sale.status });
    }
    return res.status(400).json({ message: "Ação inválida." });
  } catch {
    return res.status(500).json({ message: "Não foi possível processar o pagamento. Tente novamente." });
  }
}
