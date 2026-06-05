import React from 'react'
import { ChevronRight } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'

interface Campus {
  id: string
  name: string
  address: string
  imageUrl: string
}

const CAMPI: Campus[] = [
  {
    id: 'barreiro',
    name: 'Campus Barreiro',
    address: 'Av. Afonso Vaz de Melo, 1.200, Barreiro de Baixo, Belo Horizonte - MG - 30640-070',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=300&h=300&fit=crop',
  },
  {
    id: 'betim',
    name: 'Campus Betim',
    address: 'R. do Rosário, 1.081, Angola, Betim - MG - 32604-115',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300&h=300&fit=crop',
  },
  {
    id: 'contagem',
    name: 'Campus Contagem',
    address: 'R. Rio Comprido, 4.580, Contagem - MG - 32010-025',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=300&fit=crop',
  },
  {
    id: 'coracao-eucaristico',
    name: 'Campus Coração Eucarístico',
    address: 'Av. Dom José Gaspar, 500, Coração Eucarístico, Belo Horizonte - MG - 30535-901',
    imageUrl: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=300&h=300&fit=crop',
  },
  {
    id: 'lourdes',
    name: 'Campus Lourdes',
    address: 'Ed. Dom Cabral - Av. Brasil, 2.023 - Savassi - Belo Horizonte - MG - 30140-002',
    imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=300&h=300&fit=crop',
  },
  {
    id: 'sao-gabriel',
    name: 'Campus São Gabriel',
    address: 'Anel Rodoviário Km 23,5 - Rua Walter Ianni, 255 - São Gabriel - Belo Horizonte - MG - 31980-110',
    imageUrl: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=300&h=300&fit=crop',
  },
  {
    id: 'pocos-de-caldas',
    name: 'Campus Poços de Caldas',
    address: 'Av. Padre Francis Cletus Cox, 1661 - Poços de Caldas - MG - 37701-355',
    imageUrl: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=300&h=300&fit=crop',
  },
  {
    id: 'serro',
    name: 'Campus Serro',
    address: 'Praça João Pessoa, 74 - Centro - CEP: 39150-000 - Serro - MG',
    imageUrl: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=300&h=300&fit=crop',
  },
]

const CampusCard: React.FC<{ campus: Campus }> = ({ campus }) => (
  <button
    className="flex items-start gap-4 w-full p-4 rounded-2xl text-left"
    style={{ background: 'var(--bg-card)' }}
  >
    <img
      src={campus.imageUrl}
      alt={campus.name}
      className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
    />
    <div className="flex-1 min-w-0 pt-0.5">
      <h3 className="text-primary text-base font-bold leading-snug mb-1">
        {campus.name}
      </h3>
      <p className="text-muted text-xs leading-relaxed mb-2">
        {campus.address}
      </p>
      <div className="flex items-center gap-1">
        <span className="text-primary text-xs font-bold uppercase tracking-wide">
          VER MAIS
        </span>
        <ChevronRight size={13} className="text-primary" strokeWidth={2.5} />
      </div>
    </div>
  </button>
)

interface CampiPageProps { onBack: () => void }

const CampiPage: React.FC<CampiPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen pb-32" style={{ background: 'var(--bg-main)' }}>
      <PageHeader title="Campi" onBack={onBack} />
      <div className="px-4 flex flex-col gap-3" style={{ paddingTop: '80px' }}>
        {CAMPI.map((campus) => (
          <CampusCard key={campus.id} campus={campus} />
        ))}
      </div>
    </div>
  )
}

export default CampiPage
