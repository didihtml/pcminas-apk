import React from 'react'
import type { NewsItem } from '../../types'

const IconNewspaper = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="48" height="48" rx="10" stroke="#4B5563" strokeWidth="2.5" fill="none"/>
    <rect x="10" y="10" width="16" height="18" rx="2" stroke="#4B5563" strokeWidth="2" fill="none"/>
    <rect x="30" y="10" width="12" height="7" rx="1.5" stroke="#4B5563" strokeWidth="2" fill="none"/>
    <rect x="30" y="21" width="12" height="7" rx="1.5" stroke="#4B5563" strokeWidth="2" fill="none"/>
    <rect x="10" y="33" width="32" height="4" rx="1.5" stroke="#4B5563" strokeWidth="2" fill="none"/>
  </svg>
)

interface NewsSectionProps {
  news?: NewsItem[]
  onVerMais?: () => void
}

const NewsCard: React.FC<{ item: NewsItem }> = ({ item }) => (
  <div className="flex gap-3 rounded-xl overflow-hidden" style={{ background: '#172037' }}>
    {item.imageUrl && (
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-24 h-24 object-cover flex-shrink-0"
      />
    )}
    <div className="p-3 flex flex-col justify-between flex-1">
      <div>
        <span className="text-xs font-semibold" style={{ color: '#06B6D4' }}>
          {item.category}
        </span>
        <h3 className="text-white text-sm font-semibold mt-1 leading-snug line-clamp-2">
          {item.title}
        </h3>
      </div>
      <span className="text-gray-500 text-xs">{item.date}</span>
    </div>
  </div>
)

const NewsEmpty: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-10 gap-3">
    <IconNewspaper />
    <p className="text-gray-500 text-sm text-center">
      Nenhuma notícia disponível no momento.
    </p>
  </div>
)

const NewsSection: React.FC<NewsSectionProps> = ({ news = [], onVerMais }) => {
  return (
    <section className="px-4 mt-8 pb-32">
      <h2 className="text-white text-lg font-bold uppercase mb-4 tracking-wide">
        Notícias
      </h2>

      {news.length === 0 ? (
        <NewsEmpty />
      ) : (
        <div className="flex flex-col gap-3">
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <button
        onClick={onVerMais}
        className="w-full mt-6 py-4 rounded-2xl text-white font-semibold text-base"
        style={{ background: '#00527F' }}
      >
        Ver mais
      </button>
    </section>
  )
}

export default NewsSection
