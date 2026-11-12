import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import type { CreateCardRequestBody } from "../server/types/cards"

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

export default async function handler(req: { method?: string; body?: unknown; headers?: { authorization?: string } }, res: { setHeader: (k: string, v: string) => void; status: (c: number) => { end: () => void; json?: (d: unknown) => void }; json: (d: unknown) => void }) {
  setCorsHeaders(res)

  if (req.method === "OPTIONS") {
    return handleOptions(res)
  }

  if (process.env.PAYMENT_GATE_ENABLED === "true" && (!process.env.CARDS_ADMIN_TOKEN || req.headers?.authorization !== `Bearer ${process.env.CARDS_ADMIN_TOKEN}`)) {
    return res.status(403).json({ message: "Acesso administrativo necessário." })
  }

  try {
    const p = getPrisma()

    if (req.method === "GET") {
      const cards = await p.cards.findMany({
        orderBy: { createdAt: "desc" },
      })
      const dtos = await Promise.all(cards.map((c) => toCardDto(c)))
      return res.json({ cards: dtos.filter(Boolean) })
    }

    if (req.method === "POST") {
      const body = req.body as CreateCardRequestBody
      console.log("[DEBUG] POST /api/cards body:", JSON.stringify(body, null, 2))

      if (
        !body?.id?.trim() ||
        !body.nome?.trim() ||
        !body.cpf?.trim() ||
        !body.curso?.trim() ||
        !body.instituicao?.trim() ||
        !body.validade?.trim() ||
        !body.fotoUrl?.trim() ||
        !body.status?.trim()
      ) {
        return res.status(400).json({
          message: "Preencha id, nome, cpf, curso, instituicao, validade, fotoUrl e status.",
        })
      }

      const card = await p.cards.create({
        data: {
          id: body.id.trim(),
          codigo: body.codigo?.trim(),
          nome: body.nome.trim(),
          cpf: body.cpf.trim(),
          rg: body.rg?.trim(),
          nascimento: body.nascimento ? new Date(body.nascimento) : undefined,
          campus: body.campus?.trim(),
          curso: body.curso.trim(),
          instituicao: body.instituicao.trim(),
          validade: new Date(body.validade),
          fotoUrl: body.fotoUrl.trim(),
          status: body.status.trim(),
          atribuicao: body.atribuicao?.trim(),
          codigoAcesso: body.codigoAcesso?.trim(),
          alunoUsuario: body.alunoUsuario?.trim() ?? body.cpf.trim(),
          alunoSenhaHash: body.alunoSenhaHash?.trim() ?? "",
          origem: body.origem?.trim() ?? "SGA",
        },
      })

      console.log("[DEBUG] Card criado:", JSON.stringify(card, null, 2))
      return res.status(201).json({ card: await toCardDto(card) })
    }

    return res.status(405).json({ message: "Method not allowed" })
  } catch (error: any) {
    console.error("[API ERROR]", error)
    return res.status(500).json({
      message: "Erro interno ao acessar o banco PostgreSQL.",
      detail: error?.message ?? String(error),
    })
  }
}
