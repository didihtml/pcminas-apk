import React, { useState, useEffect } from 'react'
import BottomNavigation from './components/layout/BottomNavigation'
import SGASheet from './components/portal/SGASheet'
import HomePage from './pages/HomePage'
import APucPage from './pages/APucPage'
import CampiPage from './pages/CampiPage'
import IngressarPage from './pages/IngressarPage'
import LoginPage from './pages/LoginPage'
import CarteirinhaPage from './pages/CarteirinhaPage'
import type { NavTab } from './types'

type LoginProfile = 'aluno' | 'professor' | null

const SplashScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const show = setTimeout(() => setFading(true), 1800)
    const hide = setTimeout(onDone, 2300)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0D111D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      <img
        src="/logo-puc-white.png"
        alt="PUC Minas"
        style={{ width: '150px' }}
      />
    </div>
  )
}

const CheckingUpdates: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fade = setTimeout(() => setFading(true), 2500)
    const hide = setTimeout(onDone, 3100)
    return () => { clearTimeout(fade); clearTimeout(hide) }
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9000,
      background: 'rgba(0,0,0,0.35)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.5s ease',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '32px 40px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '12px',
        minWidth: '260px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
      }}>
        {/* Spinner */}
        <svg width="40" height="40" viewBox="0 0 40 40" style={{ animation: 'spin 0.9s linear infinite' }}>
          {[0,1,2,3,4,5,6,7].map((i) => (
            <circle
              key={i}
              cx={20 + 13 * Math.cos((i * 45 - 90) * Math.PI / 180)}
              cy={20 + 13 * Math.sin((i * 45 - 90) * Math.PI / 180)}
              r={i < 2 ? 3.5 : i < 4 ? 2.8 : i < 6 ? 2.2 : 1.6}
              fill={`rgba(52, 120, 160, ${1 - i * 0.1})`}
            />
          ))}
        </svg>

        <p style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#1a1a2e', textAlign: 'center' }}>
          Verificando atualizações...
        </p>
        <p style={{ margin: 0, fontSize: '13px', color: '#888', textAlign: 'center' }}>
          Por favor, aguarde...
        </p>
      </div>
    </div>
  )
}

const App: React.FC = () => {

  const [splash, setSplash] = useState(true)
  const [checking, setChecking] = useState(false)
  const alreadyChecked = typeof sessionStorage !== 'undefined' && !!sessionStorage.getItem('uc')
  const [activeTab, setActiveTab] = useState<NavTab>('inicio')
  const [sgaOpen, setSgaOpen] = useState(false)
  const [loginProfile, setLoginProfile] = useState<LoginProfile>(null)
  const [showCarteirinha, setShowCarteirinha] = useState(false)

  const handleTabChange = (tab: NavTab) => {
    if (tab === 'portal') {
      setSgaOpen(true)
      return
    }
    setActiveTab(tab)
  }

  const handleSelectProfile = (profile: 'aluno' | 'professor') => {
    setSgaOpen(false)
    setLoginProfile(profile)
  }

  const renderPage = () => {
    if (showCarteirinha) {
      return (
        <CarteirinhaPage
          onBack={() => { setShowCarteirinha(false); setLoginProfile(null) }}
        />
      )
    }
    if (loginProfile) {
      return (
        <LoginPage
          profile={loginProfile}
          onBack={() => setLoginProfile(null)}
          onSuccess={() => setShowCarteirinha(true)}
        />
      )
    }
    const goHome = () => setActiveTab('inicio')
    switch (activeTab) {
      case 'inicio':    return <HomePage />
      case 'ingressar': return <IngressarPage onBack={goHome} />
      case 'campi':     return <CampiPage onBack={goHome} />
      case 'a-puc':     return <APucPage onBack={goHome} />
      default:          return <HomePage />
    }
  }

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg-main)' }}>
      {splash && <SplashScreen onDone={() => {
        setSplash(false)
        if (!alreadyChecked) { sessionStorage.setItem('uc', '1'); setChecking(true) }
      }} />}
      {checking && <CheckingUpdates onDone={() => setChecking(false)} />}
      {renderPage()}
      {!loginProfile && !showCarteirinha && (
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      {showCarteirinha && (
        <BottomNavigation activeTab={'portal' as any} onTabChange={(tab) => {
          if (tab !== 'portal') { setShowCarteirinha(false); setLoginProfile(null); setActiveTab(tab) }
        }} />
      )}
      {sgaOpen && (
        <SGASheet
          onClose={() => setSgaOpen(false)}
          onSelectProfile={handleSelectProfile}
        />
      )}
    </div>
  )
}

export default App
