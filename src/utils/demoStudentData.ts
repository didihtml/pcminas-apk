import type { AccessCard, StudentBill, StudentDiscipline } from "../types";

// Valores estáveis por aluno, apenas para preencher a interface enquanto não há dados reais.
function seedFor(id: string): number {
  let seed = 2166136261;
  for (const character of id) seed = Math.imul(seed ^ character.charCodeAt(0), 16777619);
  return seed >>> 0;
}

export function demoDisciplines(card: AccessCard): StudentDiscipline[] {
  const seed = seedFor(card.id);
  return Array.from({ length: 5 }, (_, index) => ({
    id: `demo-discipline-${index}`,
    name: `Disciplina ${index + 1}`,
    code: null,
    grade: Math.round((60 + ((seed >>> (index * 3)) % 41))) / 10,
    gradeMax: 10,
    absences: (seed >>> (index * 4)) % 5,
    absenceLimit: 20,
  }));
}

export function demoBills(): StudentBill[] {
  const dates = ["2026-12-01", "2026-11-01", "2026-10-01", "2026-09-15", "2026-09-01", "2026-08-05"];
  return dates.map((dueDate, index) => ({
    id: `demo-bill-${index + 1}`,
    description: `Parcela ${6 - index} - 2/2026`,
    dueDate,
    amountCents: 0,
    status: "PAGO" as const,
    paymentUrl: null,
  }));
}
