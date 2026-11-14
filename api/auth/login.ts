import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import { hasCardAccess } from "../_lib/payment-db.js"

/**
 * Configuração CORS
 */
function setCorsHeaders(res: { setHeader: (key: string, value: string) => void }) {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT")
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization")
}

function handleOptions(res: { status: (code: number) => { end: () => void } }) {
  res.status(200).end()
}

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, "")
  if (digits.length !== 11) return value
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
}

import type { cards } from "@prisma/client"

async function toCardDto(card: cards | null) {
  if (!card) return null

  const fotoUrl = card.fotoUrl && card.fotoUrl.startsWith("/uploads/cards/")
    ? card.fotoUrl
    : card.fotoUrl

  return {
    id: card.id,
    codigo: card.codigo ?? null,
    nome: card.nome,
    cpf: card.cpf,
    rg: card.rg ?? null,
    nascimento: card.nascimento ? card.nascimento.toISOString() : null,
    campus: card.campus ?? null,
    curso: card.curso,
    instituicao: card.instituicao,
    validade: card.validade.toISOString(),
    fotoUrl,
    status: card.status,
    atribuicao: card.atribuicao ?? null,
    codigoAcesso: card.codigoAcesso ?? null,
    createdAt: card.createdAt.toISOString(),
  }
}

// Lazy init Prisma Client
let prisma: PrismaClient | null = null
function getPrisma() {
  if (!prisma) {
    const connectionString = process.env.DATABASE_URL
    if (!connectionString) throw new Error("DATABASE_URL is not defined")
    prisma = new PrismaClient({
      adapter: new PrismaPg(connectionString),
    })
  }
  return prisma
}

export default async function handler(req: { method?: string; body?: { usuario?: string; senha?: string; profile?: string } }, res: { setHeader: (k: string, v: string) => void; status: (c: number) => { end: () => void; json?: (d: unknown) => void }; json: (d: unknown) => void }) {
  setCorsHeaders(res)

  if (req.method === "OPTIONS") {
    return handleOptions(res)
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const p = getPrisma()
    const { usuario, profile } = req.body ?? {}

    if (typeof usuario !== "string" || !usuario.trim()) {
      return res.status(400).json({
        message: "Informe o CPF ou código cadastrado.",
      })
    }

    const value = usuario.trim()
    const digits = value.replace(/\D/g, "")
    const cpfCandidates = Array.from(new Set([value, digits, formatCpf(digits)]))

    const card = await p.cards.findFirst({
      where: {
        OR: [
          { id: value },
          { alunoUsuario: value },
          ...(profile === "aluno" && /^\d{6}$/.test(value) ? [{ codigo: value }] : []),
          ...cpfCandidates.map((cpf) => ({ cpf })),
        ],
      },
      orderBy: { createdAt: "desc" },
    })

    if (!card) {
      return res.status(401).json({
        message: "Carteirinha não encontrada para o CPF ou código informado.",
      })
    }

    if (process.env.PAYMENT_GATE_ENABLED === "true" && !(await hasCardAccess(card.id))) {
      return res.status(402).json({ message: "Pagamento necessário para acessar a carteirinha.", paymentRequired: true })
    }
    const cardDto = await toCardDto(card)
    const scheduleSchema = await p.$queryRaw<Array<{ ready: boolean }>>`
      SELECT to_regclass('public.student_schedule') IS NOT NULL AS ready
    `
    const schedule = scheduleSchema[0]?.ready
      ? await p.$queryRaw<Array<{ id: string; weekday: number; start_time: string; end_time: string; subject: string; code: string | null; location: string | null; professor: string | null }>>`
          SELECT id::text, weekday, to_char(start_time, 'HH24:MI') AS start_time,
            to_char(end_time, 'HH24:MI') AS end_time, subject, code, location, professor
          FROM student_schedule WHERE card_id = ${card.id} ORDER BY weekday, start_time, id
        `
      : []
    const scheduleEntries = schedule.map(item => ({ id: item.id, weekday: item.weekday, startTime: item.start_time, endTime: item.end_time, subject: item.subject, code: item.code, location: item.location, professor: item.professor }))
    const academicSchema = await p.$queryRaw<Array<{ disciplines: boolean; contacts: boolean; bills: boolean }>>`
      SELECT to_regclass('public.student_disciplines') IS NOT NULL AS disciplines,
        to_regclass('public.student_contacts') IS NOT NULL AS contacts,
        to_regclass('public.student_bills') IS NOT NULL AS bills
    `
    const schema = academicSchema[0]
    const result = schema?.disciplines
      ? await p.$queryRaw<Array<{ id: string; name: string; code: string | null; grade: string | null; grade_max: string | null; absences: number | null; absence_limit: number | null }>>`
        SELECT id::text, name, code, grade::text, grade_max::text, absences, absence_limit
        FROM student_disciplines WHERE card_id = ${card.id} ORDER BY created_at, id
      `
      : []
    const contacts = schema?.contacts ? await p.$queryRaw<Array<{ email: string }>>`SELECT email FROM student_contacts WHERE card_id = ${card.id}` : []
    const bills = schema?.bills
      ? await p.$queryRaw<Array<{ id: string; description: string; due_date: string; amount_cents: number; status: string; payment_url: string | null }>>`
        SELECT id::text, description, due_date::text, amount_cents, status, payment_url
        FROM student_bills WHERE card_id = ${card.id} ORDER BY due_date DESC, id
      `
      : undefined
    return res.json({ card: { ...cardDto, schedule: scheduleEntries, email: contacts[0]?.email ?? null, bills: bills?.map((item) => ({ id: item.id, description: item.description, dueDate: item.due_date, amountCents: item.amount_cents, status: item.status, paymentUrl: item.payment_url })), disciplines: result.map((item) => ({ id: item.id, name: item.name, code: item.code, grade: item.grade === null ? null : Number(item.grade), gradeMax: item.grade_max === null ? null : Number(item.grade_max), absences: item.absences, absenceLimit: item.absence_limit })) } })
  } catch (error: any) {
    console.error("[API ERROR]", error)
    return res.status(500).json({
      message: "Erro interno ao acessar o banco PostgreSQL.",
      detail: error?.message ?? String(error),
    })
  }
}
