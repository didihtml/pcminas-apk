import React from 'react'
import CourseCard from './CourseCard'
import type { CourseCard as CourseCardType } from '../../types'

const COURSE_CARDS: CourseCardType[] = [
  {
    id: 'graduacao',
    title: 'Graduação',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=360&fit=crop&crop=face',
  },
  {
    id: 'pos-graduacao',
    title: 'Pós-Graduação\nLato Sensu',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=360&fit=crop&crop=face',
  },
  {
    id: 'mestrado',
    title: 'Mestrado e\nDoutorado',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=360&fit=crop&crop=face',
  },
  {
    id: 'aperfeicoamento',
    title: 'Aperfeiçoamento',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=360&fit=crop&crop=face',
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
