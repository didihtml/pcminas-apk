import React from 'react'
import { ImageOff } from 'lucide-react'

const VoceporDentroSection: React.FC = () => (
  <section className="home-inside">
    <h2 className="home-section-title">VOCÊ POR DENTRO</h2>
    <div className="home-inside-empty">
      <ImageOff size={31} strokeWidth={2.5} aria-hidden="true" />
      <p>Nenhum conteúdo disponível no<br /> momento.</p>
    </div>
  </section>
)
export default VoceporDentroSection
