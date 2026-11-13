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

export function demoBills(card: AccessCard): StudentBill[] {
  const seed = seedFor(card.id);
  const year = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, index) => ({
    id: `demo-bill-${index}`,
    description: `Parcela ${5 - index} - ${year}`,
    dueDate: `${year}-${String(5 - index).padStart(2, "0")}-10`,
    amountCents: 50000 + ((seed >>> (index * 3)) % 1001) * 100,
    status: "PAGO" as const,
    paymentUrl: null,
  }));
}
