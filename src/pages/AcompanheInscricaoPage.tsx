import { ArrowLeft } from 'lucide-react'
import './AcompanheInscricaoPage.css'

// Página pública identificada no link Painel do Candidato do portal Vem pra PUC.
const candidatePortal = 'https://www.sistemas.pucminas.br/gpi/SilverStream/Pages/pgPainelDoCandidatoLogin.html'

export default function AcompanheInscricaoPage({ onBack }: { onBack: () => void }) {
  return <div className="inscricao-page">
    <header className="inscricao-header">
      <button type="button" onClick={onBack} aria-label="Voltar"><ArrowLeft size={23} /></button>
      <strong>ACOMPANHE SUA INSCRIÇÃO</strong>
      <span aria-hidden="true" />
    </header>
    <iframe className="inscricao-portal" src={candidatePortal} title="Painel do candidato da PUC Minas" />
    <div className="inscricao-safe" />
  </div>
}
