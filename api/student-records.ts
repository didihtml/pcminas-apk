import { randomUUID, timingSafeEqual } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";

let client: PrismaClient | undefined;
function database() {
  if (!client) client = new PrismaClient({ adapter: new PrismaPg(process.env.DATABASE_URL!) });
  return client;
}

function authorized(header: string | undefined) {
  const expected = process.env.STUDENT_RECORDS_ADMIN_TOKEN;
  if (!expected || !header?.startsWith("Bearer ")) return false;
  const actual = Buffer.from(header.slice(7));
  const target = Buffer.from(expected);
  return actual.length === target.length && timingSafeEqual(actual, target);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (!authorized(req.headers.authorization)) return res.status(403).json({ message: "Acesso administrativo não autorizado." });
  if (req.method !== "POST") return res.status(405).json({ message: "Método não permitido." });
  const body = req.body ?? {};
  const cardId = typeof body.cardId === "string" ? body.cardId.trim() : "";
  if (!cardId || cardId.length > 128) return res.status(400).json({ message: "Informe o identificador do aluno." });
  try {
    const db = database();
    const card = await db.cards.findUnique({ where: { id: cardId }, select: { id: true, nome: true, curso: true } });
    if (!card) return res.status(404).json({ message: "Aluno não encontrado." });
    if (body.action === "consultar") {
      const disciplines = await db.$queryRaw`SELECT id::text, name, code, grade::text, grade_max::text, absences, absence_limit FROM student_disciplines WHERE card_id = ${cardId} ORDER BY created_at, id`;
      const bills = await db.$queryRaw`SELECT id::text, description, due_date::text, amount_cents, status, payment_url FROM student_bills WHERE card_id = ${cardId} ORDER BY due_date DESC, id`;
      return res.json({ card, disciplines, bills });
    }
    if (body.action === "disciplina") {
      const name = typeof body.name === "string" ? body.name.trim() : "";
      const code = typeof body.code === "string" ? body.code.trim() : "";
      const grade = body.grade === "" ? null : Number(body.grade);
      const gradeMax = body.gradeMax === "" ? null : Number(body.gradeMax);
      const absences = body.absences === "" ? null : Number(body.absences);
      const absenceLimit = body.absenceLimit === "" ? null : Number(body.absenceLimit);
      if (!name || name.length > 200 || code.length > 100 || (grade !== null && (!Number.isFinite(grade) || grade < 0 || gradeMax === null || !Number.isFinite(gradeMax) || gradeMax <= 0 || grade > gradeMax)) || (gradeMax !== null && (!Number.isFinite(gradeMax) || gradeMax <= 0)) || (absences !== null && (!Number.isInteger(absences) || absences < 0 || absenceLimit === null)) || (absenceLimit !== null && (!Number.isInteger(absenceLimit) || absenceLimit <= 0))) return res.status(400).json({ message: "Confira o nome, a nota e os limites informados." });
      const id = typeof body.id === "string" ? body.id : "";
      if (id && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return res.status(400).json({ message: "Identificador inválido." });
      if (id) {
        const count = await db.$executeRaw`UPDATE student_disciplines SET name = ${name}, code = ${code || null}, grade = ${grade}, grade_max = ${gradeMax}, absences = ${absences}, absence_limit = ${absenceLimit} WHERE id = ${id}::uuid AND card_id = ${cardId}`;
        if (!count) return res.status(404).json({ message: "Disciplina não encontrada." });
      } else await db.$executeRaw`INSERT INTO student_disciplines (id, card_id, name, code, grade, grade_max, absences, absence_limit) VALUES (${randomUUID()}::uuid, ${cardId}, ${name}, ${code || null}, ${grade}, ${gradeMax}, ${absences}, ${absenceLimit})`;
      return res.json({ message: "Disciplina salva." });
    }
    if (body.action === "boleto") {
      const description = typeof body.description === "string" ? body.description.trim() : "";
      const dueDate = typeof body.dueDate === "string" ? body.dueDate : "";
      const amountCents = Number(body.amountCents);
      const status = body.status;
      const paymentUrl = typeof body.paymentUrl === "string" ? body.paymentUrl.trim() : "";
      let validUrl = !paymentUrl;
      try { if (paymentUrl) validUrl = new URL(paymentUrl).protocol === "https:"; } catch { validUrl = false; }
      if (!description || description.length > 200 || !/^\d{4}-\d{2}-\d{2}$/.test(dueDate) || !Number.isInteger(amountCents) || amountCents < 0 || amountCents > 2147483647 || !["PENDENTE", "PAGO", "CANCELADO"].includes(status) || !validUrl) return res.status(400).json({ message: "Confira a descrição, data, valor, situação e link HTTPS." });
      const id = typeof body.id === "string" ? body.id : "";
      if (id && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return res.status(400).json({ message: "Identificador inválido." });
      if (id) {
        const count = await db.$executeRaw`UPDATE student_bills SET description = ${description}, due_date = ${dueDate}::date, amount_cents = ${amountCents}, status = ${status}, payment_url = ${paymentUrl || null} WHERE id = ${id}::uuid AND card_id = ${cardId}`;
        if (!count) return res.status(404).json({ message: "Boleto não encontrado." });
      } else await db.$executeRaw`INSERT INTO student_bills (id, card_id, description, due_date, amount_cents, status, payment_url) VALUES (${randomUUID()}::uuid, ${cardId}, ${description}, ${dueDate}::date, ${amountCents}, ${status}, ${paymentUrl || null})`;
      return res.json({ message: "Boleto salvo." });
    }
    return res.status(400).json({ message: "Ação inválida." });
  } catch (error) {
    console.error("Erro ao gerenciar registros do aluno", error);
    return res.status(500).json({ message: "Não foi possível acessar os registros. Verifique a configuração do banco." });
  }
}
