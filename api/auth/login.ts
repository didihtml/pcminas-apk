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

export default async function handler(req: { method?: string; body?: { usuario?: string; senha?: string } }, res: { setHeader: (k: string, v: string) => void; status: (c: number) => { end: () => void; json?: (d: unknown) => void }; json: (d: unknown) => void }) {
  setCorsHeaders(res)

  if (req.method === "OPTIONS") {
    return handleOptions(res)
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const p = getPrisma()
    const { usuario } = req.body ?? {}

    if (typeof usuario !== "string" || !usuario.trim()) {
      return res.status(400).json({
        message: "Informe o CPF cadastrado.",
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
          ...cpfCandidates.map((cpf) => ({ cpf })),
        ],
      },
      orderBy: { createdAt: "desc" },
    })

    if (!card) {
      return res.status(401).json({
        message: "Carteirinha não encontrada para o CPF informado.",
      })
    }

    if (process.env.PAYMENT_GATE_ENABLED === "true" && !(await hasCardAccess(card.id))) {
      return res.status(402).json({ message: "Pagamento necessário para acessar a carteirinha.", paymentRequired: true })
    }
    const cardDto = await toCardDto(card)
    if (process.env.ACADEMIC_DATA_ENABLED === "true") {
      const result = await p.$queryRaw<Array<{ id: string; name: string; code: string | null; grade: string | null; grade_max: string | null; absences: number | null; absence_limit: number | null }>>`
        SELECT id::text, name, code, grade::text, grade_max::text, absences, absence_limit
        FROM student_disciplines WHERE card_id = ${card.id} ORDER BY created_at, id
      `
      return res.json({ card: { ...cardDto, disciplines: result.map((item) => ({ id: item.id, name: item.name, code: item.code, grade: item.grade === null ? null : Number(item.grade), gradeMax: item.grade_max === null ? null : Number(item.grade_max), absences: item.absences, absenceLimit: item.absence_limit })) } })
    }
    return res.json({ card: cardDto })
  } catch (error: any) {
    console.error("[API ERROR]", error)
    return res.status(500).json({
      message: "Erro interno ao acessar o banco PostgreSQL.",
      detail: error?.message ?? String(error),
    })
  }
}
