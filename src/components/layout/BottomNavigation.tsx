import React from 'react'
import { MapPin } from 'lucide-react'
import type { NavTab } from '../../types'

const IconHome = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 10.4a2 2 0 0 1 .7-1.5l6.5-5.5a2 2 0 0 1 2.6 0l6.5 5.5a2 2 0 0 1 .7 1.5v8.1a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />
    <path d="M8.5 16.5h7" />
  </svg>
)

const IconIngressar = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="2.5" width="17" height="18.5" rx="2" />
    <path d="M7.5 6.5h9M8 9.5h8" />
    <circle cx="12" cy="14" r="2.5" />
    <path d="m10 15.8-1.1 4 3.1-1.5 3.1 1.5-1.1-4" />
  </svg>
)

// Prédio clássico com colunas e frontão
const IconAPuc = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 9l10-6 10 6H2z" />
    <line x1="5"  y1="9" x2="5"  y2="18" />
    <line x1="9"  y1="9" x2="9"  y2="18" />
    <line x1="15" y1="9" x2="15" y2="18" />
    <line x1="19" y1="9" x2="19" y2="18" />
    <line x1="2" y1="18" x2="22" y2="18" />
    <line x1="2" y1="21" x2="22" y2="21" />
  </svg>
)

// Pessoa centralizada
const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="7.5" r="3.5" />
    <path d="M4.5 20v-1.1c0-2.5 2-4.4 4.5-4.4h6c2.5 0 4.5 1.9 4.5 4.4V20" />
  </svg>
)

interface NavItem {
  id: NavTab
  label: string
  icon: React.ReactNode
  isCenter?: boolean
}

interface BottomNavigationProps {
  activeTab: NavTab
  onTabChange: (tab: NavTab) => void
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const navItems: NavItem[] = [
    { id: 'inicio',    label: 'Início',    icon: <IconHome /> },
    { id: 'ingressar', label: 'Ingressar', icon: <IconIngressar /> },
    { id: 'portal',    label: '',          icon: <IconUser />, isCenter: true },
    { id: 'campi',     label: 'Campi',     icon: <MapPin size={17} strokeWidth={1.8} aria-hidden="true" /> },
    { id: 'a-puc',     label: 'A PUC',     icon: <IconAPuc /> },
  ]

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 rounded-t-[14px] border-t border-white/[0.04]"
      style={{ background: 'var(--bg-nav)' }}
      aria-label="Navegação principal"
    >
      <div className="relative grid h-[95px] grid-cols-5 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          if (item.isCenter) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className="relative flex justify-center"
                aria-label="Portal do Aluno"
              >
                <div
                  className="absolute -top-[14px] h-[59px] w-[59px] rounded-full flex items-center justify-center text-white"
                  style={{ background: '#00537d' }}
                >
                  {item.icon}
                </div>
              </button>
            )
          }

          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              aria-current={isActive ? 'page' : undefined}
            className="relative flex flex-col items-center gap-1 pt-[15px]"
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 h-[3px] w-[32px] -translate-x-1/2 rounded-full" style={{ background: 'var(--nav-active)' }} />
              )}
              <span style={{ color: isActive ? 'var(--nav-active)' : 'var(--nav-inactive)' }}>
                {item.icon}
              </span>
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-normal'}`} style={{ color: isActive ? 'var(--nav-active)' : 'var(--nav-inactive)' }}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation

