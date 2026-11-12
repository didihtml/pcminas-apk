import React, { useState } from 'react'
import { ArrowLeft, Check, ChevronDown, Cookie, Menu, MessageCircle, Search, X } from 'lucide-react'
import './NewsPage.css'

interface NewsPageProps { onBack: () => void }

const groups = [
  { date: '12/11/2026', items: ['PUC Minas promove 1º Simpósio de Sustentabilidade', 'PUC Play: último episódio da temporada aborda tráfico de pessoas e trabalho escravo contemporâneo'] },
  { date: '11/11/2026', items: ['Pró-reitora de Extensão da PUC Minas é eleita presidente do Fórum Nacional de Extensão e Ação Comunitária das Instituições Comunitárias de Educação Superior', 'Museu de Ciências Naturais exibe documentário Saguis em perigo'] },
  { date: '10/11/2026', items: ['PUC Minas realiza a quarta edição do Simulado de Incidente com Múltiplas Vítimas'] },
  { date: '09/11/2026', items: ['Equipe de AeroDesign da PUC Minas conquista 4º lugar em campeonato nacional Estudantes dos Cursos de Engenharia Aeronáutica e Engenharia Mecânica se destacaram entre 20 equipes universitárias'] },
  { date: '29/10/2026', items: ['Reitor da PUC Minas celebra missa durante visita ao Campus Poços de Caldas'] },
  { date: '28/10/2026', items: ['Intercâmbio PUC Minas: edital de vagas para 2º/2027 e 1º/2028', 'Semana Acadêmica PUC Minas: palestra aborda desigualdades de gênero na ciência', 'Semana Acadêmica abre segundo dia reforçando a indissociabilidade entre ensino, pesquisa e extensão'] },
  { date: '27/10/2026', items: ['Semana Acadêmica 2026 reúne apresentação de dezenas de trabalhos', 'Cinco trabalhos da FCA são finalistas do Prêmio CDL de Jornalismo'] },
  { date: '26/10/2026', items: ['Doze cursos da PUC Minas se classificam com nota máxima no Guia da Faculdade 2026'] },
  { date: '22/10/2026', items: ['Curso de Serviço Social da PUC Minas: 80 anos de contribuição para a transformação social'] },
  { date: '21/10/2026', items: ['IV Simpósio Internacional de Teologia Prática: desafios epistemológicos', 'Mova-se Pela Vida: PUC Minas e Hospital Madre Teresa promovem ação de conscientização sobre a saúde da mulher'] },
  { date: '20/10/2026', items: ['RUF 2026: PUC Minas é a única instituição privada do Estado entre as 10 melhores do Brasil', 'Nota de Pesar'] },
  { date: '19/10/2026', items: ['Curso de Odontologia da PUC Minas Poços de Caldas é reconhecido com conceito máximo pelo MEC'] },
  { date: '17/10/2026', items: ['Vestibular PUC Minas 2027', 'Nota de pesar'] },
]
const portalUrl = 'https://www.pucminas.br/destaques/Paginas/default.aspx'

