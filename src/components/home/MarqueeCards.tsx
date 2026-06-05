import React from 'react'

interface MarqueeCard {
  id: string
  title: string
  subtitle: string
  color: string
}

const CARDS: MarqueeCard[] = [
  { id: '1', title: 'Vestibular 2025', subtitle: 'Inscrições abertas', color: '#1B4FD8' },
  { id: '2', title: 'ENEM', subtitle: 'Use sua nota', color: '#0891B2' },
  { id: '3', title: 'Bolsas', subtitle: 'ProUni e FIES', color: '#0F6B8E' },
  { id: '4', title: 'EAD', subtitle: 'Cursos online', color: '#1B4FD8' },
  { id: '5', title: 'Extensão', subtitle: 'Novos cursos', color: '#0891B2' },
  { id: '6', title: 'Pós-Grad', subtitle: 'MBA e Lato Sensu', color: '#0F6B8E' },
]

// Duplica para loop infinito
const ITEMS = [...CARDS, ...CARDS]

const MarqueeCards: React.FC = () => {
  return (
    <div className="mt-5 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: marquee 18s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-track">
        {ITEMS.map((card, i) => (
          <div
            key={i}
            className="flex-shrink-0 flex flex-col justify-between rounded-2xl px-4 py-3"
            style={{
              width: '140px',
              height: '80px',
              background: `linear-gradient(135deg, ${card.color}cc, ${card.color}66)`,
              border: `1px solid ${card.color}88`,
              backdropFilter: 'blur(8px)',
            }}
          >
            <span className="text-white text-[11px] font-bold uppercase tracking-wider leading-tight">
              {card.title}
            </span>
            <span className="text-white/70 text-[10px] font-medium">
              {card.subtitle}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarqueeCards
