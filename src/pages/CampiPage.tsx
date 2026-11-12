import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import barreiro from '../assets/campi/barreiro.png'
import betim from '../assets/campi/betim.png'
import contagem from '../assets/campi/contagem.png'
import coracao from '../assets/campi/coracao.png'
import lourdes from '../assets/campi/lourdes.png'

interface Campus { id: string; name: string; address: string; imageUrl: string }
const CAMPI: Campus[] = [
  { id: 'barreiro', name: 'Campus Barreiro', address: 'Av. Afonso Vaz de Melo, 1.200, Barreiro de Baixo, - Belo Horizonte - MG - 30640-070', imageUrl: barreiro },
  { id: 'betim', name: 'Campus Betim', address: 'R. do Rosário, 1.081, Angola, Betim - MG - 32604-115', imageUrl: betim },
  { id: 'contagem', name: 'Campus Contagem', address: 'R. Rio Comprido, 4.580, Contagem - MG - 32010-025', imageUrl: contagem },
  { id: 'coracao-eucaristico', name: 'Campus Coração Eucarístico', address: 'Av. Dom José Gaspar, 500, Coração Eucarístico, Belo Horizonte - MG - 30535-901', imageUrl: coracao },
  { id: 'lourdes', name: 'Campus Lourdes', address: 'Ed. Dom Cabral - Av. Brasil, 2.023 - Savassi - Belo Horizonte - MG - 30140-002', imageUrl: lourdes },
  { id: 'sao-gabriel', name: 'Campus São Gabriel', address: 'Anel Rodoviário Km 23,5 - Rua Walter Ianni, 255 - São Gabriel - Belo Horizonte - MG - 31980-110', imageUrl: 'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=300&h=300&fit=crop' },
  { id: 'pocos-de-caldas', name: 'Campus Poços de Caldas', address: 'Av. Padre Francis Cletus Cox, 1661 - Poços de Caldas - MG - 37701-355', imageUrl: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=300&h=300&fit=crop' },
  { id: 'serro', name: 'Campus Serro', address: 'Praça João Pessoa, 74 - Centro - CEP: 39150-000 - Serro - MG', imageUrl: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=300&h=300&fit=crop' },
]

interface CampiPageProps { onBack: () => void }
const CampiPage: React.FC<CampiPageProps> = ({ onBack }) => {
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null)
  return <div className="min-h-screen bg-[#0d111d] pb-32 text-white">
    <PageHeader title="Campi" onBack={onBack} hideBack />
    <main className="space-y-[15px] px-[15px] pt-[117px]">
      {CAMPI.map(campus => <button key={campus.id} type="button" onClick={() => setSelectedCampus(campus)} className="flex min-h-[152px] w-full items-center gap-3 rounded-lg border border-white/[0.055] bg-[#151923] p-[15px] text-left">
        <img src={campus.imageUrl} alt="" className="h-[119px] w-[114px] shrink-0 rounded-lg object-cover" />
        <span className="min-w-0 flex-1"><span className="block text-[17px] font-bold leading-[20px]">{campus.name}</span><span className="mt-1.5 block text-[14px] leading-[17px] text-[#93949c]">{campus.address}</span><span className="mt-2 flex items-center gap-1 text-[14px] font-semibold">VER MAIS <ArrowRight size={14} strokeWidth={1.7} /></span></span>
      </button>)}
    </main>
    {selectedCampus && <div role="dialog" aria-modal="true" aria-labelledby="campus-title" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-5" onClick={() => setSelectedCampus(null)}><div className="w-full max-w-[370px] rounded-xl bg-[#151923] p-5" onClick={event => event.stopPropagation()}><h2 id="campus-title" className="text-lg font-bold">{selectedCampus.name}</h2><p className="mt-3 text-sm leading-5 text-[#a4aab5]">{selectedCampus.address}</p><p className="mt-3 text-sm text-[#a4aab5]">Mais informações sobre este campus não estão disponíveis no aplicativo.</p><button type="button" autoFocus onClick={() => setSelectedCampus(null)} className="mt-5 w-full rounded-lg bg-[#00527f] py-3 text-sm font-semibold">Fechar</button></div></div>}
  </div>
}
export default CampiPage
