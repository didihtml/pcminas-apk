import { useState } from 'react'
import { ArrowLeft, ChevronDown, Cookie, Menu, MessageCircle, X } from 'lucide-react'
import hero from '../assets/graduacao/header.jpg'
import medicina from '../assets/graduacao/medicina.jpg'
import humanas from '../assets/graduacao/ich.png'
import sociais from '../assets/graduacao/ics.png'
import comunicacao from '../assets/graduacao/fca.png'
import direito from '../assets/graduacao/fmd.png'
import economia from '../assets/graduacao/iceg.png'
import engenharia from '../assets/graduacao/ipuc.png'
import filosofia from '../assets/graduacao/iftdj.png'
import psicologia from '../assets/graduacao/fapsi.png'
import saude from '../assets/graduacao/icbs.png'
import tecnologia from '../assets/graduacao/icei.png'
import melhor from '../assets/graduacao/icone-melhor-br.png'
import inovacao from '../assets/graduacao/icone-inovacao.png'
import empregadores from '../assets/graduacao/icone-empregadores.png'
import mundo from '../assets/graduacao/icone-melhor-mundo.png'
import './GraduacaoPage.css'

const portal = 'https://www.pucminas.br/vestibular/Paginas/default.aspx'
const inscricao = 'https://vemprapuc.pucminas.br/loja/busca.php?loja=548342&categoria=129'
const consulta = 'https://www.sistemas.pucminas.br/gpi/SilverStream/Pages/pgPainelDoCandidatoLogin.html'
const areas = [['Ciências Humanas', humanas], ['Ciências Sociais', sociais], ['Comunicação', comunicacao], ['Direito', direito], ['Economia & Negócios', economia], ['Engenharias', engenharia], ['Filosofia & Teologia', filosofia], ['Psicologia', psicologia], ['Saúde', saude], ['Tecnologia', tecnologia]]
const questions = [
 ['Posso participar do Vestibular com minha nota do Enem?', 'Sim, é possível participar tanto por meio de provas quanto por meio do Enem.'],
 ['Posso concorrer por meio da prova e com minha nota do Enem?', 'A seleção considera prioritariamente a nota do Enem. Consulte o edital para conhecer as demais possibilidades.'],
 ['Posso escolher entre realizar a prova on-line ou presencial?', 'A modalidade depende do curso e do campus escolhidos. Consulte o edital.'],
 ['Não sendo possível ingressar pelo Enem, como posso realizar a prova on-line?', 'A inscrição pode ser realizada pelo Portal Vem pra PUC.'],
 ['Como posso realizar a prova presencial?', 'Consulte o edital e seu cartão de inscrição para conhecer as datas e locais.'],
 ['Como funciona a seleção pelas notas do Enem?', 'A seleção considera o melhor resultado nas edições previstas no edital.'],
 ['A seleção pelas notas do Enem dá direito à bolsa de estudos?', 'Não. A seleção pelas notas do Enem não está vinculada à concessão de bolsa de estudos.'],
 ['Posso fazer mais de uma inscrição no Vestibular?', 'Sim. É possível realizar inscrições para cursos, turnos e campi diferentes.'],
 ['Consigo isenção da taxa de inscrição do Vestibular?', 'A PUC Minas não concede isenção da taxa de inscrição do Vestibular.'],
 ['Posso alterar o curso para o qual realizei a inscrição?', 'Para verificar, contate o Call Center pelo telefone (31) 3319-4444.'],
 ['Desejo ingressar na PUC Minas com o Prouni. Preciso fazer o Vestibular?', 'Não. O ingresso pelo Prouni ocorre pelo processo seletivo do programa.'],
 ['A PUC Minas tem nota de corte ou pontuação mínima para aprovação?', 'Consulte o edital para conhecer os requisitos de aprovação.'],
]
const campuses = [ ['Barreiro','Avenida Afonso Vaz de Melo, 1.200','Barreiro - Belo Horizonte - MG'], ['Betim','R. do Rosário, 1.081','Bairro Angola - Betim - MG'], ['Contagem','R. Rio Comprido, 4.580','Contagem - MG'], ['Coração Eucarístico','Av. Dom José Gaspar, 500','Coração Eucarístico - Belo Horizonte - MG'], ['Lourdes','Rua Alvarenga Peixoto, 959','Lourdes - Belo Horizonte - MG'], ['Poços de Caldas','Av. Pe. Cletus Francis Cox, 1661','Jardim Country Club - Poços de Caldas - MG'], ['São Gabriel','Anel Rodoviário Km 23,5 - Rua Walter Ianni, 255','São Gabriel - Belo Horizonte - MG'] ]
const External = ({ href, children, className }: {href:string; children: React.ReactNode; className?:string}) => <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>

