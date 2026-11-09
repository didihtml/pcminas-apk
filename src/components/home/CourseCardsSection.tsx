import React from 'react'
import CourseCard from './CourseCard'
import type { CourseCard as CourseCardType } from '../../types'

const COURSE_CARDS: CourseCardType[] = [
  {
    id: 'graduacao',
    title: 'Graduação',
    imageUrl: '/curso-graduacao.png',
  },
  {
    id: 'pos-graduacao',
    title: 'Pós-Graduação\nLato Sensu',
    imageUrl: '/curso-pos-graduacao.png',
  },
  {
    id: 'mestrado',
    title: 'Mestrado e\nDoutorado',
    imageUrl: '/curso-mestrado.png',
  },
  {
    id: 'aperfeicoamento',
    title: 'Aperfeiçoamento',
    imageUrl: '/curso-aperfeicoamento.png',
  },
]

const CourseCardsSection: React.FC = () => {
  return (
    <section className="px-4 mt-6">
      <h2 className="text-primary text-lg font-bold uppercase mb-4 tracking-wide">
        Vem Pra PUC
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {COURSE_CARDS.map((card) => (
          <CourseCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  )
}

export default CourseCardsSection
