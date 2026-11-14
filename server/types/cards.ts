export interface CardDto {
  id: string
  codigo: string | null
  nome: string
  cpf: string
  rg: string | null
  nascimento: string | null
  campus: string | null
  curso: string
  instituicao: string
  validade: string
  fotoUrl: string
  status: string
  atribuicao: string | null
  codigoAcesso: string | null
  createdAt: string
  schedule?: Array<{ id: string; weekday: number; startTime: string; endTime: string; subject: string; code: string | null; location: string | null; professor: string | null }>
}

export interface LoginRequestBody {
  usuario?: string
  senha?: string
  origem?: string
  profile?: 'aluno' | 'professor'
}

export interface CreateCardRequestBody {
  id: string
  codigo: string
  nome: string
  cpf: string
  rg?: string
  nascimento?: string
  campus?: string
  curso: string
  instituicao: string
  validade: string
  fotoUrl: string
  status: string
  atribuicao?: string
  codigoAcesso?: string
  alunoUsuario?: string
  alunoSenhaHash?: string
  origem?: string
}

export interface UpdateCardStatusRequestBody {
  status?: string
}
