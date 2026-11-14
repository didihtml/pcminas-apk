import type { AccessCard, ScheduleEntry } from '../types';

// Exemplos de matérias por área; não são a grade oficial de nenhum curso.
const examples: Array<[RegExp, string[]]> = [
  [/medicina veterin/, ['Anatomia Animal', 'Fisiologia Veterinária', 'Patologia Veterinária', 'Farmacologia Veterinária', 'Saúde Animal', 'Clínica Veterinária']],
  [/fisioterapia/, ['Anatomia Humana', 'Cinesiologia', 'Fisiologia Humana', 'Recursos Terapêuticos', 'Biomecânica', 'Avaliação em Fisioterapia']],
  [/educacao fisica/, ['Anatomia Humana', 'Fisiologia do Exercício', 'Biomecânica', 'Atividade Física e Saúde', 'Aprendizagem Motora', 'Esportes']],
  [/fonoaudiologia/, ['Anatomia Humana', 'Audiologia', 'Linguagem', 'Fonoaudiologia e Saúde', 'Motricidade Orofacial', 'Voz']],
  [/enfermagem/, ['Anatomia Humana', 'Fundamentos de Enfermagem', 'Fisiologia Humana', 'Saúde Coletiva', 'Farmacologia', 'Semiologia']],
  [/biomedicina/, ['Biologia Celular', 'Anatomia Humana', 'Bioquímica', 'Microbiologia', 'Imunologia', 'Fisiologia Humana']],
  [/odontologia/, ['Anatomia Humana', 'Anatomia Dental', 'Materiais Odontológicos', 'Saúde Coletiva', 'Patologia Oral', 'Clínica Odontológica']],
  [/nutricao/, ['Bioquímica', 'Fisiologia Humana', 'Avaliação Nutricional', 'Nutrição Humana', 'Saúde Coletiva', 'Técnica Dietética']],
  [/farmacia/, ['Química Geral', 'Bioquímica', 'Farmacologia', 'Microbiologia', 'Tecnologia Farmacêutica', 'Atenção Farmacêutica']],
  [/psicologia/, ['Introdução à Psicologia', 'Psicologia do Desenvolvimento', 'Psicologia Social', 'Neurociências', 'Psicopatologia', 'Ética Profissional']],
  [/ciencias biologicas/, ['Biologia Celular', 'Genética', 'Botânica', 'Zoologia', 'Ecologia', 'Evolução']],
  [/arquitetura|urbanismo/, ['Projeto Arquitetônico', 'Desenho e Representação', 'História da Arquitetura', 'Urbanismo', 'Conforto Ambiental', 'Sistemas Construtivos']],
  [/ciencia de dados|inteligencia artificial/, ['Programação', 'Estatística', 'Banco de Dados', 'Aprendizado de Máquina', 'Visualização de Dados', 'Fundamentos de Inteligência Artificial']],
  [/seguranca da informacao/, ['Segurança de Redes', 'Criptografia', 'Gestão de Riscos', 'Sistemas Operacionais', 'Proteção de Dados', 'Fundamentos de Redes']],
  [/banco de dados/, ['Modelagem de Dados', 'Banco de Dados', 'Programação', 'Administração de Banco de Dados', 'Análise de Dados', 'Segurança da Informação']],
  [/redes de computadores/, ['Fundamentos de Redes', 'Sistemas Operacionais', 'Redes de Computadores', 'Segurança de Redes', 'Infraestrutura de Redes', 'Administração de Sistemas']],
  [/jogos digitais/, ['Programação de Jogos', 'Design de Jogos', 'Computação Gráfica', 'Narrativas Interativas', 'Modelagem Digital', 'Projeto de Jogos']],
  [/computacao|sistemas de informacao|software|analise e desenvolvimento|tecnologia da informacao/, ['Algoritmos', 'Programação', 'Banco de Dados', 'Engenharia de Software', 'Redes de Computadores', 'Estruturas de Dados']],
  [/manutencao de aeronaves|engenharia aeronautica/, ['Aerodinâmica', 'Estruturas Aeronáuticas', 'Sistemas de Aeronaves', 'Mecânica', 'Materiais Aeronáuticos', 'Manutenção Aeronáutica']],
  [/engenharia civil/, ['Cálculo', 'Física', 'Desenho Técnico', 'Materiais de Construção', 'Estruturas', 'Construção Civil']],
  [/engenharia (eletrica|de controle|robotica)/, ['Cálculo', 'Física', 'Circuitos Elétricos', 'Eletrônica', 'Sistemas de Controle', 'Automação']],
  [/engenharia mecanica/, ['Cálculo', 'Física', 'Mecânica', 'Materiais', 'Termodinâmica', 'Desenho Técnico']],
  [/engenharia quimica/, ['Cálculo', 'Química Geral', 'Física', 'Termodinâmica', 'Processos Químicos', 'Fenômenos de Transporte']],
  [/engenharia de producao/, ['Cálculo', 'Estatística', 'Gestão da Produção', 'Logística', 'Pesquisa Operacional', 'Gestão da Qualidade']],
  [/engenharia/, ['Cálculo', 'Física', 'Desenho Técnico', 'Materiais', 'Projetos de Engenharia', 'Estatística']],
  [/direito/, ['Introdução ao Direito', 'Direito Constitucional', 'Direito Civil', 'Direito Penal', 'Teoria Geral do Processo', 'Direitos Humanos']],
  [/ciencias contabeis|contabilidade/, ['Contabilidade Geral', 'Contabilidade de Custos', 'Auditoria', 'Direito Tributário', 'Finanças', 'Contabilidade Gerencial']],
  [/ciencias economicas/, ['Microeconomia', 'Macroeconomia', 'Economia Brasileira', 'Estatística', 'História Econômica', 'Economia Internacional']],
  [/comercio exterior|relacoes internacionais/, ['Economia Internacional', 'Política Internacional', 'Comércio Exterior', 'Direito Internacional', 'Negociação Internacional', 'Geopolítica']],
  [/recursos humanos|gestao de pessoas/, ['Gestão de Pessoas', 'Recrutamento e Seleção', 'Comportamento Organizacional', 'Legislação Trabalhista', 'Treinamento e Desenvolvimento', 'Relações de Trabalho']],
  [/gestao financeira/, ['Matemática Financeira', 'Contabilidade', 'Finanças Corporativas', 'Análise de Investimentos', 'Gestão de Custos', 'Planejamento Financeiro']],
  [/marketing|publicidade/, ['Marketing', 'Comunicação Integrada', 'Comportamento do Consumidor', 'Pesquisa de Mercado', 'Marketing Digital', 'Planejamento de Campanhas']],
  [/gestao comercial|processos gerenciais|administra/, ['Teoria da Administração', 'Gestão de Pessoas', 'Contabilidade', 'Marketing', 'Economia', 'Planejamento Estratégico']],
  [/jornalismo/, ['Redação Jornalística', 'Reportagem', 'Ética Jornalística', 'Comunicação Digital', 'Fotojornalismo', 'Teorias da Comunicação']],
  [/cinema|audiovisual/, ['Linguagem Audiovisual', 'Roteiro', 'Fotografia', 'Produção Audiovisual', 'História do Cinema', 'Montagem']],
  [/relacoes publicas/, ['Comunicação Organizacional', 'Relações Públicas', 'Planejamento de Comunicação', 'Eventos', 'Comunicação Digital', 'Gestão de Imagem']],
  [/servico social/, ['Fundamentos do Serviço Social', 'Políticas Sociais', 'Direitos Humanos', 'Questão Social', 'Ética Profissional', 'Pesquisa Social']],
  [/ciencias sociais/, ['Sociologia', 'Antropologia', 'Ciência Política', 'Teoria Social', 'Pesquisa Social', 'Cultura e Sociedade']],
  [/geografia/, ['Geografia Física', 'Geografia Humana', 'Cartografia', 'Geografia do Brasil', 'Climatologia', 'Geografia Urbana']],
  [/historia/, ['História do Brasil', 'História Antiga', 'História Moderna', 'História Contemporânea', 'Teoria da História', 'Pesquisa Histórica']],
  [/letras/, ['Linguística', 'Literatura Brasileira', 'Língua Portuguesa', 'Teoria Literária', 'Produção Textual', 'Estudos da Linguagem']],
  [/matematica/, ['Cálculo', 'Álgebra', 'Geometria', 'Estatística', 'Matemática Discreta', 'Fundamentos da Matemática']],
  [/fisica/, ['Cálculo', 'Mecânica', 'Termodinâmica', 'Eletromagnetismo', 'Física Moderna', 'Laboratório de Física']],
  [/filosofia/, ['História da Filosofia', 'Ética', 'Lógica', 'Filosofia Política', 'Teoria do Conhecimento', 'Filosofia Contemporânea']],
  [/teologia/, ['Introdução à Teologia', 'Estudos Bíblicos', 'Ética', 'História da Igreja', 'Teologia Sistemática', 'Ciências da Religião']],
  [/pedagogia/, ['Fundamentos da Educação', 'Didática', 'Psicologia da Educação', 'Alfabetização', 'Políticas Educacionais', 'Práticas Pedagógicas']],
];

