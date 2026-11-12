import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { AccessCard } from "../types";
import TeachingPlanDetail from "./TeachingPlanDetail";

const TeachingPlanPage: React.FC<{ card: AccessCard; onBack: () => void }> = ({ card, onBack }) => {
  const [showReference, setShowReference] = useState(false);
  if (showReference) return <TeachingPlanDetail onBack={() => setShowReference(false)} />;
  return (
  <div className="min-h-[100dvh] bg-[#0d111d] pb-36 text-white">
    <header className="sticky top-0 z-10 flex h-[118px] items-end justify-center bg-[#182037] px-12 pb-6 pt-[env(safe-area-inset-top)]"><button type="button" onClick={onBack} className="absolute bottom-5 left-5 rounded-full p-1" aria-label="Voltar para Acadêmico"><ArrowLeft size={22} /></button><h1 className="text-center text-[16px] font-semibold">PLANO DE ENSINO</h1></header>
    <main className="space-y-4 px-[17px] pt-6"><p className="text-sm leading-5 text-[#a4aab5]">Os planos de ensino de {card.curso || "seu curso"} ainda não foram cadastrados.</p><article className="rounded-xl border border-white/[0.05] bg-[#171b26] p-[18px]"><h2 className="font-semibold">Língua Brasileira de Sinais</h2><p className="mt-1 text-sm text-[#a4aab5]">Plano de referência: 2º semestre de 2026</p><div className="my-4 h-px bg-white/[0.06]"/><button type="button" onClick={() => setShowReference(true)} className="flex w-full items-center justify-between gap-3 text-left text-[13px] text-[#a4aab5]"><span>Toque para visualizar o plano de ensino completo</span><ArrowRight size={22} className="shrink-0 text-white"/></button></article></main>
  </div>
  );
};
export default TeachingPlanPage;
