import React from "react";
import { ArrowRight, Bell } from "lucide-react";

interface Discipline {
  code: string;
  name: string;
  absences: number;
  absenceLimit: number;
  grade?: string;
  gradeLimit?: string;
}

// Dados de exemplo enquanto não há integração com o sistema acadêmico.
const disciplines: Discipline[] = [
  { code: "7180.1.00", name: "SEMINÁRIOS II", absences: 0, absenceLimit: 36 },
  { code: "7174.1.00", name: "PROJETO E DESENVOLVIMENTO DE APLICAÇÕES WEB I", absences: 6, absenceLimit: 36, grade: "0.0", gradeLimit: "6" },
  { code: "7174.1.02", name: "PROJETO E DESENVOLVIMENTO DE APLICAÇÕES WEB I", absences: 0, absenceLimit: 36, grade: "0.0", gradeLimit: "6" },
];

const Progress: React.FC<{ label: string; value: string; percent: number }> = ({ label, value, percent }) => (
  <div className="min-w-0 flex-1">
    <div className="mb-1 flex items-baseline justify-between gap-2 text-[17px] leading-5">
      <span className="font-semibold text-[#f4f4f7]">{label}</span>
      <span className="whitespace-nowrap text-[#85858e]">{value}</span>
    </div>
    <div className="h-[9px] overflow-hidden rounded-full bg-[#25273a]" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(percent)}>
      <div className="h-full rounded-full bg-[#00618b]" style={{ width: `${percent}%` }} />
    </div>
  </div>
);

const DisciplinesPage: React.FC = () => (
  <div className="min-h-[100dvh] bg-[#0d1019] pb-32 text-white">
    <header className="relative flex h-[118px] items-end justify-center bg-[#171b31] pb-6 pt-[env(safe-area-inset-top)]">
      <h1 className="text-[16px] font-semibold">PROGRESSO</h1>
      <Bell size={21} strokeWidth={1.8} className="absolute bottom-6 right-6" aria-label="Notificações" />
    </header>
    <main className="px-[18px] pt-7">
      <h2 className="mb-4 text-[18px] font-bold">NOTAS E FALTAS</h2>
      <div className="space-y-4">
        {disciplines.map((discipline) => (
          <article key={discipline.code} className="rounded-[13px] border border-white/[0.025] bg-[#141720] px-[18px] pb-[18px] pt-5 shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
            <div className="flex items-start gap-3">
              <h3 className="flex-1 text-[17px] font-bold leading-[1.2]">{discipline.code} - {discipline.name}</h3>
              <ArrowRight size={23} strokeWidth={1.8} className="mt-0.5 shrink-0" aria-hidden="true" />
            </div>
            <p className="mt-1.5 text-[17px] leading-[1.25] text-[#85858e]">Ciência da Computação - CAMPUS POÇOS DE CALDAS - PPC</p>
            <div className="my-4 h-px bg-white/[0.025]" />
            <div className="text-[17px] leading-[1.45] text-[#85858e]">
              <p><span className="font-semibold">Local</span> CAMPUS POÇOS DE CALDAS - PPC</p>
              <p><span className="font-semibold">Turno</span> MANHÃ</p>
            </div>
            <div className="mt-4 flex gap-5">
              <Progress label="Faltas" value={`${discipline.absences} / ${discipline.absenceLimit}`} percent={discipline.absences / discipline.absenceLimit * 100} />
              {discipline.grade !== undefined && <Progress label="Notas" value={`${discipline.grade} / ${discipline.gradeLimit}`} percent={0} />}
            </div>
          </article>
        ))}
      </div>
    </main>
  </div>
);

export default DisciplinesPage;
