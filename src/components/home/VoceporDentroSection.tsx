import React, { useEffect, useState } from 'react'

const cards = [
  { title: 'Calendário acadêmico e administrativo 2025 e 2026', image: '/carrossel-calendario.png' },
  { title: 'Tour virtual PUC Minas', image: '/carrossel-tour.png' },
  { title: 'Bolsas e financiamento', image: '/carrossel-bolsas.png' },
]
const items = [...cards, ...cards]
const cardWidth = 272
const gap = 12

const VoceporDentroSection: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [animated, setAnimated] = useState(true)

  useEffect(() => {
    let resetTimer: ReturnType<typeof setTimeout>
    let animationTimer: ReturnType<typeof setTimeout>
    const interval = setInterval(() => {
      setIndex(prev => {
        const next = prev + 1
        if (next >= cards.length) {
          resetTimer = setTimeout(() => {
            setAnimated(false)
            setIndex(0)
            animationTimer = setTimeout(() => setAnimated(true), 50)
          }, 400)
        }
        return next
      })
    }, 2500)
    return () => { clearInterval(interval); clearTimeout(resetTimer); clearTimeout(animationTimer) }
  }, [])

  return (
    <section className="mt-8">
      <h2 className="mb-4 px-4 text-lg font-bold uppercase tracking-wide text-white">Você Por Dentro</h2>
      <div className="overflow-hidden pl-4">
        <div className="flex w-max" style={{ gap, transform: `translateX(-${index * (cardWidth + gap)}px)`, transition: animated ? 'transform 0.4s cubic-bezier(0.4,0,0.2,1)' : 'none' }}>
          {items.map((card, i) => <img key={`${card.image}-${i}`} src={card.image} alt={card.title} className="block shrink-0 rounded-xl object-cover" style={{ width: cardWidth, aspectRatio: '370 / 166' }} />)}
        </div>
      </div>
    </section>
  )
}
export default VoceporDentroSection
