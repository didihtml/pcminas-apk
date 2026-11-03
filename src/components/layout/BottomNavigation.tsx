import React from 'react'
import { MapPin } from 'lucide-react'
import type { NavTab } from '../../types'

const IconHome = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M15 18H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

// Recibo/certificado com linhas e borda ondulada
const IconIngressar = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3h14v13.5c0 0-1.2 1-2 0s-2 0-2 0-1.2 1-2 0-2 0-2 0-1.2 1-2 0-2 0V3z" />
    <line x1="8" y1="7" x2="16" y2="7" />
    <line x1="8" y1="10.5" x2="16" y2="10.5" />
    <circle cx="12" cy="19.5" r="1.5" />
  </svg>
)

// Prédio clássico com colunas e frontão
const IconAPuc = () => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
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
  <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4 20c0-3.8 3.6-6.5 8-6.5s8 2.7 8 6.5" />
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
    { id: 'campi',     label: 'Campi',     icon: <MapPin size={21} /> },
    { id: 'a-puc',     label: 'A PUC',     icon: <IconAPuc /> },
  ]

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50"
      style={{ background: 'var(--bg-nav)' }}
    >
      <div className="relative flex items-end justify-around px-1 pb-[max(18px,env(safe-area-inset-bottom))] pt-3">
        {navItems.map((item) => {
          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="relative -mt-9 flex min-w-[66px] flex-col items-center"
                aria-label="Portal do Aluno"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
                  style={{ background: '#06557D' }}
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
              onClick={() => onTabChange(item.id)}
            className="relative flex min-w-[62px] flex-col items-center gap-1.5"
            >
              {isActive && (
                <span className="absolute -top-3 left-1/2 h-0.5 w-10 -translate-x-1/2 rounded-full" style={{ background: 'var(--nav-active)' }} />
              )}
              <span style={{ color: isActive ? 'var(--nav-active)' : 'var(--nav-inactive)' }}>
                {item.icon}
              </span>
              <span className="text-[10px] font-medium" style={{ color: isActive ? 'var(--nav-active)' : 'var(--nav-inactive)' }}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation
