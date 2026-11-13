import React from 'react'
import CourseCard from './CourseCard'
import type { CourseCard as CourseCardType } from '../../types'

const COURSE_CARDS: CourseCardType[] = [
  { id: 'graduacao', title: 'Graduação', imageUrl: '/curso-graduacao.png' },
  { id: 'pos-graduacao', title: 'Pós-Graduação\nLato Sensu', imageUrl: '/curso-pos-graduacao.png' },
  { id: 'mestrado', title: 'Mestrado e\nDoutorado', imageUrl: '/curso-mestrado.png' },
  { id: 'aperfeicoamento', title: 'Aperfeiçoamento', imageUrl: '/curso-aperfeicoamento.png' },
]

const CourseCardsSection: React.FC<{ onOpenGraduacao: () => void; onOpenPosGraduacao: () => void; onOpenMestrado: () => void; onOpenAperfeicoamento: () => void }> = ({ onOpenGraduacao, onOpenPosGraduacao, onOpenMestrado, onOpenAperfeicoamento }) => (
  <section className="mt-[29px] px-[15px]">
    <h2 className="mb-[19px] text-[18px] font-bold uppercase leading-6 text-white">Vem Pra PUC</h2>
    <div className="grid grid-cols-2 gap-x-[10px] gap-y-[20px]">
      {COURSE_CARDS.map(card => <CourseCard key={card.id} card={card} onClick={card.id === 'graduacao' ? onOpenGraduacao : card.id === 'pos-graduacao' ? onOpenPosGraduacao : card.id === 'mestrado' ? onOpenMestrado : onOpenAperfeicoamento} />)}
    </div>
  </section>
)
export default CourseCardsSection
