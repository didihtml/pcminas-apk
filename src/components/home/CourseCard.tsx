import React from 'react'
import type { CourseCard as CourseCardType } from '../../types'

interface CourseCardProps {
  card: CourseCardType
}

const CourseCard: React.FC<CourseCardProps> = ({ card }) => (
  <div className="w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '1.6' }}>
    <img src={card.imageUrl} alt={card.title.replace(/\n/g, ' ')} className="h-full w-full object-cover" />
  </div>
)

export default CourseCard
