import React from 'react'
import { ArrowLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  onBack: () => void
  hideBack?: boolean
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack, hideBack = false }) => (
  <div
    className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 flex items-center justify-between px-5"
    style={{ background: 'var(--bg-header)', height: hideBack ? '102px' : '64px', paddingTop: hideBack ? '34px' : '10px' }}
  >
    <button onClick={onBack} className={`text-white p-1 ${hideBack ? 'invisible' : ''}`} aria-label="Voltar" tabIndex={hideBack ? -1 : undefined}>
      <ArrowLeft size={22} strokeWidth={2} />
    </button>
    <span className={`text-white text-sm font-semibold uppercase ${hideBack ? '' : 'tracking-widest'}`}>
      {title}
    </span>
    <div className="w-8" />
  </div>
)

export default PageHeader
