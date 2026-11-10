import React, { useState } from "react";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import type { AccessCard } from "../types";
import { courseExamples, normalizeCourse } from "./DisciplinesPage";

const TeachingPlanPage: React.FC<{ card: AccessCard; onBack: () => void }> = ({ card, onBack }) => {
  const [notice, setNotice] = useState<string | null>(null);
  const course = normalizeCourse(card.curso || "");
  const example = courseExamples.find(item => item.matches.some(match => course.includes(match)));
  return <div className="min-h-[100dvh] bg-[#0d111d] pb-36 text-white">
    <header className="sticky top-0 z-10 flex h-[118px] items-end justify-center bg-[#182037] px-12 pb-6 pt-[env(safe-area-inset-top)]">
      <button type="button" onClick={onBack} className="absolute bottom-5 left-5 rounded-full p-1" aria-label="Voltar para Acadêmico"><ArrowLeft size={22} /></button>
      <h1 className="text-center text-[16px] font-semibold">PLANO DE ENSINO</h1>
    </header>
    <main className="space-y-4 px-[17px] pt-5">
      <p className="rounded-lg border border-[#31536a] bg-[#11293a] px-4 py-3 text-sm leading-5 text-[#c3dce8]">Disciplinas ilustrativas para {card.curso || "este curso"}. Os planos de ensino oficiais ainda não estão disponíveis.</p>
      {example ? example.disciplines.map(discipline => <article key={`${discipline.code ?? ""}-${discipline.name}`} className="rounded-[12px] border border-white/[0.05] bg-[#141720] p-[18px]">
        <div className="flex items-center gap-4"><div className="min-w-0 flex-1"><h2 className="text-[17px] font-bold leading-tight">{discipline.code && `${discipline.code} - `}{discipline.name}</h2><p className="mt-1 text-[15px] leading-5 text-[#9295a0]">{card.curso}{card.campus && ` - ${card.campus}`}</p></div><FileText size={22} className="shrink-0" aria-hidden="true" /></div>
        <div className="my-4 h-px bg-white/[0.06]" />
        <div className="space-y-1 text-[15px] leading-5 text-[#9295a0]"><p><span className="font-bold">Campus </span>{card.campus || "Não informado"}</p><p><span className="font-bold">Turno </span>Não informado</p></div>
        <div className="my-4 h-px bg-white/[0.06]" />
        <button type="button" onClick={() => setNotice(discipline.name)} className="flex w-full items-center justify-between gap-3 text-left text-[13px] text-[#9295a0]"><span>Toque para visualizar o plano de ensino completo</span><ArrowRight size={22} className="shrink-0 text-white" aria-hidden="true" /></button>
        {notice === discipline.name && <p role="status" className="mt-3 text-sm text-[#c3dce8]">O plano de ensino completo não está disponível.</p>}
      </article>) : <p className="text-sm leading-5 text-[#a4aab5]">Ainda não há disciplinas de exemplo para {card.curso || "este curso"}.</p>}
    </main>
  </div>;
};
export default TeachingPlanPage;
