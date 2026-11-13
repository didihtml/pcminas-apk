import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import PageHeader from '../components/layout/PageHeader'
import graduacao from '../assets/ingressar/graduacao.png'
import posGraduacao from '../assets/ingressar/pos-graduacao.png'
import acompanhe from '../assets/ingressar/acompanhe.png'
import matriculas from '../assets/ingressar/matriculas.png'
import complementacao from '../assets/ingressar/complementacao.png'
import reabertura from '../assets/ingressar/reabertura.png'
import transferencia from '../assets/ingressar/transferencia.png'
import segundaGraduacao from '../assets/ingressar/segunda-graduacao.png'
import GraduacaoPage from './GraduacaoPage'
import PosGraduacaoPage from './PosGraduacaoPage'
import AcompanheInscricaoPage from './AcompanheInscricaoPage'
import InstitucionalIngressoPage from './InstitucionalIngressoPage'
import TransferenciaPage from './TransferenciaPage'

interface IngressoCard { id: string; title: string; image: string }
const PROCESSOS: IngressoCard[] = [
  { id: 'graduacao', title: 'Graduação', image: graduacao },
  { id: 'pos-graduacao', title: 'Pós-graduação', image: posGraduacao },
  { id: 'acompanhe', title: 'Acompanhe sua inscrição', image: acompanhe },
]
const OUTROS: IngressoCard[] = [
  { id: 'matriculas', title: 'Matrículas em disciplinas isoladas', image: matriculas },
  { id: 'complementacao', title: 'Complementação de Estudos', image: complementacao },
  { id: 'reabertura', title: 'Reabertura de Matrícula', image: reabertura },
  { id: 'transferencia', title: 'Transferência Externa', image: transferencia },
  { id: 'segunda-graduacao', title: 'Segunda Graduação', image: segundaGraduacao },
]

interface IngressarPageProps { onBack: () => void }
const IngressarPage: React.FC<IngressarPageProps> = ({ onBack }) => {
  const [notice, setNotice] = useState('')
  const [showGraduacao, setShowGraduacao] = useState(false)
  const [showPosGraduacao, setShowPosGraduacao] = useState(false)
  const [showAcompanhe, setShowAcompanhe] = useState(false)
  const [institucional, setInstitucional] = useState<'disciplinas-isoladas' | 'complementacao' | null>(null)
  const [transferenciaTipo, setTransferenciaTipo] = useState<'transferencia' | 'segunda-graduacao' | null>(null)
  if (showGraduacao) return createPortal(<GraduacaoPage onBack={() => setShowGraduacao(false)} />, document.body)
  if (showPosGraduacao) return createPortal(<PosGraduacaoPage onBack={() => setShowPosGraduacao(false)} />, document.body)
  if (showAcompanhe) return createPortal(<AcompanheInscricaoPage onBack={() => setShowAcompanhe(false)} />, document.body)
  if (institucional) return createPortal(<InstitucionalIngressoPage tipo={institucional} onBack={() => setInstitucional(null)} />, document.body)
  if (transferenciaTipo) return createPortal(<TransferenciaPage segundaGraduacao={transferenciaTipo === 'segunda-graduacao'} onBack={() => setTransferenciaTipo(null)} />, document.body)
  const openCard = (card: IngressoCard) => {
    switch (card.id) {
      case 'graduacao': setShowGraduacao(true); break
      case 'pos-graduacao': setShowPosGraduacao(true); break
      case 'acompanhe': setShowAcompanhe(true); break
      case 'matriculas': setInstitucional('disciplinas-isoladas'); break
      case 'complementacao': setInstitucional('complementacao'); break
      case 'transferencia': setTransferenciaTipo('transferencia'); break
      case 'segunda-graduacao': setTransferenciaTipo('segunda-graduacao'); break
      default: setNotice(card.title)
    }
  }
  const renderCards = (cards: IngressoCard[]) => (
    <div className="grid grid-cols-2 gap-[15px]">
      {cards.map(card => <button key={card.id} type="button" onClick={() => openCard(card)} aria-label={`${card.title}: ver mais`} className="block w-full overflow-hidden rounded-[8px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        <img src={card.image} alt="" className="block h-auto w-full" />
      </button>)}
    </div>
  )
  return <div className="min-h-screen bg-[#0d111d] pb-36 text-white">
    <PageHeader title="Formas de Ingresso" onBack={onBack} hideBack />
    <main className="px-[15px] pt-[132px]">
      <section><h2 className="mb-4 text-[16px] font-bold uppercase leading-5">Processos Seletivos</h2>{renderCards(PROCESSOS)}</section>
      <section className="mt-[39px]"><h2 className="mb-4 text-[16px] font-bold uppercase leading-5">Outros</h2>{renderCards(OUTROS)}</section>
    </main>
    {notice && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5" role="dialog" aria-modal="true" aria-labelledby="ingresso-notice-title"><div className="w-full max-w-sm rounded-xl bg-[#171b26] p-5"><h2 id="ingresso-notice-title" className="font-bold">{notice}</h2><p className="mt-3 text-sm text-[#a4aab5]">Informações indisponíveis no momento.</p><button type="button" onClick={() => setNotice('')} className="mt-5 w-full rounded-lg bg-[#00527f] px-4 py-3 font-semibold">Fechar</button></div></div>}
  </div>
}
export default IngressarPage
