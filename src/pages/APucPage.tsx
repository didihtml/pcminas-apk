import React, { useState } from "react";
import { ArrowLeft, Award, ChevronRight, Microscope, Presentation, Settings, Star } from "lucide-react";
import SettingsPage from "./SettingsPage";

const items = [
  { id: "missao", label: "Missão e Valores", icon: Award },
  { id: "reitoria", label: "Reitoria", icon: Star },
  { id: "pesquisa", label: "Pesquisa", icon: Microscope },
  { id: "extensao", label: "Extensão", icon: Presentation },
  { id: "configuracoes", label: "Configurações", icon: Settings },
];

interface APucPageProps { onBack: () => void; onMissaoValores: () => void }

const APucPage: React.FC<APucPageProps> = ({ onBack, onMissaoValores }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [notice, setNotice] = useState("");
  if (showSettings) return <SettingsPage onBack={() => setShowSettings(false)} />;
  return <div className="min-h-[100dvh] bg-[#0d111d] pb-32 text-white">
    <header className="relative flex h-[100px] items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)]"><button type="button" onClick={onBack} aria-label="Voltar" className="absolute bottom-4 left-3 p-1"><ArrowLeft size={21}/></button><h1 className="text-center text-[14px] font-semibold">A PUC MINAS</h1></header>
    <main className="px-[15px] pt-[15px]"><a href="https://www.pucminas.br/destaques/Paginas/default.aspx" target="_blank" rel="noopener noreferrer" aria-label="Apresentação — ver mais" className="block overflow-hidden rounded-lg"><img src="/a-puc-apresentacao.png" alt="" className="block w-full"/></a>
      <div className="mt-[15px] space-y-[7px]">{items.map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => { setNotice(""); if (id === "missao") onMissaoValores(); else if (id === "configuracoes") setShowSettings(true); else setNotice("Este serviço não está disponível no momento."); }} className="flex min-h-[53px] w-full items-center gap-3 rounded-lg border border-white/[0.05] bg-[#151923] px-4 text-left"><Icon size={21} strokeWidth={1.7} className="shrink-0"/><span className="flex-1 text-[15px] font-semibold">{label}</span><ChevronRight size={21}/></button>)}</div>
      {notice && <p role="status" className="mt-4 text-sm text-[#a4aab5]">{notice}</p>}
    </main>
  </div>;
};
export default APucPage;
