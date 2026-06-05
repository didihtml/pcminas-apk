import React from 'react'
import { ArrowLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  onBack: () => void
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack }) => (
  <div
    className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-30 flex items-center justify-between px-5"
    style={{ background: 'var(--bg-header)', height: '64px', paddingTop: '10px' }}
  >
    <button onClick={onBack} className="text-white p-1">
      <ArrowLeft size={22} strokeWidth={2} />
    </button>
    <span className="text-white text-sm font-bold uppercase tracking-widest">
      {title}
    </span>
    <div className="w-8" />
  </div>
)

export default PageHeader
