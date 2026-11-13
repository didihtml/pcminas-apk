import { useState } from 'react'
import { ArrowLeft, ChevronDown, Cookie, Menu, MessageCircle, Search, X } from 'lucide-react'
import courses from './mestrado-data.json'
import brasao from '../assets/mestrado/brasao.png'
import './MestradoPage.css'

const images = import.meta.glob<string>('../assets/mestrado/*.png', { eager: true, query: '?url', import: 'default' })

export default function MestradoPage({ onBack }: { onBack: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [search, setSearch] = useState('')
  const [cookies, setCookies] = useState(() => !localStorage.getItem('puc-mestrado-cookies'))
  const [settings, setSettings] = useState(false)
  const [optional, setOptional] = useState(false)
  const saveCookies = (value: string) => { localStorage.setItem('puc-mestrado-cookies', value); setCookies(false); setSettings(false) }
  return <div className="mestrado-page">
    <header className="mestrado-header"><button onClick={onBack} aria-label="Voltar"><ArrowLeft size={23}/></button><strong>MESTRADO E DOUTORADO</strong><span /></header>
    <div className="mestrado-scroll" onScroll={e=>setScrolled(e.currentTarget.scrollTop > 120)}>
      <div className="mestrado-site-header"><img src={brasao} alt="PUC Minas"/><div><a href="https://www.pucminas.br/" target="_blank" rel="noreferrer">Acesso Restrito ⌄</a><label><input placeholder="Pesquisar..." value={search} onChange={e=>setSearch(e.target.value)}/><Search size={17}/></label></div></div>
      <nav className={`mestrado-site-nav${scrolled?' mestrado-site-nav-scrolled':''}`}><button onClick={()=>setMenu(!menu)} aria-label="Abrir menu" aria-expanded={menu}><Menu size={32}/></button><strong>PUC Minas</strong>{menu && <div className="mestrado-menu"><a href="https://www.pucminas.br/" target="_blank" rel="noreferrer">Portal PUC Minas</a><a href="https://www.pucminas.br/Pos-Graduacao/Paginas/Mestrado-e-Doutorado.aspx" target="_blank" rel="noreferrer">Mestrado e Doutorado</a></div>}</nav>
      <main><h1>ESCOLHA O MELHOR <b>MESTRADO OU DOUTORADO<br/> PARA VOCÊ</b></h1><div className="mestrado-courses">{courses.filter(c=>c.curso.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR'))).map(c => <article className="mestrado-card" key={c.curso}><img src={images[`../assets/mestrado/${c.imagem.split('/').pop()}`]} alt=""/><button onClick={()=>setExpanded(expanded===c.curso?null:c.curso)} aria-expanded={expanded===c.curso}><span>PROGRAMA DE PÓS-GRADUAÇÃO</span><b>{c.curso}</b><ChevronDown size={29} className={expanded===c.curso?'mestrado-rotated':''}/></button>{expanded===c.curso && <div className="mestrado-details"><p>{c.descricao}</p><a href={c.link} target="_blank" rel="noreferrer">SAIBA MAIS</a></div>}</article>)}</div></main>
      <footer className="mestrado-footer"><h2>INSTITUIÇÕES DA ARQUIDIOCESE DE BELO HORIZONTE</h2><p>FUMARC　　 CATEDRAL</p><p>COLÉGIO SANTA MARIA MINAS　　 SMC</p><p>ARQUIDIOCESE DE BELO HORIZONTE</p><p>PUC Minas</p><a href="https://emec.mec.gov.br/" target="_blank" rel="noreferrer">CONSULTE O CADASTRO NO e-MEC</a></footer>
    </div>
    <div className="mestrado-floating"><button onClick={()=>{setCookies(true);setSettings(false)}} aria-label="Configurações de cookies"><Cookie size={28}/></button><a href="https://wa.me/553133194444" target="_blank" rel="noreferrer" aria-label="WhatsApp PUC Minas"><MessageCircle size={27}/></a></div>
    {cookies && <div className="mestrado-cookie" role="dialog" aria-modal="true" aria-labelledby="mestrado-cookie-title"><button className="mestrado-cookie-close" onClick={()=>saveCookies('dismissed')} aria-label="Fechar"><X size={21}/></button><h2 id="mestrado-cookie-title">{settings?'CONFIGURAÇÃO DE COOKIES':'POLÍTICA DE COOKIES'}</h2>{settings ? <><label><input type="checkbox" checked disabled/> Cookies necessários</label><label><input type="checkbox" checked={optional} onChange={e=>setOptional(e.target.checked)}/> Cookies opcionais</label><button onClick={()=>saveCookies(optional?'custom':'rejected')}>Salvar preferências</button><button className="mestrado-outline" onClick={()=>setSettings(false)}>Voltar</button></> : <><p>Usamos cookies para aprimorar a sua experiência no nosso site, melhorando a segurança, a usabilidade e o desempenho, além de personalizar a sua experiência, oferecendo conteúdos mais relevantes, de acordo com suas preferências. Ao clicar em "Aceitar todos" você concorda com o armazenamento de cookies no seu dispositivo, de acordo com os objetivos especificados para cada categoria. <a href="https://www.pucminas.br/" target="_blank" rel="noreferrer">Política de Privacidade</a></p><button className="mestrado-outline" onClick={()=>setSettings(true)}>Personalizar configuração</button><button onClick={()=>saveCookies('rejected')}>Rejeitar Todos</button><button onClick={()=>saveCookies('accepted')}>Aceitar todos os cookies</button></>}</div>}
    <div className="mestrado-safe" />
  </div>
}