export default function GraduacaoPage({ onBack }: { onBack: () => void }) {
 const [cookies, setCookies] = useState(() => !localStorage.getItem('puc-graduacao-cookies'))
 const [custom, setCustom] = useState(false)
 const [optional, setOptional] = useState(false)
 const [menu, setMenu] = useState(false)
 const [active, setActive] = useState(0)
 const [faq, setFaq] = useState<number | null>(0)
 const choice = (value: string) => { localStorage.setItem('puc-graduacao-cookies', value); setCookies(false); setCustom(false) }
 const scrollTo = (id: string) => { setMenu(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
 return <div className="grad-page">
  <header className="grad-app-header"><button onClick={onBack} aria-label="Voltar"><ArrowLeft size={23}/></button><span>GRADUAÇÃO</span><span className="grad-spacer" /></header>
  <div className="grad-scroll">
   <div className="grad-hero" style={{backgroundImage:`url(${hero})`}}>
    <button className="grad-menu-button" onClick={() => setMenu(true)}>menu <Menu size={23}/></button>
    <div className="grad-hero-actions"><External href={inscricao}>QUERO ME INSCREVER</External><External href={consulta}>CONSULTE SUA INSCRIÇÃO</External></div>
   </div>
   <section className="grad-container" id="grad-formas"><h2>Formas de Ingresso</h2><div className="grad-formas">{['Prova Presencial','Prova Online','Enem','Transferência e 2ª Graduação'].map((item,i) => <button key={item} className={active === i ? 'active' : ''} onClick={() => setActive(i)}><span>{item}</span></button>)}</div>
    <div className="grad-details"><h3>{['Prova Presencial','Prova Online','Enem','Transferência e 2ª Graduação'][active]}</h3>{active === 0 ? <><strong>Inscrições encerradas</strong><p><b>Publicação do Resultado:</b> até 13/11/2026</p><p><b>Matrícula:</b></p><p>Medicina</p><ul><li>1ª Chamada: até 17/11 - 8h às 19h</li><li>2ª Chamada: 18 e 19/11 - 8h às 19h</li><li>3ª Chamada: 23/11 - 8h às 19h</li></ul><p>Demais Cursos</p><ul><li>1ª Chamada: até 17/11 - 8h às 19h</li><li>2ª Chamada: 18 e 19/11 - 8h às 19h</li></ul></> : <p>Confira as informações e os prazos no edital do processo seletivo.</p>}<External href="https://www.pucminas.br/processoseletivo/editais" className="grad-edital">Veja o edital</External></div>
   </section>
   <section className="grad-container grad-courses" id="grad-cursos"><h2>Cursos nas áreas de</h2>{areas.map(([title,img])=><External key={title} href={inscricao} className="grad-course"><img src={img} alt=""/><div><span>{title}</span><p>[ veja os cursos ]</p></div></External>)}</section>
   <section className="grad-container grad-reasons"><h2>Por que escolher a PUC Minas</h2><p className="grad-intro">Ao longo desses mais de 60 anos, mostramos caminhos, damos conselhos e ensinamos muito de dezenas de milhares de filhos que hoje levam todo esse acolhimento humanista e um conhecimento gigantesco para o mercado e para a vida. É por isso que as chegadas e partidas de cada filho são muito emocionantes. Dá muito orgulho ver esses jovens talentos começando pequenas e se tornando muito maiores para alcançar o mundo.</p>{[[melhor,'A melhor Universidade privada','A PUC Minas está entre as melhores universidades do Brasil.'],[inovacao,'Uma das mais inovadoras do país','Se tratando de inovação, a PUC Minas é destaque no país.'],[empregadores,'Uma das mais respeitadas pelos empregadores','Segundo o Ranking Universitário da Folha - RUF, profissionais com diploma da PUC Minas estão entre os preferidos pelos empregadores na hora de contratar.'],[mundo,'Uma das melhores do mundo','A PUC Minas foi destaque no ranking da revista britânica Times Higher Education como uma das melhores universidades do mundo, por três anos consecutivos (2019, 2020 e 2021).']].map(([img,title,description])=><div className="grad-reason" key={title}><img src={img} alt=""/><h3>{title}</h3><p>{description}</p></div>)}</section>
   <section id="grad-medicina" className="grad-medicine" style={{backgroundImage:`url(${medicina})`}}><External href={portal}>SAIBA MAIS</External></section>
   <section className="grad-resources">{[['Provas Anteriores','Acesse provas de vestibulares anteriores para praticar.'],['E-book para Enem','E-book gratuito com dicas de redação.'],['Orientação profissional','Faça um teste de orientação profissional gratuito.']].map(([title,desc])=><div key={title}><h3>{title}</h3><p>{desc}</p><External href={portal}>clique e acesse</External></div>)}</section>
   <section className="grad-container grad-social"><h2>Conecte-se à PUC Minas</h2><External href="https://www.pucminas.br/">PUC Minas</External></section>
   <section className="grad-container grad-faq" id="grad-faq"><h2>Perguntas Frequentes</h2>{questions.map(([question,answer],i)=><div className="grad-faq-item" key={question}><button aria-expanded={faq === i} onClick={() => setFaq(faq === i ? null : i)}><b>{String(i+1).padStart(2,'0')}. {question}</b><ChevronDown size={16}/></button>{faq === i && <p>{answer}</p>}</div>)}</section>
   <footer id="grad-footer" className="grad-footer"><img src="/logo-splash.png" alt="PUC Minas"/>{campuses.map(([name,address,city])=><div key={name}><h3>{name}</h3><p>{address}<br/>{city}<br/>Telefone: (31) 3319 - 4444</p></div>)}</footer>
  </div>
  <div className="grad-floating"><button onClick={() => setCookies(true)} aria-label="Configurações de cookies"><Cookie size={27}/></button><External href="https://wa.me/553133194444" className="grad-whatsapp"><MessageCircle size={28}/></External></div>
  {menu && <div className="grad-menu-overlay"><div className="grad-menu-head">Vestibular PUC Minas 2027<button onClick={()=>setMenu(false)} aria-label="Fechar menu"><X size={23}/></button></div><External href="https://www.pucminas.br/processoseletivo/editais">Edital</External><button onClick={()=>scrollTo('grad-medicina')}>Medicina</button><External href="https://www.pucminas.br/formas-ingresso/vestibular/Paginas/provas-e-gabaritos.aspx">Provas e Gabaritos</External><External href="https://conexao.pucminas.br/">Blog</External><button onClick={()=>scrollTo('grad-faq')}>Dúvidas</button><button onClick={()=>scrollTo('grad-footer')}>Fale Conosco</button><External href="https://www.pucminas.br/vestibular/Paginas/resultado-pss.aspx">Lista de Aprovados</External><External href={inscricao}>Inscreva-se</External><External href={consulta}>Consulte sua inscrição</External></div>}
  {cookies && <div className="grad-cookie-panel" role="dialog" aria-modal="true" aria-labelledby="grad-cookie-title"><button className="grad-cookie-close" aria-label="Fechar" onClick={()=>choice('fechado')}><X size={20} strokeWidth={3}/></button><h2 id="grad-cookie-title">{custom ? 'Configuração de Cookies' : 'Política de Cookies'}</h2>{custom ? <><p>Escolha suas preferências de cookies.</p><label><input type="checkbox" checked disabled/> Cookies necessários</label><label><input type="checkbox" checked={optional} onChange={e=>setOptional(e.target.checked)}/> Cookies opcionais</label><button className="grad-cookie-action" onClick={()=>choice(optional ? 'personalizado' : 'rejeitado')}>Salvar preferências</button><button className="grad-cookie-action outline" onClick={()=>setCustom(false)}>Voltar</button></> : <><p>Usamos cookies para aprimorar a sua experiência no nosso site, melhorando a segurança, a usabilidade e o desempenho, além de personalizar a sua experiência, oferecendo conteúdos mais relevantes, de acordo com suas preferências. Ao clicar em "Aceitar todos" você concorda com o armazenamento de cookies no seu dispositivo, de acordo com os objetivos especificados para cada categoria. <External href="https://www.pucminas.br/">Política de Privacidade</External></p><button className="grad-cookie-action outline" onClick={()=>setCustom(true)}>Personalizar configuração</button><button className="grad-cookie-action" onClick={()=>choice('rejeitado')}>Rejeitar Todos</button><button className="grad-cookie-action" onClick={()=>choice('aceito')}>Aceitar todos os cookies</button></>}</div>}
  <div className="grad-safe" />
 </div>
}
