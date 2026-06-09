import { existsSync } from 'node:fs'
import { copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

const PORTAL_UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'cards')

function getPainelAdminUploadsDir(): string | null {
  const envPath = process.env.PAINEL_ADMIN_UPLOADS_PATH?.trim()

  if (envPath) {
    return path.resolve(envPath)
  }

  // Fallback: tenta caminho relativo padrão do monorepo
  const fallback = path.join(process.cwd(), '..', '..', 'painel-puc', 'public', 'uploads', 'cards')
  if (existsSync(fallback)) {
    return fallback
  }

  return null
}

/**
 * Sincroniza a imagem do card do painel-admin para a pasta public/uploads/cards
 * deste app portal. Retorna a fotoUrl (path relativo) que pode ser usada no frontend.
 */
export async function syncCardImage(fotoUrl: string): Promise<string> {
  if (!fotoUrl || !fotoUrl.startsWith('/uploads/cards/')) {
    return fotoUrl
  }

  const fileName = path.basename(fotoUrl)
  const portalFilePath = path.join(PORTAL_UPLOADS_DIR, fileName)

  // Já existe no portal? Retorna o path como está
  if (existsSync(portalFilePath)) {
    return fotoUrl
  }

  const painelDir = getPainelAdminUploadsDir()
  if (!painelDir) {
    console.warn(`[syncCardImage] Diretório do painel-admin não encontrado. fotoUrl=${fotoUrl}`)
    return fotoUrl
  }

  const painelFilePath = path.join(painelDir, fileName)

  if (!existsSync(painelFilePath)) {
    console.warn(`[syncCardImage] Arquivo não encontrado no painel-admin: ${painelFilePath}`)
    return fotoUrl
  }

  try {
    await mkdir(PORTAL_UPLOADS_DIR, { recursive: true })
    await copyFile(painelFilePath, portalFilePath)
    console.log(`[syncCardImage] Copiado: ${painelFilePath} -> ${portalFilePath}`)
    return fotoUrl
  } catch (error) {
    console.error(`[syncCardImage] Erro ao copiar arquivo:`, error)
    return fotoUrl
  }
}
