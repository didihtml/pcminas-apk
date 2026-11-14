import { useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ChevronDown, Cookie, MessageCircle, X } from 'lucide-react'
import banner from '../assets/calendario-academico-2026.jpg'
import entries from './academic-calendar-data.json'
import './AcademicCalendarPage.css'

const sections = [
  { title: 'CALENDÁRIO SEMESTRAL', start: 0, end: 2, separate: true },
  { title: 'ATIVIDADES ACADÊMICAS E ADMINISTRATIVAS', start: 2, end: 15 },
  { title: 'DATAS DE PROVAS EAD', start: 15, end: 19, observation: true },
  { title: 'PUC MINAS INTERNACIONAL', start: 19, end: 20 },
  { title: 'PUC CARREIRAS', start: 20, end: 21 },
  { title: 'PRÓ-REITORIA DE EXTENSÃO', start: 21, end: 22 },
  { title: 'FOMENTO E APOIO À PESQUISA CIENTÍFICA E TECNOLÓGICA E AO PLANO PERMANENTE DE CAPACITAÇÃO DOCENTE', start: 22, end: 25 },
  { title: 'SEMINÁRIO DE INICIAÇÃO CIENTÍFICA (ALUNOS)', start: 25, end: 26 },
  { title: 'CONSELHO DE ENSINO, PESQUISA E EXTENSÃO', subtitle: '(ENTRADA DE PROCESSOS NA SECRETARIA GERAL)', start: 26, end: 27 },
  { title: 'CONSELHO DE GESTÃO E POLÍTICAS', subtitle: '(REUNIÕES)', start: 27, end: 28 },
  { title: 'CONSELHO UNIVERSITÁRIO', subtitle: '(ENTRADA DE PROCESSOS NA SECRETARIA GERAL)', start: 28, end: 29 },
]

export default function AcademicCalendarPage({ onBack }: { onBack: () => void }) {
  const [open, setOpen] = useState<number | null>(null)
  const [cookies, setCookies] = useState(false)
  return createPortal(<div className="academic-calendar">
    <header className="academic-calendar-header"><button type="button" onClick={onBack} aria-label="Voltar"><ArrowLeft size={23}/></button><h1>CALENDÁRIO ACADÊMICO</h1><span /></header>
    <div className="academic-calendar-scroll"><main className="academic-calendar-content">
      <img className="academic-calendar-banner" src={banner} alt="Calendário Acadêmico e Administrativo 2026 — PUC Minas" />
      <div className="academic-calendar-print">
        <a href="https://www.pucminas.br/calendario/Documents/FINAL_calendario%20academico_2025.pdf" target="_blank" rel="noreferrer">Clique aqui para imprimir o calendário 2025</a>
        <a href="https://www.pucminas.br/calendario/Documents/calendario-academico-2026.pdf" target="_blank" rel="noreferrer">Clique aqui para imprimir o calendário 2026</a>
      </div>
      {sections.map(section => <section className="academic-calendar-section" key={section.title}>
        <h2>{section.title}{section.subtitle && <small>{section.subtitle}</small>}</h2>
        <div className={section.separate ? 'academic-calendar-items separate' : 'academic-calendar-items'}>
          {entries.slice(section.start, section.end).map((entry, offset) => {
            const index = section.start + offset
            return <div className="academic-calendar-item" key={entry.title}>
              <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}><span>{entry.title}</span><ChevronDown size={18} fill="currentColor" /></button>
              {open === index && <div className="academic-calendar-details" dangerouslySetInnerHTML={{ __html: entry.html }} />}
            </div>
          })}
        </div>
        {section.observation && <div className="academic-calendar-observation"><strong>OBSERVAÇÃO:</strong><ul><li>Os ingressantes no ano de 2026 nos cursos de graduação presencial que contenham unidade curricular de modalidade única terão provas presenciais agendadas;</li><li>ingressantes no ano de 2026 nos cursos de graduação EAD terão provas presenciais obrigatórias agendadas.</li></ul></div>}
      </section>)}
    </main></div>
    <button type="button" className="academic-calendar-cookie" aria-label="Configurações de cookies" onClick={() => setCookies(true)}><Cookie size={29}/></button>
    <a className="academic-calendar-whatsapp" href="https://wa.me/553133194444" target="_blank" rel="noreferrer" aria-label="WhatsApp PUC Minas"><MessageCircle size={29}/></a>
    {cookies && <div className="academic-calendar-cookie-dialog" role="dialog" aria-modal="true" aria-label="Configurações de cookies"><button type="button" onClick={() => setCookies(false)} aria-label="Fechar"><X size={20}/></button><h2>Política de Cookies</h2><p>Consulte as informações sobre privacidade e cookies no site da PUC Minas.</p><a href="https://www.pucminas.br/si/Paginas/politica-de-privacidade.aspx" target="_blank" rel="noreferrer">Política de Privacidade</a></div>}
    <div className="academic-calendar-safe" />
  </div>, document.body)
}
