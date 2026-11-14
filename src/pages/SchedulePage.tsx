import React, { useMemo, useState } from "react";
import { ArrowLeft, Bell, Filter, X } from "lucide-react";
import type { AccessCard } from "../types";
import { exampleSchedule } from "../utils/exampleSchedule";

const days = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];

const SchedulePage: React.FC<{ card: AccessCard; onBack: () => void }> = ({ card, onBack }) => {
  const [day, setDay] = useState<number | null>(() => {
    const today = new Date().getDay();
    return today >= 1 && today <= 5 ? today : 1;
  });
  const [filterOpen, setFilterOpen] = useState(false);
  const illustrative = !card.schedule?.length;
  const schedule = useMemo(() => illustrative ? exampleSchedule(card) : card.schedule ?? [], [card, illustrative]);
  const entries = useMemo(() => schedule
    .filter(item => item.weekday >= 1 && item.weekday <= 5 && (day === null || item.weekday === day))
    .slice().sort((a, b) => a.weekday - b.weekday || a.startTime.localeCompare(b.startTime)), [schedule, day]);
  return <div className="min-h-[100dvh] bg-[#0d111d] pb-36 text-white">
    <header className="sticky top-0 z-10 flex h-[108px] items-end justify-center bg-[#182037] px-14 pb-6 pt-[env(safe-area-inset-top)]">
      <button type="button" onClick={onBack} className="absolute bottom-5 left-5 rounded-full p-1" aria-label="Voltar para Acadêmico"><ArrowLeft size={22} /></button>
      <h1 className="text-center text-[15px] font-semibold">GRADE DE HORÁRIOS</h1>
      <button type="button" onClick={() => setFilterOpen(true)} className="absolute bottom-5 right-[60px] rounded-full p-1" aria-label="Filtrar por dia" aria-expanded={filterOpen}><Filter size={22} /></button>
      <Bell size={21} strokeWidth={1.8} className="absolute bottom-6 right-6" aria-label="Notificações" />
    </header>
    <main className="space-y-3 px-4 pt-[10px]">
      {illustrative && schedule.length > 0 && <p className="text-xs leading-4 text-[#c3cad7]">Horários gerados automaticamente para {card.curso}.</p>}
      {day !== null && <p className="text-sm text-[#d1d6df]">{days[day - 1]}</p>}
      {entries.length ? entries.map(item => <article key={item.id} className="rounded-[9px] border border-white/[0.055] bg-[#151923] p-4">
        <span className="inline-block rounded-lg bg-[#005782] px-2 py-1.5 text-[15px] font-semibold tabular-nums">{item.startTime} às {item.endTime}</span>
        <h2 className="mt-3 text-[15px] font-bold leading-[19px] uppercase">{item.subject}{item.code ? ` (${item.code})` : ""}</h2>
        <p className="mt-3 text-[15px] font-bold">Local</p>
        <p className="text-[15px] leading-[19px] text-[#a7a8b2]">{item.location || "Local não informado"}{item.professor ? ` (Professor ${item.professor})` : ""}</p>
        {day === null && <p className="mt-2 text-xs text-[#b8bdc8]">{days[item.weekday - 1]}</p>}
      </article>) : <p className="pt-3 text-sm leading-5 text-[#b7bdc9]">{day === null ? `A grade de horários de ${card.curso || "seu curso"} ainda não foi cadastrada.` : `Nenhuma aula cadastrada para ${days[day - 1].toLocaleLowerCase("pt-BR")}.`}</p>}
    </main>
    {filterOpen && <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70" onClick={() => setFilterOpen(false)}>
      <div role="dialog" aria-modal="true" aria-labelledby="schedule-filter-title" onClick={event => event.stopPropagation()} className="w-full max-w-[430px] rounded-t-2xl bg-[#151923] px-5 pb-8 pt-5">
        <div className="mb-3 flex items-center justify-between"><h2 id="schedule-filter-title" className="text-base font-semibold">Filtrar por dia</h2><button type="button" onClick={() => setFilterOpen(false)} aria-label="Fechar filtro"><X size={22} /></button></div>
        {[{ label: "Todos os dias", value: null }, ...days.map((label, index) => ({ label, value: index + 1 }))].map(option => <button key={option.label} type="button" onClick={() => { setDay(option.value); setFilterOpen(false); }} aria-pressed={day === option.value} className={`block w-full border-t border-white/[0.06] py-3 text-left text-sm ${day === option.value ? "font-bold text-white" : "text-[#b7bdc9]"}`}>{option.label}</button>)}
      </div>
    </div>}
  </div>;
};
export default SchedulePage;
