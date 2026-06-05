import React, { useEffect, useState } from 'react'
import type { InsideCard } from '../../types'

const INSIDE_CARDS: InsideCard[] = [
  {
    id: 'tour-virtual',
    title: 'Tour Virtual',
    subtitle: 'Conheça a PUC Minas sem sair de casa.',
    imageUrl: 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=600&h=300&fit=crop',
    buttonLabel: 'Acesse',
  },
  {
    id: 'calendario',
    title: 'Calendário',
    subtitle: 'Acadêmico e Administrativo 2024-2025.',
    imageUrl: '',
    buttonLabel: 'Ver',
  },
  {
    id: 'bolsas',
    title: 'Bolsas e Financiamentos',
    subtitle: 'ProUni, FIES e bolsas próprias.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=300&fit=crop',
    buttonLabel: 'Saiba mais',
  },
  {
    id: 'pesquisa',
    title: 'Pesquisa',
    subtitle: 'Inovação e ciência na PUC Minas.',
    imageUrl: '/pesquisa.jpg',
    buttonLabel: 'Ver mais',
  },
]

const ITEMS = [...INSIDE_CARDS, ...INSIDE_CARDS]

const CARD_WIDTH = 272
const GAP = 12
const STEP = CARD_WIDTH + GAP

// Pins decorativos para o card Tour Virtual
const MAP_PINS = [
  { x: '18%', y: '18%' }, { x: '52%', y: '10%' }, { x: '76%', y: '22%' },
  { x: '38%', y: '38%' }, { x: '62%', y: '55%' }, { x: '85%', y: '48%' },
  { x: '22%', y: '62%' }, { x: '70%', y: '75%' },
]

const MapPin: React.FC<{ x: string; y: string; small?: boolean }> = ({ x, y, small }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={small ? 10 : 13}
    height={small ? 14 : 17}
    viewBox="0 0 13 17"
    style={{ position: 'absolute', left: x, top: y, opacity: 0.55 }}
  >
    <path
      d="M6.5 0C3.46 0 1 2.46 1 5.5c0 4.12 5.5 11 5.5 11S12 9.62 12 5.5C12 2.46 9.54 0 6.5 0zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
      fill="rgba(100,220,180,0.85)"
    />
  </svg>
)

const TourVirtualCard: React.FC = () => (
  <div
    className="relative flex-shrink-0 rounded-xl overflow-hidden"
    style={{ width: `${CARD_WIDTH}px`, height: '148px' }}
  >
    {/* Fundo: foto aérea */}
    <img
      src={INSIDE_CARDS[0].imageUrl}
      alt="Tour Virtual"
      className="w-full h-full object-cover absolute inset-0"
    />
    {/* Overlay azul-marinho */}
    <div
      className="absolute inset-0"
      style={{ background: 'rgba(8,20,58,0.78)' }}
    />

    {/* Pins decorativos */}
    {MAP_PINS.map((p, i) => (
      <MapPin key={i} x={p.x} y={p.y} small={i % 2 === 1} />
    ))}

    {/* Conteúdo */}
    <div className="relative w-full h-full flex">
      {/* Lado esquerdo: ícone + título */}
      <div className="flex flex-col justify-center pl-4 pr-2" style={{ width: '52%' }}>
        {/* Ícone seta circular */}
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
          <path
            d="M18 6C11.37 6 6 11.37 6 18s5.37 12 12 12 12-5.37 12-12"
            stroke="#3DD68C"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M30 18 l-2-5 l4.5 1.5z"
            fill="#3DD68C"
          />
          {/* Seta real usando path */}
          <path
            d="M28 11 L30 18 L24 15"
            stroke="#3DD68C"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span
          className="text-white font-black uppercase leading-none"
          style={{ fontSize: '18px', letterSpacing: '-0.3px', lineHeight: 1.05 }}
        >
          TOUR{'\n'}VIRTUAL
        </span>
        {/* quebra manual */}
        <span
          className="text-white font-black uppercase leading-none block"
          style={{ fontSize: '18px', letterSpacing: '-0.3px' }}
        />
      </div>

      {/* Lado direito: subtítulo + botão */}
      <div className="flex flex-col justify-between py-4 pr-4" style={{ width: '48%' }}>
        <p
          className="text-white font-bold uppercase leading-tight"
          style={{ fontSize: '9.5px', letterSpacing: '0.2px' }}
        >
          CONHEÇA A PUC MINAS<br />SEM SAIR DE CASA.
        </p>
        <button
          className="self-start px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
          style={{ border: '1.5px solid #3DD68C', color: '#3DD68C', background: 'transparent', fontSize: '10px' }}
        >
          ACESSE
        </button>
      </div>
    </div>
  </div>
)

