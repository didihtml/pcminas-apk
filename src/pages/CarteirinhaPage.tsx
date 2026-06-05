import React, { useState } from 'react'

type PortalTab = 'carteirinha' | 'disciplinas' | 'academico' | 'menu'

interface CarteirinhaPageProps {
  onBack: () => void
}

const PlaceholderTab: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex-1 flex items-center justify-center">
    <p className="text-gray-400 text-sm">{label} — em breve</p>
  </div>
)

const CarteirinhaPage: React.FC<CarteirinhaPageProps> = ({ onBack: _onBack }) => {
  const [activeTab, _setActiveTab] = useState<PortalTab>('carteirinha')

  return (
  <div className="h-screen flex flex-col" style={{ background: 'var(--bg-main)' }}>

    {/* Header */}
    <div
      className="flex items-center justify-between px-5"
      style={{ background: '#00527F', height: '90px', paddingTop: '36px' }}
    >
      <div className="w-8" />
      <span className="text-white text-sm font-bold uppercase tracking-widest">
        Cartões de Acesso
      </span>
      <svg width="20" height="20" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="m13.58 11.6-1.33-2.18V6.33A4.36 4.36 0 0 0 10 2.26a2.45 2.45 0 0 0 0-.38A1.94 1.94 0 0 0 8 0a1.94 1.94 0 0 0-2 1.88 1.64 1.64 0 0 0 0 .38 4.36 4.36 0 0 0-2.25 4.07v3.09L2.42 11.6a1.25 1.25 0 0 0 1.06 1.9h1.77A2.68 2.68 0 0 0 8 16a2.68 2.68 0 0 0 2.75-2.5h1.77a1.25 1.25 0 0 0 1.06-1.9zM7.25 1.88A.7.7 0 0 1 8 1.25a.7.7 0 0 1 .75.63 6 6 0 0 0-.75 0 5.9 5.9 0 0 0-.75 0zM8 14.75a1.44 1.44 0 0 1-1.5-1.25h3A1.44 1.44 0 0 1 8 14.75zm-4.52-2.5 1.34-2.17.18-.31V6.33a4 4 0 0 1 .6-2.12A2.68 2.68 0 0 1 8 3.12a2.68 2.68 0 0 1 2.4 1.09 4 4 0 0 1 .6 2.12v3.44l.18.31 1.34 2.17z"/>
        </svg>
    </div>

    {/* Conteúdo */}
    {activeTab !== 'carteirinha' && <PlaceholderTab label={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} />}
    <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24" style={{ display: activeTab === 'carteirinha' ? 'block' : 'none' }}>

      {/* Card principal */}
      <div className="flex flex-col overflow-hidden" style={{ background: '#024D85', borderRadius: '10px' }}>

        {/* Seção superior: foto + nome + código */}
        <div className="p-4 flex gap-4 items-start">
          {/* Foto retangular arredondada */}
          <div
            className="flex-shrink-0 overflow-hidden"
            style={{
              width: '110px',
              height: '130px',
              borderRadius: '14px',
              border: '3px solid #7ECCEF',
              background: '#024D85',
            }}
          >
            <img
              src="/felipetestepuc.jpg"
              alt="Foto do aluno"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Nome e código */}
          <div className="flex flex-col gap-2 pt-1">
            <div>
              <p className="text-xs mb-0.5" style={{ color: '#85AFBC' }}>Nome</p>
              <p className="text-white text-sm font-bold leading-tight">Robson Bernado Dos Santos Leandro</p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: '#85AFBC' }}>Código</p>
              <p className="text-white text-sm font-semibold">7362946285</p>
            </div>
          </div>
        </div>

        {/* Grade de informações */}
        <div className="px-4 pb-4 grid grid-cols-2 gap-x-3 gap-y-3">
          {[
            { label: 'Atribuição', value: 'Aluno',                    bold: true  },
            { label: 'RG',         value: 'MG-23.213.415',            bold: true  },
            { label: 'CPF',        value: '122.732.816.84',           bold: true  },
            { label: 'Nascimento', value: '03/03/2008',               bold: true  },
            { label: 'Campus',     value: 'Campus Poços De\nCaldas',  bold: true  },
            { label: 'Curso',      value: 'Ciência da Computação',             bold: true  },
          ].map(({ label, value, bold }) => (
            <div key={label}>
              <p className="text-xs mb-0.5" style={{ color: '#85AFBC' }}>{label}</p>
              <p className={`text-white text-xs leading-snug ${bold ? 'font-bold' : 'font-medium'}`} style={{ whiteSpace: 'pre-line' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Credencial de acesso — separada por tom de cor */}
        <div className="flex flex-col px-4 pt-3" style={{ background: '#02406D', paddingBottom: '16px', marginTop: '-12px' }}>
          <div className="flex items-center gap-2 mb-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12,11A5,5,0,1,0,7,6,5.006,5.006,0,0,0,12,11Zm0-8A3,3,0,1,1,9,6,3,3,0,0,1,12,3ZM3,22V18a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5v4a1,1,0,0,1-2,0V18a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v4a1,1,0,0,1-2,0Z"/>
            </svg>
            <span className="text-white text-sm font-semibold">Credencial de acesso</span>
          </div>

          <div className="flex gap-4 items-center">
            {/* QR Code */}
            <div className="bg-white rounded-xl p-2 flex-shrink-0">
              <img src="/qrcode.jpg" alt="QR Code" width="90" height="90" style={{ display: 'block' }} />
            </div>

            {/* Código */}
            <div>
              <p className="text-xs mb-1" style={{ color: '#85AFBC' }}>Código</p>
              <p className="text-white text-sm font-bold">00807683</p>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
  )
}

export default CarteirinhaPage
