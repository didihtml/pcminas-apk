import React from 'react'
import { Construction } from 'lucide-react'

interface PlaceholderPageProps {
  title: string
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4 px-8"
      style={{ background: 'var(--bg-main)' }}
    >
      <Construction size={56} className="text-muted" />
      <h1 className="text-primary text-2xl font-bold text-center">{title}</h1>
      <p className="text-gray-500 text-sm text-center">
        Esta seção está em desenvolvimento.
      </p>
    </div>
  )
}

export default PlaceholderPage
