import React from "react";
import { ArrowLeft, Bell } from "lucide-react";
import type { AccessCard } from "../types";
import { courseExamples, normalizeCourse } from "./DisciplinesPage";

const SchedulePage: React.FC<{ card: AccessCard; onBack: () => void }> = ({ card, onBack }) => {
  const course = normalizeCourse(card.curso || "");
  const example = courseExamples.find(item => item.matches.some(match => course.includes(match)));
  const groups = example ? [example.disciplines.slice(0, 2), example.disciplines.slice(2, 4)].filter(group => group.length) : [];
  return <div className="min-h-[100dvh] bg-[#0d111d] pb-36 text-white">
    <header className="sticky top-0 z-10 flex h-[118px] items-end justify-center bg-[#182037] px-12 pb-6 pt-[env(safe-area-inset-top)]">
      <button type="button" onClick={onBack} className="absolute bottom-5 left-5 rounded-full p-1" aria-label="Voltar para Acadêmico"><ArrowLeft size={22} /></button>
      <h1 className="text-center text-[16px] font-semibold">GRADE DE HORÁRIOS</h1>
      <Bell size={21} strokeWidth={1.8} className="absolute bottom-6 right-6" aria-label="Notificações" />
    </header>
    <main className="px-[17px] pt-6">
      <p className="mb-6 rounded-lg border border-[#31536a] bg-[#11293a] px-4 py-3 text-sm leading-5 text-[#c3dce8]">Exemplo ilustrativo para {card.curso || "este curso"}. Dias, horários e disciplinas não representam sua matrícula nem a grade oficial.</p>
      {groups.length ? groups.map((disciplines, index) => <section key={index} className="mb-10">
        <h2 className="mb-5 text-[18px] font-bold uppercase">Exemplo — dia {index + 1}</h2>
        <div className="space-y-3">{disciplines.map((discipline, position) => <article key={discipline.name} className="rounded-[10px] border border-white/[0.05] bg-[#141720] p-4">
          <span className="inline-block rounded-lg bg-[#00537d] px-3 py-2 text-sm font-semibold">{position === 0 ? "08:50 às 10:30" : "10:40 às 12:20"}</span>
          <h3 className="mt-4 text-[16px] font-bold leading-tight">{discipline.name}{discipline.code ? ` (${discipline.code})` : ""}</h3>
          <p className="mt-4 text-[15px] font-semibold">Local</p>
          <p className="mt-1 text-[15px] leading-5 text-[#9295a0]">Local e professor não informados.</p>
        </article>)}</div>
      </section>) : <p className="text-sm leading-5 text-[#a4aab5]">Ainda não há horários disponíveis para {card.curso || "este curso"}.</p>}
    </main>
  </div>;
};
export default SchedulePage;
