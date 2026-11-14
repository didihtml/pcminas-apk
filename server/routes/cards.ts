import { Router } from 'express'
import {
  createCard,
  findCardById,
  findCardByIdentifier,
  listCards,
  updateCardStatus,
} from '../services/cards'
import type {
  CreateCardRequestBody,
  LoginRequestBody,
  UpdateCardStatusRequestBody,
} from '../types/cards'

const router = Router()

router.get('/health', (_request, response) => {
  response.json({ ok: true })
})

router.get('/cards', async (_request, response, next) => {
  try {
    const cards = await listCards()
    response.json({ cards })
  } catch (error) {
    next(error)
  }
})

router.get('/cards/:id', async (request, response, next) => {
  try {
    const card = await findCardById(request.params.id)

    if (!card) {
      response.status(404).json({ message: 'Cartão não encontrado.' })
      return
    }

    response.json({ card })
  } catch (error) {
    next(error)
  }
})

router.post('/auth/login', async (request, response, next) => {
  try {
    const { usuario, profile }: LoginRequestBody = request.body ?? {}

    if (!usuario?.trim()) {
      response.status(400).json({ message: 'Informe o CPF ou código cadastrado.' })
      return
    }

    const card = await findCardByIdentifier(usuario, profile === 'aluno')

    if (!card) {
      response.status(401).json({
        message: 'Carteirinha não encontrada para o CPF ou código informado.',
      })
      return
    }

    response.json({ card })
  } catch (error) {
    next(error)
  }
})

router.post('/cards', async (request, response, next) => {
  try {
    const body = request.body as CreateCardRequestBody
    console.log('[DEBUG] POST /cards body recebido:', JSON.stringify(body, null, 2))

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
      response.status(400).json({
        message: 'Preencha id, nome, cpf, curso, instituicao, validade, fotoUrl e status.',
      })
      return
    }

    const card = await createCard(body)
    console.log('[DEBUG] Card criado com sucesso:', JSON.stringify(card, null, 2))
    response.status(201).json({ card })
  } catch (error) {
    console.error('[DEBUG] Erro ao criar card:', error)
    next(error)
  }
})

router.patch('/cards/:id/status', async (request, response, next) => {
  try {
    const { status }: UpdateCardStatusRequestBody = request.body ?? {}

    if (!status?.trim()) {
      response.status(400).json({ message: 'Informe o novo status.' })
      return
    }

    const card = await updateCardStatus(request.params.id, status)
    response.json({ card })
  } catch (error) {
    next(error)
  }
})

export default router