const CalendarioCard: React.FC = () => (
  <div
    className="relative flex-shrink-0 rounded-xl overflow-hidden"
    style={{ width: `${CARD_WIDTH}px`, height: '148px' }}
  >
    <svg
      width="272" height="148"
      viewBox="0 0 272 148"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
    >
      {/* Fundo */}
      <rect width="272" height="148" fill="#0B1A35" />

      {/* Folhas decorativas - canto superior esquerdo */}
      <g opacity="0.85">
        <path d="M-5 30 Q10 10 30 20 Q15 35 -5 30Z" fill="#1A6B3A" />
        <path d="M5 55 Q25 30 45 45 Q28 62 5 55Z" fill="#2E8B4A" opacity="0.8" />
        <path d="M-8 70 Q18 50 35 65 Q18 82 -8 70Z" fill="#145228" opacity="0.7" />
        <path d="M20 15 Q38 0 50 18 Q35 28 20 15Z" fill="#3AAD5A" opacity="0.6" />
        {/* Hastes */}
        <path d="M5 80 Q20 55 38 40" stroke="#2E8B4A" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M15 90 Q32 70 52 58" stroke="#1A6B3A" strokeWidth="1" fill="none" opacity="0.5" />
        {/* Detalhes coloridos */}
        <circle cx="38" cy="22" r="3" fill="#E8A020" opacity="0.9" />
        <circle cx="52" cy="40" r="2" fill="#D94F30" opacity="0.8" />
        <circle cx="28" cy="48" r="2.5" fill="#E8C040" opacity="0.7" />
      </g>

      {/* Folhas decorativas - canto superior direito */}
      <g opacity="0.8">
        <path d="M220 -5 Q250 15 245 40 Q225 25 220 -5Z" fill="#0E4A6B" />
        <path d="M240 10 Q272 25 268 55 Q248 42 240 10Z" fill="#0A3A58" opacity="0.9" />
        <path d="M250 40 Q272 60 265 85 Q248 70 250 40Z" fill="#1B6B8A" opacity="0.7" />
        {/* Espiral/círculo decorativo */}
        <path d="M255 30 Q275 40 270 60 Q258 68 248 58 Q242 48 252 42 Q260 38 262 48 Q258 54 252 50" stroke="#1E8FAA" strokeWidth="1.5" fill="none" opacity="0.7" />
      </g>

      {/* Folhas canto inferior direito */}
      <g opacity="0.75">
        <path d="M235 110 Q265 95 270 120 Q248 130 235 110Z" fill="#1A6B3A" />
        <path d="M248 128 Q272 115 272 145 Q255 148 248 128Z" fill="#2E8B4A" opacity="0.8" />
        <circle cx="242" cy="105" r="2.5" fill="#E8C040" opacity="0.8" />
        <circle cx="258" cy="118" r="2" fill="#D94F30" opacity="0.7" />
      </g>

      {/* Folhas canto inferior esquerdo */}
      <g opacity="0.6">
        <path d="M0 120 Q20 105 35 118 Q20 132 0 120Z" fill="#2E8B4A" />
        <path d="M10 138 Q30 125 45 140 Q30 148 10 138Z" fill="#145228" />
      </g>

      {/* ── Textos ── */}
      {/* CALENDÁRIO */}
      <text x="14" y="42" fill="white" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="22" letterSpacing="-0.5">
        CALENDÁRIO
      </text>

      {/* ACADÊMICO e ADMINISTRATIVO */}
      <text x="14" y="58" fill="white" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="8.5" letterSpacing="0.3">
        ACADÊMICO e ADMINISTRATIVO
      </text>

      {/* Linha separadora */}
      <line x1="14" y1="65" x2="185" y2="65" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />

      {/* 2024 • 2025 */}
      <text x="14" y="90" fill="white" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="20" letterSpacing="1">
        • 2024 • 2025 •
      </text>

      {/* Brasão PUC Minas (simplificado) */}
      <g transform="translate(200, 30)">
        {/* Base do brasão */}
        <path d="M26 0 L52 10 L52 38 Q52 52 26 60 Q0 52 0 38 L0 10 Z" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
        {/* Cruz */}
        <line x1="26" y1="8" x2="26" y2="52" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
        <line x1="10" y1="28" x2="42" y2="28" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
        {/* Chaves/ornamento */}
        <circle cx="26" cy="20" r="5" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
        <circle cx="16" cy="36" r="3.5" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
        <circle cx="36" cy="36" r="3.5" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
        {/* Mitria (cúpula) */}
        <path d="M18 0 Q26 -8 34 0" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" fill="none" />
        <circle cx="26" cy="-2" r="2" fill="rgba(255,255,255,0.85)" />
      </g>

      {/* PUC Minas texto */}
      <text x="208" y="106" fill="white" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10" letterSpacing="0.5">
        PUC Minas
      </text>
    </svg>
  </div>
)