export function subjectsForCourse(courseName: string): string[] {
  const course = courseName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  return examples.find(([pattern]) => pattern.test(course))?.[1] ?? (courseName.trim() ? [`Fundamentos de ${courseName}`, `Introdução a ${courseName}`, `Estudos em ${courseName}`, 'Metodologia Científica', 'Projeto Integrador'] : []);
}

// Grade gerada de forma estável por aluno; não representa matrícula ou horários oficiais.
export function exampleSchedule(card: AccessCard): ScheduleEntry[] {
  const subjects = card.disciplines?.filter(item => item.name.trim()).map(item => item.name) || [];
  const pool = subjects.length ? subjects : subjectsForCourse(card.curso || '');
  if (!pool.length) return [];
  let seed = 2166136261;
  for (const character of card.id) seed = Math.imul(seed ^ character.charCodeAt(0), 16777619);
  const slots = [['08:50', '10:30'], ['10:40', '12:20']];
  const professors = ['Ana Ribeiro', 'Bruno Campos', 'Camila Duarte', 'Daniel Martins', 'Fernanda Lopes', 'Lucas Teixeira'];
  return Array.from({ length: 10 }, (_, index) => {
    const subjectIndex = ((seed >>> 0) + index + Math.floor(index / 2)) % pool.length;
    return {
      id: `example-${index}`, weekday: Math.floor(index / 2) + 1,
      startTime: slots[index % 2][0], endTime: slots[index % 2][1],
      subject: pool[subjectIndex], code: null,
      location: 'PUC Minas Poços de Caldas | Prédio 02 | Andar 03 | Sala de aula 33',
      professor: professors[((seed >>> 0) + subjectIndex) % professors.length],
    };
  });
}
