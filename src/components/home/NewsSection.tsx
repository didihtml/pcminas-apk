import React from 'react'
import type { NewsItem } from '../../types'

// Conteúdo da referência visual; substituir por um feed quando estiver disponível.
const referenceNews = [
  'PUC Minas promove 1º Simpósio de Sustentabilidade',
  'PUC Play: último episódio da temporada aborda tráfico de pessoas e trabalho escravo contemporâneo',
  'Pró-reitora de Extensão da PUC Minas é eleita presidente do Fórum Nacional de Extensão e Ação Comunitária das Instituições Comunitárias de Educação Superior',
  'Semana Acadêmica abre segundo dia reforçando a indissociabilidade entre ensino, pesquisa e extensão',
  'Semana Acadêmica 2026 reúne apresentação de dezenas de trabalhos',
  'Cinco trabalhos da FCA são finalistas do Prêmio CDL de Jornalismo',
  'Doze cursos da PUC Minas se classificam com nota máxima no Guia da Faculdade 2026',
  'Curso de Serviço Social da PUC Minas: 80 anos de contribuição para a transformação social',
  'IV Simpósio Internacional de Teologia Prática: desafios epistemológicos',
  'Mova-se Pela Vida: PUC Minas e Hospital Madre Teresa promovem ação de conscientização sobre a saúde da mulher',
]

interface NewsSectionProps {
  news?: NewsItem[]
  onVerMais?: () => void
}

const NewsSection: React.FC<NewsSectionProps> = ({ news, onVerMais }) => {
  const items = news?.map(item => ({ id: String(item.id), title: item.title, date: item.date })) ??
    referenceNews.map((title, id) => ({ id: String(id), title, date: '12/11/2026' }))
  return (
    <section className="home-news">
      <h2 className="home-section-title">NOTÍCIAS</h2>
      <div className="home-news-list">
        {items.map(item => (
          <article className="home-news-card" key={item.id}>
            <span className="home-news-date">{item.date}</span>
            <h3>{item.title}</h3>
          </article>
        ))}
      </div>
      {onVerMais ? (
        <button className="home-news-more" onClick={onVerMais}>Ver mais</button>
      ) : (
        <a className="home-news-more" href="https://www.pucminas.br/destaques/Paginas/default.aspx" target="_blank" rel="noreferrer">Ver mais</a>
      )}
    </section>
  )
}
export default NewsSection
