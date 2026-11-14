import type { AccessCard, ScheduleEntry } from '../types';

const examples: Array<[RegExp, string[]]> = [
  [/fisioterapia/, ['Anatomia Humana', 'Cinesiologia', 'Fisiologia Humana', 'Recursos Terapêuticos', 'Biomecânica', 'Avaliação em Fisioterapia']],
  [/direito/, ['Introdução ao Direito', 'Direito Constitucional', 'Direito Civil', 'Direito Penal', 'Teoria Geral do Processo', 'Direitos Humanos']],
  [/administra/, ['Teoria da Administração', 'Gestão de Pessoas', 'Contabilidade', 'Marketing', 'Economia', 'Planejamento Estratégico']],
  [/enfermagem/, ['Anatomia Humana', 'Fundamentos de Enfermagem', 'Fisiologia Humana', 'Saúde Coletiva', 'Farmacologia', 'Semiologia']],
  [/medicina veterin/, ['Anatomia Animal', 'Fisiologia Veterinária', 'Patologia Veterinária', 'Farmacologia Veterinária', 'Saúde Animal', 'Clínica Veterinária']],
  [/biomedicina/, ['Biologia Celular', 'Anatomia Humana', 'Bioquímica', 'Microbiologia', 'Imunologia', 'Fisiologia Humana']],
  [/psicologia/, ['Introdução à Psicologia', 'Psicologia do Desenvolvimento', 'Psicologia Social', 'Neurociências', 'Psicopatologia', 'Ética Profissional']],
  [/computacao|sistemas de informacao|software|analise e desenvolvimento/, ['Algoritmos', 'Programação', 'Banco de Dados', 'Engenharia de Software', 'Redes de Computadores', 'Estruturas de Dados']],
  [/engenharia/, ['Cálculo', 'Física', 'Desenho Técnico', 'Materiais', 'Projetos de Engenharia', 'Estatística']],
  [/odontologia/, ['Anatomia Humana', 'Anatomia Dental', 'Materiais Odontológicos', 'Saúde Coletiva', 'Patologia Oral', 'Clínica Odontológica']],
  [/nutricao/, ['Bioquímica', 'Fisiologia Humana', 'Avaliação Nutricional', 'Nutrição Humana', 'Saúde Coletiva', 'Técnica Dietética']],
  [/pedagogia/, ['Fundamentos da Educação', 'Didática', 'Psicologia da Educação', 'Alfabetização', 'Políticas Educacionais', 'Práticas Pedagógicas']],
];

// Grade ilustrativa estável por aluno; não representa matrícula ou horários oficiais.
export function exampleSchedule(card: AccessCard): ScheduleEntry[] {
  const course = (card.curso || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const subjects = card.disciplines?.filter(item => item.name.trim()).map(item => item.name) || [];
  const pool = subjects.length ? subjects : examples.find(([pattern]) => pattern.test(course))?.[1] ?? (card.curso ? [`Fundamentos de ${card.curso}`, `Introdução a ${card.curso}`, `Estudos em ${card.curso}`, 'Metodologia Científica', 'Projeto Integrador'] : []);
  if (!pool.length) return [];
  let seed = 2166136261;
  for (const character of card.id) seed = Math.imul(seed ^ character.charCodeAt(0), 16777619);
  const slots = [['07:50', '08:40'], ['08:50', '10:30'], ['11:30', '12:20']];
  return Array.from({ length: 15 }, (_, index) => ({
    id: `example-${index}`, weekday: Math.floor(index / 3) + 1,
    startTime: slots[index % 3][0], endTime: slots[index % 3][1],
    subject: pool[((seed >>> 0) + index * 5 + Math.floor(index / 3)) % pool.length],
    code: null, location: card.campus || null, professor: null,
  }));
}
