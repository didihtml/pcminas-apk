import React, { useState } from "react";
import {
  AlarmClock,
  ArrowLeft,
  Bell,
  Calendar1,
  ChevronRight,
  GraduationCap,
  Presentation,
  Ruler,
} from "lucide-react";
import type { AccessCard } from "../types";
import SchedulePage from "./SchedulePage";
import TeachingPlanPage from "./TeachingPlanPage";
import GuiaAlunoPage from "./GuiaAlunoPage";

const academicItems = [
  { label: "Grade de horários", icon: AlarmClock },
  { label: "Plano de ensino", icon: Presentation },
  { label: "Guia do aluno", icon: Ruler },
  { label: "Calendário Letivo", icon: GraduationCap },
  { label: "Calendário Acadêmico", icon: Calendar1 },
];

const AcademicPage: React.FC<{ card: AccessCard; openSchedule: boolean; onCloseSchedule: () => void }> = ({ card, openSchedule, onCloseSchedule }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  if (openSchedule || selectedItem === "Grade de horários") {
    return <SchedulePage card={card} onBack={() => { setSelectedItem(null); onCloseSchedule(); }} />;
  }
  if (selectedItem === "Plano de ensino") {
    return <TeachingPlanPage card={card} onBack={() => setSelectedItem(null)} />;
  }
  if (selectedItem === "Guia do aluno") {
    return <GuiaAlunoPage onBack={() => setSelectedItem(null)} />;
  }

  return (
    <div className="min-h-[100dvh] bg-[#0d111d] pb-32 text-white">
      <header className="relative flex h-[108px] items-end justify-center bg-[#182037] pb-6 pt-[env(safe-area-inset-top)]">
        {selectedItem && (
          <button
            type="button"
            onClick={() => setSelectedItem(null)}
            className="absolute bottom-5 left-5 rounded-full p-1"
            aria-label="Voltar para Acadêmico"
          >
            <ArrowLeft size={22} />
          </button>
        )}
        <h1 className="text-[16px] font-semibold">ACADÊMICO</h1>
        <Bell size={21} strokeWidth={1.8} className="absolute bottom-6 right-6" aria-label="Notificações" />
      </header>

      {selectedItem ? (
        <main className="flex min-h-[calc(100dvh-250px)] flex-col items-center justify-center gap-4 px-[18px]">
          <h2 className="text-base font-semibold">{selectedItem}</h2>
          <p className="text-center text-sm text-[#a4aab5]">Este conteúdo ainda não está disponível.</p>
        </main>
      ) : (
        <main className="space-y-2 px-4 pt-4">
          {academicItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setSelectedItem(label)}
              className="flex min-h-[59px] w-full items-center gap-[14px] rounded-[9px] border border-white/[0.035] bg-[#151923] px-[18px] text-left"
            >
              <Icon size={22} strokeWidth={1.7} className="shrink-0" aria-hidden="true" />
              <span className="min-w-0 flex-1 text-[16px] font-semibold leading-tight">{label}</span>
              <ChevronRight size={24} strokeWidth={1.8} className="shrink-0" aria-hidden="true" />
            </button>
          ))}
        </main>
      )}
    </div>
  );
};

export default AcademicPage;
