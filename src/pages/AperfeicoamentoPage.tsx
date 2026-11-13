import { ArrowLeft } from 'lucide-react'
import './AperfeicoamentoPage.css'

const catalogUrl = 'https://vemprapuc.pucminas.br/loja/busca.php?categoria=135&loja=548342'

export default function AperfeicoamentoPage({ onBack }: { onBack: () => void }) {
  return <div className="aperf-page">
    <header className="aperf-app-header">
      <button type="button" onClick={onBack} aria-label="Voltar"><ArrowLeft size={23} /></button>
      <strong>APERFEIÇOAMENTO</strong>
      <span aria-hidden="true" />
    </header>
    <iframe className="aperf-catalog" src={catalogUrl} title="Cursos de aperfeiçoamento, curta duração e disciplinas" />
    <div className="aperf-safe" />
  </div>
}
