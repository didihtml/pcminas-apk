import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface Props { identifier: string; apiBaseUrl: string; onBack: () => void; onPaid: () => void; }
const PaymentPage: React.FC<Props> = ({ identifier, apiBaseUrl, onBack, onPaid }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<{ orderId: string; pix: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const request = async (body: object) => {
    const res = await fetch(`${apiBaseUrl}/api/payments`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Não foi possível processar o pagamento.");
    return result;
  };
  const create = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const result = await request({ action: "create", identifier, email, phone });
      if (result.paid) { onPaid(); return; }
      if (!result.orderId || !result.pix) throw new Error("O código Pix não foi disponibilizado.");
      setOrder({ orderId: result.orderId, pix: result.pix });
    } catch (error) { setMessage(error instanceof Error ? error.message : "Falha ao criar pagamento."); }
    finally { setBusy(false); }
  };
  const check = async () => {
    if (!order) return;
    setBusy(true); setMessage("");
    try {
      const result = await request({ action: "status", orderId: order.orderId });
      if (result.paid) onPaid();
      else setMessage(result.status === "CANCELLED" ? "Este Pix expirou ou foi cancelado. Volte e gere outro pagamento." : "Pagamento ainda não confirmado. Tente novamente em instantes.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Falha ao verificar pagamento."); }
    finally { setBusy(false); }
  };
  return <main className="min-h-[100dvh] bg-[#0d111d] px-5 pb-32 pt-14 text-white">
    <button type="button" onClick={onBack} className="mb-8 text-sm text-[#b4c9d9]">← Voltar</button>
    <h1 className="text-xl font-bold">Atualização de acesso</h1>
    <p className="mt-3 text-sm leading-5 text-[#bbc4d0]">Pagamento único para acesso à carteirinha. Responsável pela cobrança: CHEAD NIVUS.</p>
    <div className="mt-6 rounded-xl border border-white/10 bg-[#141720] p-5"><p className="text-sm text-[#aeb7c4]">Valor total</p><p className="mt-1 text-2xl font-bold">R$ 14,90</p><p className="mt-1 text-xs text-[#aeb7c4]">Pagamento via Pix pela Blackcat</p></div>
    {!order ? <form onSubmit={create} className="mt-6 space-y-4"><p className="text-sm text-[#bbc4d0]">Informe seus dados para gerar o Pix.</p><label className="block text-sm">E-mail<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-white/20 bg-[#141720] px-4 py-3 text-white" /></label><label className="block text-sm">Telefone com DDD<input required type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} className="mt-2 w-full rounded-lg border border-white/20 bg-[#141720] px-4 py-3 text-white" /></label><button disabled={busy} className="w-full rounded-lg bg-[#00537d] px-4 py-3 font-semibold disabled:opacity-60">{busy ? "Gerando Pix..." : "Gerar Pix de R$ 14,90"}</button></form> : <section className="mt-6 flex flex-col items-center"><p className="mb-4 text-center text-sm">Escaneie o QR Code ou copie o código Pix no aplicativo do seu banco.</p><div className="rounded-lg bg-white p-3"><QRCodeSVG value={order.pix} size={200} /></div><textarea readOnly value={order.pix} aria-label="Código Pix copia e cola" className="mt-4 h-20 w-full rounded-lg border border-white/20 bg-[#141720] p-3 text-xs"/><button type="button" onClick={() => { void navigator.clipboard.writeText(order.pix).then(() => setMessage("Código Pix copiado."), () => setMessage("Selecione e copie o código Pix acima.")); }} className="mt-3 w-full rounded-lg border border-white/30 px-4 py-3">Copiar código Pix</button><button type="button" disabled={busy} onClick={() => void check()} className="mt-3 w-full rounded-lg bg-[#00537d] px-4 py-3 font-semibold disabled:opacity-60">{busy ? "Verificando..." : "Já paguei — verificar pagamento"}</button></section>}
    {message && <p role="status" className="mt-4 text-sm text-[#d6dee8]">{message}</p>}
  </main>;
};
export default PaymentPage;
