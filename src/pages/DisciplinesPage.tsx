import React from "react";
import { ArrowRight, Bell } from "lucide-react";
import type { AccessCard } from "../types";

interface Discipline {
  name: string;
  code?: string;
}

interface CourseExamples {
  matches: string[];
  disciplines: Discipline[];
}

// Exemplos visuais: não representam matrícula, notas ou faltas reais.
const courseExamples: CourseExamples[] = [
  { matches: ["medicina veterinaria"], disciplines: [
    { name: "ANATOMIA VETERINÁRIA" }, { name: "FISIOLOGIA ANIMAL" }, { name: "PATOLOGIA VETERINÁRIA" }, { name: "CLÍNICA DE PEQUENOS ANIMAIS" },
  ] },
  { matches: ["medicina"], disciplines: [
    { name: "ANATOMIA HUMANA" }, { name: "FISIOLOGIA HUMANA" }, { name: "PATOLOGIA GERAL" }, { name: "SEMIOLOGIA MÉDICA" }, { name: "SAÚDE COLETIVA" },
  ] },
  { matches: ["ciencia da computacao", "sistemas de informacao", "engenharia de software", "analise e desenvolvimento de sistemas", "engenharia da computacao"], disciplines: [
    { code: "7180.1.00", name: "SEMINÁRIOS II" }, { code: "7174.1.00", name: "PROJETO E DESENVOLVIMENTO DE APLICAÇÕES WEB I" }, { name: "ALGORITMOS E ESTRUTURAS DE DADOS" }, { name: "BANCO DE DADOS" }, { name: "ENGENHARIA DE SOFTWARE" },
  ] },
  { matches: ["direito"], disciplines: [
    { name: "INTRODUÇÃO AO DIREITO" }, { name: "DIREITO CONSTITUCIONAL" }, { name: "DIREITO CIVIL" }, { name: "DIREITO PENAL" },
  ] },
  { matches: ["psicologia"], disciplines: [
    { name: "INTRODUÇÃO À PSICOLOGIA" }, { name: "PSICOLOGIA DO DESENVOLVIMENTO" }, { name: "NEUROCIÊNCIAS" }, { name: "PSICOLOGIA SOCIAL" },
  ] },
  { matches: ["enfermagem"], disciplines: [
    { name: "ANATOMIA HUMANA" }, { name: "FUNDAMENTOS DE ENFERMAGEM" }, { name: "SAÚDE COLETIVA" }, { name: "FARMACOLOGIA" },
  ] },
  { matches: ["odontologia"], disciplines: [
    { name: "ANATOMIA DA CABEÇA E PESCOÇO" }, { name: "MATERIAIS ODONTOLÓGICOS" }, { name: "DENTÍSTICA" }, { name: "SAÚDE BUCAL COLETIVA" },
  ] },
  { matches: ["administracao"], disciplines: [
    { name: "TEORIA GERAL DA ADMINISTRAÇÃO" }, { name: "GESTÃO DE PESSOAS" }, { name: "MARKETING" }, { name: "ADMINISTRAÇÃO FINANCEIRA" },
  ] },
  { matches: ["ciencias contabeis", "contabilidade"], disciplines: [
    { name: "CONTABILIDADE GERAL" }, { name: "CONTABILIDADE DE CUSTOS" }, { name: "LEGISLAÇÃO TRIBUTÁRIA" }, { name: "AUDITORIA" },
  ] },
  { matches: ["arquitetura"], disciplines: [
    { name: "PROJETO DE ARQUITETURA" }, { name: "DESENHO ARQUITETÔNICO" }, { name: "HISTÓRIA DA ARQUITETURA" }, { name: "URBANISMO" },
  ] },
  { matches: ["engenharia"], disciplines: [
    { name: "CÁLCULO DIFERENCIAL E INTEGRAL" }, { name: "FÍSICA GERAL" }, { name: "DESENHO TÉCNICO" }, { name: "INTRODUÇÃO À ENGENHARIA" },
  ] },
  { matches: ["pedagogia"], disciplines: [
    { name: "FUNDAMENTOS DA EDUCAÇÃO" }, { name: "DIDÁTICA" }, { name: "PSICOLOGIA DA EDUCAÇÃO" }, { name: "ALFABETIZAÇÃO E LETRAMENTO" },
  ] },
];

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

const Progress: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="min-w-0 flex-1">
    <div className="mb-1 flex items-baseline justify-between gap-2 text-[17px] leading-5">
      <span className="font-semibold text-[#f4f4f7]">{label}</span>
      <span className="whitespace-nowrap text-[#85858e]">{value}</span>
    </div>
    <div className="h-[9px] overflow-hidden rounded-full bg-[#25273a]" aria-hidden="true" />
  </div>
);

const DisciplinesPage: React.FC<{ card: AccessCard }> = ({ card }) => {
  const course = normalize(card.curso || "");
  const examples = courseExamples.find(({ matches }) => matches.some((match) => course.includes(match)));
  const campus = card.campus?.trim();

  return (
    <div className="min-h-[100dvh] bg-[#0d1019] pb-32 text-white">
      <header className="relative flex h-[118px] items-end justify-center bg-[#171b31] pb-6 pt-[env(safe-area-inset-top)]">
        <h1 className="text-[16px] font-semibold">PROGRESSO</h1>
        <Bell size={21} strokeWidth={1.8} className="absolute bottom-6 right-6" aria-label="Notificações" />
      </header>
      <main className="px-[18px] pt-7">
        <h2 className="mb-2 text-[18px] font-bold">NOTAS E FALTAS</h2>
        {examples ? (
          <>
            <p className="mb-4 text-sm text-[#a4aab5]">Disciplinas ilustrativas para {card.curso}. Notas e faltas reais não estão disponíveis.</p>
            <div className="space-y-4">
              {examples.disciplines.map((discipline) => (
                <article key={discipline.name} className="rounded-[13px] border border-white/[0.025] bg-[#141720] px-[18px] pb-[18px] pt-5 shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
                  <div className="flex items-start gap-3">
                    <h3 className="flex-1 text-[17px] font-bold leading-[1.2]">{discipline.code && `${discipline.code} - `}{discipline.name}</h3>
                    <ArrowRight size={23} strokeWidth={1.8} className="mt-0.5 shrink-0" aria-hidden="true" />
                  </div>
                  <p className="mt-1.5 text-[17px] leading-[1.25] text-[#85858e]">{card.curso}{campus && ` - ${campus}`}</p>
                  <div className="my-4 h-px bg-white/[0.025]" />
                  {campus && <p className="text-[17px] leading-[1.45] text-[#85858e]"><span className="font-semibold">Local</span> {campus}</p>}
                  <div className="mt-4 flex gap-5">
                    <Progress label="Faltas" value="—" />
                    <Progress label="Notas" value="—" />
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm text-[#a4aab5]">Ainda não há disciplinas de exemplo para {card.curso || "o curso desta carteirinha"}. As informações acadêmicas reais não estão disponíveis.</p>
        )}
      </main>
    </div>
  );
};

export default DisciplinesPage;