const BolsasCard: React.FC = () => (
  <div
    className="relative flex-shrink-0 rounded-xl overflow-hidden"
    style={{ width: `${CARD_WIDTH}px`, height: '148px', background: '#1A1A1A' }}
  >
    {/* Foto lado esquerdo */}
    <img
      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
      alt="Bolsas"
      className="absolute inset-0 object-cover"
      style={{ width: '52%', height: '100%', filter: 'grayscale(100%) brightness(0.85)' }}
    />

    {/* Gradiente de transição foto → fundo escuro */}
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(to right, transparent 30%, #1A1A1A 52%)' }}
    />

    {/* Lado direito: texto + botão */}
    <div
      className="absolute right-0 top-0 h-full flex flex-col justify-between py-4 px-4"
      style={{ width: '55%' }}
    >
      <p
        className="text-white font-black uppercase leading-tight text-right"
        style={{ fontSize: '11.5px', letterSpacing: '0.2px' }}
      >
        INFORME-SE<br />SOBRE BOLSAS<br />E FINANCIAMENTO
      </p>

      <button
        className="self-end px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
        style={{ border: '1px solid rgba(255,255,255,0.6)', background: 'transparent' }}
      >
        SAIBA MAIS
      </button>
    </div>
  </div>
)

const DefaultCard: React.FC<{ card: InsideCard }> = ({ card }) => (
  <div
    className="relative flex-shrink-0 rounded-xl overflow-hidden"
    style={{ width: `${CARD_WIDTH}px`, height: '148px' }}
  >
    <img
      src={card.imageUrl}
      alt={card.title}
      className="w-full h-full object-cover absolute inset-0"
    />
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(8,32,88,0.55) 100%)' }}
    />
    <div className="relative p-4 flex flex-col h-full justify-between">
      <div>
        <h3 className="text-white text-lg font-black uppercase leading-tight">{card.title}</h3>
        <p className="text-gray-200 text-xs mt-1 max-w-[150px]">{card.subtitle}</p>
      </div>
      <button
        className="self-end px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
        style={{ border: '1.5px solid #06B6D4', color: '#06B6D4', background: 'transparent' }}
      >
        {card.buttonLabel}
      </button>
    </div>
  </div>
)

const VoceporDentroSection: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [animated, setAnimated] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => {
        const next = prev + 1
        if (next >= INSIDE_CARDS.length) {
          setTimeout(() => {
            setAnimated(false)
            setIndex(0)
            setTimeout(() => setAnimated(true), 50)
          }, 400)
        }
        return next
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="mt-8">
      <h2 className="text-white text-lg font-bold uppercase mb-4 tracking-wide px-4">
        Você Por Dentro
      </h2>

      <div className="overflow-hidden pl-4">
        <div
          style={{
            display: 'flex',
            gap: `${GAP}px`,
            width: 'max-content',
            transform: `translateX(-${index * STEP}px)`,
            transition: animated ? 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        >
          {ITEMS.map((card, i) => {
            if (card.id === 'tour-virtual') return <TourVirtualCard key={i} />
            if (card.id === 'calendario') return <CalendarioCard key={i} />
            if (card.id === 'bolsas') return <BolsasCard key={i} />
            return <DefaultCard key={i} card={card} />
          })}
        </div>
      </div>
    </section>
  )
}

export default VoceporDentroSection
