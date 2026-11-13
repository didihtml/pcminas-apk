import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import MestradoPage from './MestradoPage'
import AperfeicoamentoPage from './AperfeicoamentoPage'
import Header from '../components/layout/Header'
import BannerCarousel from '../components/home/BannerCarousel'
import CourseCardsSection from '../components/home/CourseCardsSection'
import VoceporDentroSection from '../components/home/VoceporDentroSection'
import NewsSection from '../components/home/NewsSection'

const HomePage: React.FC<{ onOpenNews: () => void }> = ({ onOpenNews }) => {
  const [showMestrado, setShowMestrado] = useState(false)
  const [showAperfeicoamento, setShowAperfeicoamento] = useState(false)
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)' }}>
      <Header />
      <main>
        <BannerCarousel />
        <CourseCardsSection onOpenMestrado={() => setShowMestrado(true)} onOpenAperfeicoamento={() => setShowAperfeicoamento(true)} />
        <VoceporDentroSection />
        <NewsSection onVerMais={onOpenNews} />
      </main>
      {showMestrado && createPortal(<MestradoPage onBack={() => setShowMestrado(false)} />, document.body)}
      {showAperfeicoamento && createPortal(<AperfeicoamentoPage onBack={() => setShowAperfeicoamento(false)} />, document.body)}
    </div>
  )
}

export default HomePage
