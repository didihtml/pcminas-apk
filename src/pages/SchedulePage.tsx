import React from "react";
import { ArrowLeft, Bell } from "lucide-react";
import type { AccessCard } from "../types";
import { courseExamples, normalizeCourse } from "./DisciplinesPage";

const SchedulePage: React.FC<{ card: AccessCard; onBack: () => void }> = ({ card, onBack }) => {
  const course = normalizeCourse(card.curso || "");
  const example = courseExamples.find(item => item.matches.some(match => course.includes(match)));
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + index);
    const disciplines = example?.disciplines ?? [];
    return {
      date,
      disciplines: disciplines.length ? Array.from({ length: Math.min(2, disciplines.length) }, (_, position) => disciplines[(index * 2 + position) % disciplines.length]) : [],
    };
  });
  return <div className="min-h-[100dvh] bg-[#0d111d] pb-36 text-white">
    <header className="sticky top-0 z-10 flex h-[118px] items-end justify-center bg-[#182037] px-12 pb-6 pt-[env(safe-area-inset-top)]">
      <button type="button" onClick={onBack} className="absolute bottom-5 left-5 rounded-full p-1" aria-label="Voltar para Acadêmico"><ArrowLeft size={22} /></button>
      <h1 className="text-center text-[16px] font-semibold">GRADE DE HORÁRIOS</h1>
      <Bell size={21} strokeWidth={1.8} className="absolute bottom-6 right-6" aria-label="Notificações" />
    </header>
    <main className="px-[17px] pt-6">
      <p className="mb-6 rounded-lg border border-[#31536a] bg-[#11293a] px-4 py-3 text-sm leading-5 text-[#c3dce8]">Exemplo ilustrativo para {card.curso || "este curso"}. Dias, horários e disciplinas não representam sua matrícula nem a grade oficial.</p>
      {days.map(({ date, disciplines }) => <section key={date.toISOString()} className="mb-10">
        <h2 className="mb-5 text-[18px] font-bold uppercase">{new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long" }).format(date).replace(",", " -")}</h2>
        {disciplines.length ? <div className="space-y-3">{disciplines.map((discipline, position) => <article key={discipline.name} className="rounded-[10px] border border-white/[0.05] bg-[#141720] p-4">
          <span className="inline-block rounded-lg bg-[#00537d] px-3 py-2 text-sm font-semibold">{position === 0 ? "08:50 às 10:30" : "10:40 às 12:20"}</span>
          <h3 className="mt-4 text-[16px] font-bold leading-tight">{discipline.name}{discipline.code ? ` (${discipline.code})` : ""}</h3>
          <p className="mt-4 text-[15px] font-semibold">Local</p>
          <p className="mt-1 text-[15px] leading-5 text-[#9295a0]">{card.campus?.trim() || "Campus não informado"} | Prédio, sala e professor não informados.</p>
        </article>)}</div> : <p className="text-sm leading-5 text-[#a4aab5]">Ainda não há horários disponíveis para {card.curso || "este curso"}.</p>}
      </section>)}
    </main>
  </div>;
};
export default SchedulePage;
