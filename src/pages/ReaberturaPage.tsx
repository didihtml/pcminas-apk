import { useRef, useState } from 'react'
import { ArrowLeft, ChevronDown, Cookie, LogIn, Menu, MessageCircle, Search, ShoppingCart, X } from 'lucide-react'
import courses from './reabertura-data.json'
import './ReaberturaPage.css'

const pictures = import.meta.glob<string>('../assets/reabertura/*.png', { eager: true, query: '?url', import: 'default' })
const catalog = 'https://vemprapuc.pucminas.br/loja/busca.php?loja=548342&categoria=129'
const store = 'https://vemprapuc.pucminas.br/'

export default function ReaberturaPage({ onBack }: { onBack: () => void }) {
  const [page, setPage] = useState(0)
  const [menu, setMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [cookies, setCookies] = useState(() => !localStorage.getItem('puc-reabertura-cookies'))
  const [settings, setSettings] = useState(false)
  const [optional, setOptional] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const normalized = search.trim().toLocaleLowerCase('pt-BR')
  const visible = normalized ? courses.flat().filter(course => course.title.toLocaleLowerCase('pt-BR').includes(normalized)) : courses[page]
  const changePage = (value: number) => { setPage(value); scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }) }
  const save = (value: string) => { localStorage.setItem('puc-reabertura-cookies', value); setCookies(false); setSettings(false) }
  return <div className="reab-page">
    <header className="reab-app-header"><button type="button" onClick={onBack} aria-label="Voltar"><ArrowLeft size={23} /></button><strong>REABERTURA DE MATRÍCULA</strong><span /></header>
    <div className="reab-scroll" ref={scrollRef}>
      <nav className="reab-site-nav">
        <button type="button" aria-label="Abrir menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><Menu size={19}/></button>
        <button type="button" aria-label="Pesquisar cursos" aria-expanded={showSearch} onClick={() => setShowSearch(!showSearch)}><Search size={20}/></button>
        <a className="reab-brand" href={store} target="_blank" rel="noreferrer"><img src="/logo-splash.png" alt=""/><strong>PUC Minas</strong></a>
        <a href={store} target="_blank" rel="noreferrer" aria-label="Carrinho no portal"><ShoppingCart size={20}/></a>
        <a href="https://vemprapuc.pucminas.br/painel-do-candidato" target="_blank" rel="noreferrer" aria-label="Acessar painel do candidato"><LogIn size={20}/></a>
        {menu && <div className="reab-menu"><a href={catalog} target="_blank" rel="noreferrer">Graduação</a><a href="https://www.pucminas.br/Pos-Graduacao/Paginas/pos-graduacao.aspx" target="_blank" rel="noreferrer">Pós-graduação</a><button type="button" onClick={() => { setMenu(false); setShowSearch(true) }}>Pesquisar cursos</button></div>}
        {showSearch && <div className="reab-search"><input aria-label="Buscar curso" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar curso"/><button type="button" onClick={() => { setSearch(''); setShowSearch(false) }} aria-label="Fechar pesquisa"><X size={20}/></button></div>}
      </nav>
      <div className="reab-nav-notch"><ChevronDown size={29}/></div>
      <main className="reab-main">
        <p className="reab-breadcrumb">Página inicial &nbsp;/&nbsp; <strong>Ver todos em Graduação</strong></p>
        <p className="reab-count">{normalized ? `Encontrados ${visible.length} cursos` : 'Mostrando 73 Cursos em 2 páginas'}</p>
        <h1><small>Exibindo todos os cursos de</small>Graduação</h1>
        <div className="reab-courses">{visible.length ? visible.map(course => <a className="reab-course" key={course.id} href={course.url} target="_blank" rel="noreferrer"><img src={pictures[`../assets/reabertura/${course.id}.png`] ?? course.image} alt="" loading="lazy"/><span><b>{course.title}</b><small>Graduação - 1º/2027</small></span></a>) : <p>Nenhum curso encontrado.</p>}</div>
        {!normalized && <div className="reab-pagination"><span>Mostrando 73 Cursos em 2 páginas</span><div>{[0,1].map(i=><button key={i} type="button" aria-current={page===i?'page':undefined} onClick={()=>changePage(i)}>{i+1}</button>)}</div></div>}
      </main>
      <section className="reab-testimonial"><p>O que nossos alunos dizem</p><strong>PUC Minas</strong><p>Conheça os cursos e descubra novas oportunidades.</p></section>
      <footer className="reab-footer"><h2>Conheça mais sobre a <b>PUC Minas</b></h2><p>Cadastre-se e receba as nossas novidades em seu e-mail.</p><a className="reab-footer-cta" href={store} target="_blank" rel="noreferrer">Cadastrar no site</a><div className="reab-footer-logos"><img src="/logo-splash.png" alt="PUC Minas"/><img src="/qrcode.jpg" alt="QR Code"/></div><p>Política de Privacidade · Contato</p><p>© PUC Minas. Todos os direitos reservados.</p></footer>
    </div>
    <div className="reab-floating"><button type="button" aria-label="Configurações de cookies" onClick={()=>{setCookies(true);setSettings(false)}}><Cookie size={27}/></button><a href="https://wa.me/553133194444" target="_blank" rel="noreferrer" aria-label="WhatsApp PUC Minas"><MessageCircle size={27}/></a></div>
    {cookies && <div className="reab-cookie" role="dialog" aria-modal="true" aria-labelledby="reab-cookie-title"><button type="button" className="reab-close" aria-label="Fechar" onClick={()=>save('dismissed')}><X size={20}/></button><h2 id="reab-cookie-title">{settings ? 'Configuração de Cookies' : 'Política de Cookies'}</h2>{settings ? <><p>Escolha suas preferências de cookies.</p><label><input type="checkbox" checked disabled/> Cookies necessários</label><label><input type="checkbox" checked={optional} onChange={e=>setOptional(e.target.checked)}/> Cookies opcionais</label><button type="button" onClick={()=>save(optional?'custom-optional':'rejected')}>Salvar preferências</button><button type="button" className="reab-outline" onClick={()=>setSettings(false)}>Voltar</button></> : <><p>Usamos cookies para aprimorar a sua experiência no nosso site, melhorando a segurança, a usabilidade e o desempenho, além de personalizar a sua experiência, oferecendo conteúdos mais relevantes, de acordo com suas preferências. Ao clicar em "Aceitar todos" você concorda com o armazenamento de cookies no seu dispositivo, de acordo com os objetivos especificados para cada categoria. <a href="https://www.pucminas.br/si/Paginas/politica-de-privacidade.aspx" target="_blank" rel="noreferrer">Política de Privacidade</a></p><button type="button" className="reab-outline" onClick={()=>setSettings(true)}>Personalizar configuração</button><button type="button" onClick={()=>save('rejected')}>Rejeitar Todos</button><button type="button" onClick={()=>save('accepted')}>Aceitar todos os cookies</button></>}</div>}
    <div className="reab-safe"/>
  </div>
}
