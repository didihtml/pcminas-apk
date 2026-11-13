import { useRef, useState, type ChangeEvent } from 'react'
import { createPortal } from 'react-dom'
import { Pencil } from 'lucide-react'
import type { AccessCard } from '../../types'
import './ProfilePhoto.css'

const maxFileSize = 12 * 1024 * 1024

async function preparePhoto(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Selecione um arquivo de imagem.')
  if (file.size > maxFileSize) throw new Error('Escolha uma imagem de até 12 MB.')
  const url = URL.createObjectURL(file)
  try {
    const image = new Image()
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error('Não foi possível abrir esta imagem.'))
      image.src = url
    })
    const side = Math.min(image.naturalWidth, image.naturalHeight)
    if (!side) throw new Error('Não foi possível abrir esta imagem.')
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 512
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Não foi possível preparar a imagem neste aparelho.')
    context.drawImage(image, (image.naturalWidth - side) / 2, (image.naturalHeight - side) / 2, side, side, 0, 0, 512, 512)
    return canvas.toDataURL('image/jpeg', 0.86)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export default function ProfilePhoto({ card }: { card: AccessCard }) {
  const storageKey = `puc-profile-photo:${card.id}`
  const [photo, setPhoto] = useState(() => {
    try { return localStorage.getItem(storageKey) || card.fotoUrl || '' } catch { return card.fotoUrl || '' }
  })
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const camera = useRef<HTMLInputElement>(null)
  const gallery = useRef<HTMLInputElement>(null)

  const selectPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ''
    if (!file) return
    try {
      const data = await preparePhoto(file)
      localStorage.setItem(storageKey, data)
      setPhoto(data)
      setError('')
      setOpen(false)
    } catch (err) {
      setError(err instanceof Error && err.name !== 'QuotaExceededError' ? err.message : 'Não foi possível salvar a foto neste aparelho.')
      setOpen(true)
    }
  }

  return <div className="profile-photo-container">
    <button type="button" className="profile-photo-button" aria-label="Alterar foto de perfil" onClick={() => { setError(''); setOpen(true) }}>
      <span className="profile-photo-circle">{photo && <img src={photo} alt="Foto de perfil" onError={() => setPhoto('')} />}</span>
      <span className="profile-photo-edit"><Pencil size={10} aria-hidden="true" /></span>
    </button>
    <input ref={camera} className="profile-photo-input" type="file" accept="image/*" capture="user" onChange={selectPhoto} aria-label="Tirar foto" />
    <input ref={gallery} className="profile-photo-input" type="file" accept="image/*" onChange={selectPhoto} aria-label="Selecionar foto da galeria" />
    {open && createPortal(<div className="profile-photo-layer">
      <button className="profile-photo-overlay" aria-label="Fechar opções de foto" onClick={() => setOpen(false)} />
      <div className="profile-photo-sheet" role="dialog" aria-modal="true" aria-labelledby="profile-photo-title">
        <h2 id="profile-photo-title">Selecione uma opção</h2>
        {error && <p className="profile-photo-error" role="alert">{error}</p>}
        <button type="button" onClick={() => camera.current?.click()}>Câmera</button>
        <button type="button" onClick={() => gallery.current?.click()}>Galeria de Fotos</button>
        <button type="button" onClick={() => setOpen(false)}>Cancelar</button>
      </div>
    </div>, document.body)}
  </div>
}
