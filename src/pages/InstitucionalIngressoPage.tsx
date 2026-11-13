import { useState } from 'react'
import { ArrowLeft, Cookie, Menu, MessageCircle, Search, X } from 'lucide-react'
import brasao from '../assets/mestrado/brasao.png'
import fumarc from '../assets/ingresso-institucional/fumarc.png'
import catedral from '../assets/ingresso-institucional/catedral.png'
import santaMaria from '../assets/ingresso-institucional/SantaMaria.png'
import smc from '../assets/ingresso-institucional/smc2024.png'
import arquidiocese from '../assets/ingresso-institucional/arquidiocese-bh-100anos.png'
import qr from '../assets/ingresso-institucional/qrcode-puc.png'
import emec from '../assets/ingresso-institucional/emec.png'
import './InstitucionalIngressoPage.css'

type Props = { onBack: () => void; tipo: 'disciplinas-isoladas' | 'complementacao' }
const inscricao = 'https://www.sistemas.pucminas.br/gpi/SilverStream/Pages/pg_INSC_ProcessosAtivos.html?seqProcesso=9428'
const courses = [
  ['COMPLEMENTAÇÃO DE ESTUDOS EM PSICOLOGIA - LICENCIATURA', 'https://vemprapuc.pucminas.br/graduacao/presencial/aulas-presenciais/psicologia-licenciatura'],
  ['COMPLEMENTAÇÃO DE ESTUDOS EM PEDAGOGIA - APROFUNDAMENTO EM ENSINO RELIGIOSO', 'https://vemprapuc.pucminas.br/graduacao/pedagogia'],
]

