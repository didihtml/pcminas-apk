import React from 'react'
import { ChevronRight, Award, Star, FlaskConical, MonitorPlay, Settings2 } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'missao',        label: 'Missão e Valores', icon: <Award size={22} strokeWidth={1.6} /> },
  { id: 'reitoria',     label: 'Reitoria',          icon: <Star size={22} strokeWidth={1.6} /> },
  { id: 'pesquisa',     label: 'Pesquisa',           icon: <FlaskConical size={22} strokeWidth={1.6} /> },
  { id: 'extensao',     label: 'Extensão',           icon: <MonitorPlay size={22} strokeWidth={1.6} /> },
  { id: 'configuracoes',label: 'Configurações',      icon: <Settings2 size={22} strokeWidth={1.6} /> },
]

interface APucPageProps {
  onBack: () => void;
  onMissaoValores: () => void;
}

const APucPage: React.FC<APucPageProps> = ({ onBack, onMissaoValores }) => {
  return (
    <div className="min-h-screen pb-32" style={{ background: 'var(--bg-main)' }}>
      <PageHeader title="A PUC" onBack={onBack} />

      {/* Imagem de apresentação */}
      <div className="mx-4" style={{ paddingTop: '80px' }}>
        <div className="relative rounded-2xl overflow-hidden" style={{ height: '200px' }}>
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop"
            alt="PUC Minas"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)' }}
          />
          <div className="absolute bottom-4 left-4">
            <p className="text-white text-lg font-bold uppercase tracking-wide leading-tight">
              APRESENTAÇÃO
            </p>
            <a
              href="https://www.pucminas.br/destaques/Paginas/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 mt-1"
            >
              <span className="text-white text-xs font-semibold uppercase tracking-widest">
                VER MAIS
              </span>
              <ChevronRight size={14} className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Menu list */}
      <div className="mx-4 mt-5 flex flex-col gap-3">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === 'missao') onMissaoValores();
            }}
            className="flex items-center justify-between w-full px-4 py-4 rounded-2xl"
            style={{ background: 'var(--bg-card)' }}
          >
            <div className="flex items-center gap-4">
              <span className="text-primary">{item.icon}</span>
              <span className="text-primary text-sm font-medium">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        ))}
      </div>

      {/* Versão */}
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-xs leading-7">
          <span className="font-semibold text-primary">Versão:</span> 3.0.12<br />
          <span className="font-semibold text-primary">Compilação:</span> 1.318<br />
          <span className="font-semibold text-primary">OTA:</span> 0.0.32
        </p>
      </div>
    </div>
  )
}

export default APucPage
