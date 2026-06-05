import React from 'react'
import { ChevronRight } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'

interface IngressoCard {
  id: string
  title: string
  imageUrl: string
}

const PROCESSOS: IngressoCard[] = [
  {
    id: 'graduacao',
    title: 'Graduação',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=400&fit=crop',
  },
  {
    id: 'pos-graduacao',
    title: 'Pós-graduação',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  },
  {
    id: 'acompanhe',
    title: 'Acompanhe\nsua inscrição',
    imageUrl: 'https://images.unsplash.com/photo-1581726707445-75cbe4efc586?w=400&h=400&fit=crop',
    // ocupa coluna inteira (left)
  },
]

const OUTROS: IngressoCard[] = [
  {
    id: 'matriculas',
    title: 'Matrículas\nem disciplinas\nisoladas',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=400&fit=crop',
  },
  {
    id: 'complementacao',
    title: 'Complementação\nde Estudos',
    imageUrl: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=400&fit=crop',
  },
  {
    id: 'reabertura',
    title: 'Reabertura\nde Matrícula',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: 'transferencia',
    title: 'Transferência\nExterna',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
  },
  {
    id: 'segunda-graduacao',
    title: 'Segunda\nGraduação',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=400&fit=crop',
  },
]

interface PhotoCardProps {
  card: IngressoCard
  tall?: boolean
}

const PhotoCard: React.FC<PhotoCardProps> = ({ card, tall }) => (
  <button
    className="relative rounded-2xl overflow-hidden w-full text-left"
    style={{ height: tall ? '220px' : '180px' }}
    aria-label={card.title}
  >
    <img
      src={card.imageUrl}
      alt={card.title}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.1) 60%)' }}
    />
    <div className="absolute bottom-3 left-3 right-3">
      <p className="text-white text-sm font-bold leading-snug whitespace-pre-line mb-1">
        {card.title}
      </p>
      <div className="flex items-center gap-1">
        <span className="text-white text-[11px] font-semibold uppercase tracking-wide">VER MAIS</span>
        <ChevronRight size={13} className="text-white" strokeWidth={2.5} />
      </div>
    </div>
  </button>
)

interface IngressarPageProps { onBack: () => void }

const IngressarPage: React.FC<IngressarPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen pb-32" style={{ background: 'var(--bg-main)' }}>
      <PageHeader title="Formas de Ingresso" onBack={onBack} />

      <div className="px-4 flex flex-col gap-6" style={{ paddingTop: '80px' }}>
        {/* PROCESSOS SELETIVOS */}
        <section>
          <h2 className="text-primary text-lg font-bold uppercase mb-3 tracking-wide">
            Processos Seletivos
          </h2>

          {/* Grid 2 colunas: Graduação + Pós-graduação */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <PhotoCard card={PROCESSOS[0]} />
            <PhotoCard card={PROCESSOS[1]} />
          </div>

          {/* Acompanhe sua inscrição — metade esquerda */}
          <div className="grid grid-cols-2 gap-3">
            <PhotoCard card={PROCESSOS[2]} tall />
            <div /> {/* espaço vazio à direita */}
          </div>
        </section>

        {/* OUTROS */}
        <section>
          <h2 className="text-primary text-lg font-bold uppercase mb-3 tracking-wide">
            Outros
          </h2>

          {/* Grid 2×2 */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {OUTROS.slice(0, 4).map((card) => (
              <PhotoCard key={card.id} card={card} tall />
            ))}
          </div>

          {/* Segunda Graduação — metade esquerda */}
          <div className="grid grid-cols-2 gap-3">
            <PhotoCard card={OUTROS[4]} tall />
            <div />
          </div>
        </section>
      </div>
    </div>
  )
}

export default IngressarPage
