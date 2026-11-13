import React from 'react'
import { ArrowLeft, MapPin, Phone, MessageCircle, Globe, MessagesSquare } from 'lucide-react'
import { presentations } from './campiPresentations'
import './CampusDetail.css'

interface Campus { id: string; name: string; address: string; imageUrl: string }
const pictures = import.meta.glob<string>('../assets/campi/detail-*.jpg', { eager: true, query: '?url', import: 'default' })
const maps = import.meta.glob<string>('../assets/campi/map-*.jpg', { eager: true, query: '?url', import: 'default' })
const mediaId: Record<string, string> = { 'coracao-eucaristico': 'coracao' }
const phoneFor = (id: string) => id === 'pocos-de-caldas' ? '(35) 3729-9200' : id === 'serro' ? '(38) 3541-2900' : '(31) 3319-4444'

const CampusDetail: React.FC<{ campus: Campus; onBack: () => void }> = ({ campus, onBack }) => {
  const id = mediaId[campus.id] ?? campus.id
  const photo = pictures[`../assets/campi/detail-${id}.jpg`] ?? campus.imageUrl
  const map = maps[`../assets/campi/map-${id}.jpg`]
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`PUC Minas ${campus.name} ${campus.address}`)}`
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(`PUC Minas ${campus.name} ${campus.address}`)}&output=embed`
  const phone = phoneFor(campus.id)
  return <div className="campus-detail">
    <header className="campus-detail-header"><button type="button" onClick={onBack} aria-label="Voltar para Campi"><ArrowLeft size={23}/></button><h1>{campus.name}</h1><span /></header>
    <div className="campus-detail-scroll">
      <main className="campus-detail-content">
        <img className="campus-detail-photo" src={photo} alt={campus.name} />
        <section className="campus-presentation"><h2>APRESENTAÇÃO</h2><p>{presentations[campus.id]}</p></section>
        <section className="campus-location"><h2>LOCALIZAÇÃO</h2>{map ? <a href={mapUrl} target="_blank" rel="noreferrer" aria-label={`Abrir mapa de ${campus.name}`}><img src={map} alt={`Mapa de ${campus.name}`} /></a> : <iframe title={`Mapa de ${campus.name}`} src={embedUrl} loading="lazy" />}</section>
        <div className="campus-info"><div className="campus-info-heading"><span><MapPin size={18} fill="white" /></span><h3>Visite-nos</h3></div><a href={mapUrl} target="_blank" rel="noreferrer">{campus.address}</a></div>
        <div className="campus-info"><div className="campus-info-heading"><span><Phone size={17} fill="white" /></span><h3>Telefone de contato</h3></div><a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a></div>
      </main>
      <section className="campus-contact"><h2>Dúvidas? Fale com a gente</h2><a href="https://www.pucminas.br/central/Paginas/default.aspx" target="_blank" rel="noreferrer"><MessagesSquare size={16}/> Acessar Call Center</a><a href="https://www.pucminas.br/" target="_blank" rel="noreferrer"><Globe size={16}/> Visitar site</a></section>
    </div>
    <a className="campus-whatsapp" href="https://wa.me/553133194444" target="_blank" rel="noreferrer" aria-label="WhatsApp PUC Minas"><MessageCircle size={26} /></a>
  </div>
}
export default CampusDetail