export default function InstitucionalIngressoPage({ onBack, tipo }: Props) {
  const isoladas = tipo === 'disciplinas-isoladas'
  const title = isoladas ? 'MATRÍCULAS EM DISCIPLINAS ISOLADAS' : 'COMPLEMENTAÇÃO DE ESTUDOS'
  const [cookies, setCookies] = useState(() => !localStorage.getItem('puc-ingresso-institucional-cookie'))
  const [settings, setSettings] = useState(false)
  const [optional, setOptional] = useState(false)
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const save = (value: string) => { localStorage.setItem('puc-ingresso-institucional-cookie', value); setCookies(false); setSettings(false) }
  return <div className="ing-inst-page">
    <header className="ing-inst-header"><button onClick={onBack} aria-label="Voltar"><ArrowLeft size={23}/></button><strong>{title}</strong><span /></header>
    <div className="ing-inst-scroll" onScroll={e => setScrolled(e.currentTarget.scrollTop > 100)}>
      <div className="ing-inst-sitehead"><img src={brasao} alt="PUC Minas"/><div><a href="https://www.pucminas.br/" target="_blank" rel="noreferrer">Acesso Restrito ⌄</a><form action="https://www.pucminas.br/busca/Paginas/default.aspx" target="_blank"><input name="k" placeholder="Pesquisar..." aria-label="Pesquisar"/><button aria-label="Buscar"><Search size={17}/></button></form></div></div>
      <nav className={'ing-inst-nav' + (scrolled ? ' ing-inst-nav-scrolled' : '')}><button aria-label="Abrir menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><Menu size={28}/></button><strong>PUC Minas</strong>{menu && <div className="ing-inst-menu"><a href="https://www.pucminas.br/" target="_blank" rel="noreferrer">Portal PUC Minas</a><a href="https://www.pucminas.br/formas-ingresso/" target="_blank" rel="noreferrer">Como ingressar</a></div>}</nav>
      <main className="ing-inst-content"><p className="ing-inst-breadcrumb">PUC Minas &gt; Como ingressar &gt; {isoladas ? 'Matrícula em disciplinas isoladas' : 'Complementação de estudos'}</p><h1>{title}</h1>
        {isoladas ? <section><h2>MATRÍCULA EM DISCIPLINAS ISOLADAS DE CURSOS DE GRADUAÇÃO</h2><p><a href={inscricao} target="_blank" rel="noreferrer">Inscreva-se aqui</a> para o 2º semestre de 2026.</p></section> : <><section>{courses.map(([name,url]) => <article key={name}><h2>{name}</h2><a href={url} target="_blank" rel="noreferrer">INSCREVA-SE</a></article>)}<h2>SEGUNDA LICENCIATURA</h2><p>O processo de segunda licenciatura contempla as ofertas a seguir.</p><ul><li><a href="https://vemprapuc.pucminas.br/graduacao/fisica" target="_blank" rel="noreferrer">Física</a></li><li><a href="https://vemprapuc.pucminas.br/graduacao/matematica" target="_blank" rel="noreferrer">Matemática</a></li></ul></section></>}
      </main>
      <footer className="ing-inst-footer"><h2>Instituições da Arquidiocese de Belo Horizonte</h2><div className="ing-inst-logos">{[[fumarc,'FUMARC'],[catedral,'Catedral'],[santaMaria,'Colégio Santa Maria Minas'],[smc,'Sociedade Mineira de Cultura'],[arquidiocese,'Arquidiocese de Belo Horizonte']].map(([src,alt])=><img src={src} alt={alt} key={alt}/>)}</div><div className="ing-inst-footer-puc"><img src={brasao} alt="PUC Minas"/><a href="https://emec.mec.gov.br/" target="_blank" rel="noreferrer"><img src={qr} alt="QR Code para consulta e-MEC"/></a></div><p>CONSULTE O CADASTRO NO <img src={emec} alt="e-MEC"/></p><div className="ing-inst-social"><a href="https://www.instagram.com/pucminas/" target="_blank" rel="noreferrer">◎ Instagram</a>　<a href="https://www.youtube.com/user/TVPUCMINAS" target="_blank" rel="noreferrer">▶ YouTube</a><small>A Sociedade Mineira de Cultura é uma entidade beneficente da área de educação, portadora do Certificado de Entidade Beneficente de Assistência Social - CEBAS-Educação.</small></div></footer>
    </div>
    <div className="ing-inst-floating"><button onClick={() => {setCookies(true); setSettings(false)}} aria-label="Configurações de cookies"><Cookie size={28}/></button><a href="https://wa.me/553133194444" target="_blank" rel="noreferrer" aria-label="WhatsApp PUC Minas"><MessageCircle size={27}/></a></div>
    {cookies && <div className="ing-inst-cookie" role="dialog" aria-modal="true" aria-labelledby="ing-inst-cookie-title"><button className="ing-inst-cookie-close" onClick={() => save('dismissed')} aria-label="Fechar"><X size={21}/></button><h2 id="ing-inst-cookie-title">{settings ? 'CONFIGURAÇÃO DE COOKIES' : 'POLÍTICA DE COOKIES'}</h2>{settings ? <><label><input type="checkbox" checked disabled/> Cookies necessários</label><label><input type="checkbox" checked={optional} onChange={e => setOptional(e.target.checked)}/> Cookies opcionais</label><button onClick={() => save(optional ? 'custom' : 'rejected')}>Salvar preferências</button><button className="ing-inst-outline" onClick={() => setSettings(false)}>Voltar</button></> : <><p>Usamos cookies para aprimorar a sua experiência no nosso site, melhorando a segurança, a usabilidade e o desempenho, além de personalizar a sua experiência, oferecendo conteúdos mais relevantes, de acordo com suas preferências. Ao clicar em "Aceitar todos" você concorda com o armazenamento de cookies no seu dispositivo, de acordo com os objetivos especificados para cada categoria. <a href="https://www.pucminas.br/si/Paginas/politica-de-privacidade.aspx" target="_blank" rel="noreferrer">Política de Privacidade</a></p><button className="ing-inst-outline" onClick={() => setSettings(true)}>Personalizar configuração</button><button onClick={() => save('rejected')}>Rejeitar Todos</button><button onClick={() => save('accepted')}>Aceitar todos os cookies</button></>}</div>}
    <div className="ing-inst-safe" />
  </div>
}
