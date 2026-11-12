import React from 'react'
import Header from '../components/layout/Header'
import BannerCarousel from '../components/home/BannerCarousel'
import CourseCardsSection from '../components/home/CourseCardsSection'
import VoceporDentroSection from '../components/home/VoceporDentroSection'
import NewsSection from '../components/home/NewsSection'

const HomePage: React.FC<{ onOpenNews: () => void }> = ({ onOpenNews }) => {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)' }}>
      <Header />
      <main>
        <BannerCarousel />
        <CourseCardsSection />
        <VoceporDentroSection />
        <NewsSection onVerMais={onOpenNews} />
      </main>
    </div>
  )
}

export default HomePage
