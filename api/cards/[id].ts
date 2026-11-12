import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import { hasCardAccess } from "../_lib/payment-db"

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

export default async function handler(req: { method?: string; query?: { id?: string | string[] }; body?: { status?: string }; headers?: { authorization?: string } }, res: { setHeader: (k: string, v: string) => void; status: (c: number) => { end: () => void; json?: (d: unknown) => void }; json: (d: unknown) => void }) {
  setCorsHeaders(res)

  if (req.method === "OPTIONS") {
    return handleOptions(res)
  }

  const { id } = req.query ?? {}
  const cardId = Array.isArray(id) ? id[0] : id

  if (!cardId) {
    return res.status(400).json({ message: "ID do cartão não informado." })
  }

  try {
    const p = getPrisma()

    if (req.method === "GET") {
      let card = await p.cards.findUnique({ where: { id: cardId } })

      if (!card) {
        card = await p.cards.findFirst({
          where: { codigo: cardId },
          orderBy: { createdAt: "desc" },
        })
      }

      if (!card) {
        return res.status(404).json({ message: "Cartão não encontrado." })
      }

      if (process.env.PAYMENT_GATE_ENABLED === "true" && !(await hasCardAccess(card.id))) {
        return res.status(402).json({ message: "Pagamento necessário para acessar a carteirinha." })
      }

      return res.json({ card: await toCardDto(card) })
    }

    if (req.method === "PATCH") {
      if (process.env.PAYMENT_GATE_ENABLED === "true" && (!process.env.CARDS_ADMIN_TOKEN || req.headers?.authorization !== `Bearer ${process.env.CARDS_ADMIN_TOKEN}`)) {
        return res.status(403).json({ message: "Acesso administrativo necessário." })
      }
      const { status } = req.body ?? {}

      if (!status?.trim()) {
        return res.status(400).json({ message: "Informe o novo status." })
      }

      let card = await p.cards.findUnique({ where: { id: cardId } })

      if (!card) {
        card = await p.cards.findFirst({
          where: { codigo: cardId },
          orderBy: { createdAt: "desc" },
        })
      }

      if (!card) {
        return res.status(404).json({ message: "Cartão não encontrado." })
      }

      const updatedCard = await p.cards.update({
        where: { id: card.id },
        data: { status: status.trim() },
      })

      return res.json({ card: await toCardDto(updatedCard) })
    }

    return res.status(405).json({ message: "Method not allowed" })
  } catch (error: any) {
    console.error("[API ERROR]", error)
    if (error?.code === "P2025") {
      return res.status(404).json({ message: "Cartão não encontrado." })
    }
    return res.status(500).json({
      message: "Erro interno ao acessar o banco PostgreSQL.",
      detail: error?.message ?? String(error),
    })
  }
}