const NewsPage: React.FC<NewsPageProps> = ({ onBack }) => {
  const [cookiesOpen, setCookiesOpen] = useState(() => !localStorage.getItem('puc-news-cookie-choice'))
  const [customize, setCustomize] = useState(false)
  const [optionalCookies, setOptionalCookies] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [campusOpen, setCampusOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const filtered = groups.map(group => ({ ...group, items: group.items.filter(item => item.toLocaleLowerCase('pt-BR').includes(submitted.toLocaleLowerCase('pt-BR'))) })).filter(group => group.items.length)
  const saveChoice = (choice: string) => { localStorage.setItem('puc-news-cookie-choice', choice); setCookiesOpen(false); setCustomize(false) }
  return (
    <div className="news-page">
      <header className="news-app-header">
        <button onClick={onBack} aria-label="Voltar"><ArrowLeft size={23} /></button>
        <span>NOTÍCIAS</span><span className="news-header-spacer" />
      </header>
      <div className="news-scroll" onScroll={event => setScrolled(event.currentTarget.scrollTop > 150)}>
        <div className="news-website-top">
          <img src="/logo-puc-coat.png" alt="PUC Minas" />
          <div className="news-site-search">
            <a href="https://www.pucminas.br/" target="_blank" rel="noreferrer" className="news-restricted">Acesso Restrito <ChevronDown size={14} /></a>
            <form onSubmit={event => { event.preventDefault(); setSubmitted(query) }}>
              <input aria-label="Pesquisar notícias" placeholder="Pesquisar..." value={query} onChange={event => setQuery(event.target.value)} />
              <button aria-label="Pesquisar" type="submit"><Search size={20} /></button>
            </form>
          </div>
        </div>
        <div className="news-intro-menu"><button onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu"><Menu size={38} /></button></div>
        <div className="news-breadcrumb">PUC Minas &gt; Sala de Imprensa &gt; Notícias</div>
        <div className="news-intro-title">• &nbsp;SALA DE IMPRENSA<br /><small>&gt; Notícias</small></div>
        <div className="news-site-bar">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}><Menu size={38} /></button>
          <strong>PUC Minas</strong>
          {menuOpen && <div className="news-site-menu"><a href="https://www.pucminas.br/" target="_blank" rel="noreferrer">PUC Minas</a><a href={portalUrl} target="_blank" rel="noreferrer">Notícias</a></div>}
        </div>
        <main className="news-site-content">
          <div className="news-campus-wrap">
            <button className="news-campus" onClick={() => setCampusOpen(!campusOpen)} aria-expanded={campusOpen}>Campus <ChevronDown size={15} /></button>
            {campusOpen && <button className="news-campus-choice" onClick={() => setCampusOpen(false)}><Check size={15} /> Coração Eucarístico</button>}
          </div>
          <h1>CORAÇÃO EUCARÍSTICO</h1>
          {filtered.length ? filtered.map(group => <section key={group.date} className="news-date-group"><h2>{group.date}</h2><ul>{group.items.map(item => <li key={item}><a href={portalUrl} target="_blank" rel="noreferrer">{item}</a></li>)}</ul></section>) : <p>Nenhuma notícia encontrada.</p>}
        </main>
      </div>
      {scrolled && <div className="news-floating-actions"><button onClick={() => { setCookiesOpen(true); setCustomize(false) }} aria-label="Configurações de cookies"><Cookie size={29} /></button><a href="https://www.pucminas.br/" target="_blank" rel="noreferrer" aria-label="Acessar o portal PUC Minas"><MessageCircle size={28} /></a></div>}
      {cookiesOpen && <div className="news-cookie-panel" role="dialog" aria-modal="true" aria-labelledby="news-cookie-title">
        <button className="news-cookie-close" aria-label="Fechar" onClick={() => saveChoice('dismissed')}><X size={21} strokeWidth={3} /></button>
        <h2 id="news-cookie-title">{customize ? 'CONFIGURAÇÃO DE COOKIES' : 'POLÍTICA DE COOKIES'}</h2>
        {customize ? <div className="news-cookie-custom"><p>Escolha suas preferências de cookies.</p><label><input type="checkbox" checked disabled /> Cookies necessários</label><label><input type="checkbox" checked={optionalCookies} onChange={event => setOptionalCookies(event.target.checked)} /> Cookies opcionais</label><button onClick={() => saveChoice(optionalCookies ? 'custom-optional' : 'rejected')}>Salvar preferências</button><button className="news-cookie-outline" onClick={() => setCustomize(false)}>Voltar</button></div> : <>
          <p>Usamos cookies para aprimorar a sua experiência no nosso site, melhorando a segurança, a usabilidade e o desempenho, além de personalizar a sua experiência, oferecendo conteúdos mais relevantes, de acordo com suas preferências. Ao clicar em "Aceitar todos" você concorda com o armazenamento de cookies no seu dispositivo, de acordo com os objetivos especificados para cada categoria. <a href="https://www.pucminas.br/" target="_blank" rel="noreferrer">Política de Privacidade</a></p>
          <button className="news-cookie-outline" onClick={() => setCustomize(true)}>Personalizar configuração</button>
          <button onClick={() => saveChoice('rejected')}>Rejeitar Todos</button>
          <button onClick={() => saveChoice('accepted')}>Aceitar todos os cookies</button>
        </>}
      </div>}
      <div className="news-bottom-safe"><span /></div>
    </div>
  )
}
export default NewsPage
