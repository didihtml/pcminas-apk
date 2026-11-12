import React from "react";
import { Bell } from "lucide-react";
import type { AccessCard } from "../types";

const DisciplinesPage: React.FC<{ card: AccessCard }> = ({ card }) => (
  <div className="min-h-[100dvh] bg-[#0d111d] pb-32 text-white">
    <header className="relative flex h-[118px] items-end justify-center bg-[#182037] pb-6 pt-[env(safe-area-inset-top)]"><h1 className="text-[16px] font-semibold">PROGRESSO</h1><Bell size={21} strokeWidth={1.8} className="absolute bottom-6 right-6" aria-label="Notificações" /></header>
    <main className="px-[18px] pt-7"><h2 className="mb-4 text-[18px] font-bold">NOTAS E FALTAS</h2>
      {card.disciplines?.length ? <div className="space-y-4">{card.disciplines.map(item => <article key={item.id} className="rounded-[13px] border border-white/[0.05] bg-[#141720] p-[18px]">
        <h3 className="text-[17px] font-bold leading-tight">{item.code ? `${item.code} - ` : ""}{item.name}</h3><p className="mt-2 text-sm text-[#9295a0]">{card.curso}{card.campus ? ` - ${card.campus}` : ""}</p><div className="my-4 h-px bg-white/[0.06]" />
        <div className="flex gap-6 text-sm"><p><strong>Notas:</strong> {item.grade === null ? "Não cadastrada" : `${item.grade} / ${item.gradeMax}`}</p><p><strong>Faltas:</strong> {item.absences === null ? "Não cadastradas" : `${item.absences} / ${item.absenceLimit}`}</p></div>
      </article>)}</div> : <p className="text-sm text-[#a4aab5]">As disciplinas, notas e faltas de {card.curso || "seu curso"} ainda não foram cadastradas.</p>}
    </main>
  </div>
);
export default DisciplinesPage;
