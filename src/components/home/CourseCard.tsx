import React from 'react'
import type { CourseCard as CourseCardType } from '../../types'

interface CourseCardProps {
  card: CourseCardType
  onClick?: () => void
}

const CourseCard: React.FC<CourseCardProps> = ({ card, onClick }) => onClick ? (
  <button type="button" onClick={onClick} aria-label={card.title.replace(/\n/g, ' ')} className="w-full overflow-hidden rounded-[8px]" style={{ aspectRatio: '1.6' }}>
    <img src={card.imageUrl} alt="" className="h-full w-full object-cover" />
  </button>
) : (
  <div className="w-full overflow-hidden rounded-[8px]" style={{ aspectRatio: '1.6' }}>
    <img src={card.imageUrl} alt={card.title.replace(/\n/g, ' ')} className="h-full w-full object-cover" />
  </div>
)

export default CourseCard
