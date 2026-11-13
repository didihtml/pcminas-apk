import { useState } from 'react'
import { ArrowLeft, Cookie, Menu, X } from 'lucide-react'
import capa from '../assets/guia-aluno/capa.png'
import puc from '../assets/guia-aluno/puc.png'
import './GuiaAlunoPage.css'

const base = 'https://www.pucminas.br/guia-do-aluno/'
const links = [
  ['Um Breve Histórico', 'Paginas/pucminas-historico.aspx'],
  ['Estrutura Organizacional', 'Paginas/pucminas-estrutura-organizacional.aspx'],
  ['Informações Acadêmicas', 'Paginas/informacoes-academicas.aspx'],
  ['Normas Acadêmicas', 'Documents/PUC-Minas-NORMAS-ACADEMICAS.pdf'],
  ['Guia Prático do Aluno', 'guia-pratico/Paginas/default.aspx'],
]

export default function GuiaAlunoPage({ onBack }: { onBack: () => void }) {
  const [menu, setMenu] = useState(false)
  const [cookies, setCookies] = useState(() => !localStorage.getItem('puc-guia-aluno-cookies'))
  const [custom, setCustom] = useState(false)
  const [optional, setOptional] = useState(false)
  const save = (choice: string) => { localStorage.setItem('puc-guia-aluno-cookies', choice); setCookies(false); setCustom(false) }
  return <div className="guia-page">
    <header className="guia-header"><button type="button" onClick={onBack} aria-label="Voltar"><ArrowLeft size={23}/></button><strong>GUIA DO ALUNO</strong><span /></header>
    <div className="guia-scroll">
      <div className="guia-hero"><button className="guia-menu-button" aria-label="Abrir menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><Menu size={30}/></button>{menu && <nav className="guia-menu">{links.map(([title, path]) => <a key={title} href={base + path} target="_blank" rel="noreferrer">{title}</a>)}</nav>}<img className="guia-logo-title" src={capa} alt="Guia do Aluno"/><img className="guia-logo-puc" src={puc} alt="PUC Minas"/></div>
      <main className="guia-content"><p>Seja bem-vindo(a) à PUC Minas.</p><p>Por aqui acontece muita coisa o tempo todo. E como agora você é um filho da PUC, e faz parte desse mundo em movimento, apresentamos o Guia do Aluno, para que você conheça as normas, regulamentos e diretrizes que orientam sua vida acadêmica, assim como os serviços que a Universidade coloca ao seu dispor para os anos mais incríveis da sua vida. Para que tudo funcione direitinho, fique atento às datas e prazos fixados anualmente pelo CALENDÁRIO ACADÊMICO e mantenha seus dados cadastrais sempre atualizados para que a comunicação entre a Universidade e você seja eficiente.</p><p>Que comece a sua vida universitária e com ela a construção do futuro dos seus sonhos.</p><p>PUC Minas, mais que uma universidade.</p></main>
      <footer className="guia-footer"><a href="tel:+553133194444">PUC Minas Telefone geral: (31) 3319-4444</a><a href="https://www.virtual.pucminas.br/ouvidoria/" target="_blank" rel="noreferrer">Ouvidoria</a><a href="https://www.pucminas.br/" target="_blank" rel="noreferrer">Portal PUC Minas</a><a href="https://central.pucminas.br/" target="_blank" rel="noreferrer">Central de informações</a></footer>
    </div>
    {!cookies && <button className="guia-cookie-floating" aria-label="Configurações de cookies" onClick={() => setCookies(true)}><Cookie size={27}/></button>}
    {cookies && <div className="guia-cookie" role="dialog" aria-modal="true" aria-labelledby="guia-cookie-title"><button className="guia-cookie-close" aria-label="Fechar" onClick={() => save('fechado')}><X size={21}/></button><h2 id="guia-cookie-title">{custom ? 'Configuração de Cookies' : 'Política de Cookies'}</h2>{custom ? <><p>Escolha suas preferências de cookies.</p><label><input type="checkbox" checked disabled/> Cookies necessários</label><label><input type="checkbox" checked={optional} onChange={e => setOptional(e.target.checked)}/> Cookies opcionais</label><button onClick={() => save(optional ? 'personalizado' : 'rejeitado')}>Salvar preferências</button><button className="guia-outline" onClick={() => setCustom(false)}>Voltar</button></> : <><p>Usamos cookies para aprimorar a sua experiência no nosso site, melhorando a segurança, a usabilidade e o desempenho, além de personalizar a sua experiência, oferecendo conteúdos mais relevantes, de acordo com suas preferências. Ao clicar em "Aceitar todos" você concorda com o armazenamento de cookies no seu dispositivo, de acordo com os objetivos especificados para cada categoria. <a href="https://www.pucminas.br/si/Paginas/politica-de-privacidade.aspx" target="_blank" rel="noreferrer">Política de Privacidade</a></p><button className="guia-outline" onClick={() => setCustom(true)}>Personalizar configuração</button><button onClick={() => save('rejeitado')}>Rejeitar Todos</button><button onClick={() => save('aceito')}>Aceitar todos os cookies</button></>}</div>}
    <div className="guia-safe" />
  </div>
}
