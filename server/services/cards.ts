import type { cards } from '@prisma/client'
import prisma from '../../lib/prisma'
import type { CardDto, CreateCardRequestBody } from '../types/cards'
import { syncCardImage } from '../utils/syncCardImage'

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, '')

  if (digits.length !== 11) {
    return value
  }

  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

async function toCardDto(card: cards): Promise<CardDto> {
  const fotoUrl = await syncCardImage(card.fotoUrl)
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

export async function listCards() {
  const cards = await prisma.cards.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return Promise.all(cards.map(toCardDto))
}

export async function findCardById(id: string) {
  const card = await prisma.cards.findUnique({
    where: { id },
  })

  return card ? await toCardDto(card) : null
}

export async function findCardByIdentifier(identifier: string, allowStudentCode = false) {
  const value = identifier.trim()
  const digits = value.replace(/\D/g, '')
  const cpfCandidates = Array.from(new Set([value, digits, formatCpf(digits)]))

  const card = await prisma.cards.findFirst({
    where: {
      OR: [
        { id: value },
        { alunoUsuario: value },
        ...(allowStudentCode && /^\d{6}$/.test(value) ? [{ codigo: value }] : []),
        ...cpfCandidates.map((cpf) => ({ cpf })),
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return card ? await toCardDto(card) : null
}

export async function createCard(data: CreateCardRequestBody) {
  const card = await prisma.cards.create({
    data: {
      id: data.id.trim(),
      codigo: data.codigo.trim(),
      nome: data.nome.trim(),
      cpf: data.cpf.trim(),
      rg: data.rg?.trim(),
      nascimento: data.nascimento ? new Date(data.nascimento) : undefined,
      campus: data.campus?.trim(),
      curso: data.curso.trim(),
      instituicao: data.instituicao.trim(),
      validade: new Date(data.validade),
      fotoUrl: data.fotoUrl.trim(),
      status: data.status.trim(),
      atribuicao: data.atribuicao?.trim(),
      codigoAcesso: data.codigoAcesso?.trim(),
      alunoUsuario: data.alunoUsuario?.trim() ?? data.cpf.trim(),
      alunoSenhaHash: data.alunoSenhaHash?.trim() ?? '',
      origem: data.origem?.trim() ?? 'SGA',
    },
  })

  return await toCardDto(card)
}

export async function updateCardStatus(id: string, status: string) {
  const card = await prisma.cards.update({
    where: { id },
    data: { status: status.trim() },
  })

  return await toCardDto(card)
}
