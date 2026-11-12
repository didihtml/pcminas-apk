import { ArrowLeft, Printer } from "lucide-react";
import { createPortal } from "react-dom";

const basic = [
  "ARQUEIRO. Rio de Janeiro: Instituto Nacional de Educação de Surdos, 2000-. 2004. ISSN 1518-2495. Disponível em: https://seer.ines.gov.br/index.php/revista-arqueiro/index. Acesso em: 23 maio 2024.",
  "QUADROS, Ronice Müller de; MACHADO, Rodrigo Nogueira; SILVA, Jair Barbosa da. Introdução ao estudo da Libras. São Paulo: Contexto, 2025. Livro digital. ISBN 9786555416367.",
  "QUADROS, Ronice Müller de; KARNOPP, Lodenir. Língua de sinais brasileira: estudos linguísticos. Porto Alegre: Artmed, 2004. E-book. ISBN 9788536311746.",
  "SOUZA, Tanya Amara Felipe de. Libras em contexto: curso básico: livro do estudante. 9. ed. Rio de Janeiro: Walprint, 2009. 187 p. ISBN 8599091018, Nº de Exemplares: 2.",
];
const complementary = [
  "BRITO, Lucinda Ferreira. Por uma gramática das línguas de sinais. Rio de Janeiro: Tempo Brasileiro, 1995. 273p. ISBN 8528200698, Nº de Exemplares: 4.",
  "GESSER, Audrei. Libras?: que língua é essa?: crenças e preconceitos em torno da língua de sinais e da realidade surda. São Paulo: Parábola, 2009. 87 p. ISBN 9788579340017, Nº de Exemplares: 20.",
  "MOURA, Maria Cecília de. O surdo: caminhos para uma nova identidade. Rio de Janeiro: Revinter, 2000. 152p. ISBN 8573093889, Nº de Exemplares: 1.",
  "REVISTA SINALIZAR. Goiânia, GO: UFG, Faculdade de Letras, 2016-. Anual. ISSN 2448-0797. Disponível em: https://revistas.ufg.br/revsinal. Acesso em: 23 maio 2024.",
  "SACKS, Oliver W. Vendo vozes: uma viagem ao mundo dos surdos. São Paulo: Companhia das Letras, 1998. 196 p. ISBN 8571647798, Nº de Exemplares: 6.",
  "SANTANA, Ana Paula. Surdez e linguagem: aspectos e implicações neurolinguísticas. 5. ed. São Paulo: Summus, 2015. E-book. ISBN 9788585689971.",
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mt-16"><h2 className="text-[22px] font-normal leading-tight text-[#007f99]">{title}</h2><div className="mt-4 h-[3px] w-[50px] bg-[#007f99]"/><div className="mt-10 space-y-10 text-justify text-[14px] leading-[1.5] text-[#303030]">{children}</div></section>;
}

export default function TeachingPlanDetail({ onBack }: { onBack: () => void }) {
  return createPortal(<div className="fixed inset-y-0 left-1/2 z-[70] flex w-full max-w-[430px] -translate-x-1/2 flex-col bg-[#0d111d]">
    <header className="relative flex h-[100px] shrink-0 items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)] text-white"><button type="button" onClick={onBack} className="absolute bottom-4 left-4 p-1" aria-label="Voltar"><ArrowLeft size={22}/></button><h1 className="text-[15px] font-semibold">PLANO DE ENSINO</h1></header>
    <main className="flex-1 overflow-y-auto bg-[#fafafa] font-[Arial,sans-serif]">
      <div className="flex h-[100px] items-center bg-gradient-to-r from-[#10576b] to-[#477985] px-8"><img src="/SGALOGO.png" alt="SGA" className="max-h-12 w-16 object-contain"/></div>
      <div className="px-[10%] pb-8 pt-6 text-[#303030]">
        <h2 className="text-[32px] font-normal leading-[1.3] text-[#06495b]">Plano de Ensino (2º semestre de 2026)</h2>
        <div className="mt-10 text-[14px] leading-[1.55]"><p>Curso: 128 - EAD - PUC MINAS VIRTUAL</p><p>Disciplina: 64897 - LÍNGUA BRASILEIRA DE SINAIS</p><p>Período:</p><p>Turno: Virtual</p><p>Carga Horária:</p><p>TEÓRICA 18 horas (GRADE 18)</p><p>TOTAL 18 horas</p></div>
        <Section title="Ementa"><p>Princípios básicos do funcionamento da Língua Brasileira de Sinais - LIBRAS. Iniciação à soletração manual e aos numerais. Uso do corpo e do espaço, classificadores básicos, estrutura linguística em contextos comunicativos (diálogos curtos, narrativas simples). Aspectos peculiares da história e cultura das pessoas surdas.</p></Section>
        {["Objetivos", "Métodos Didáticos", "Unidades de Ensino", "Processo de Avaliação"].map(title => <Section key={title} title={title}><p>( não cadastrado )</p></Section>)}
        <Section title="Descrição da Bibliografia Básica">{basic.map(item => <p key={item}>{item}</p>)}</Section>
        <Section title="Descrição da Bibliografia Complementar">{complementary.map(item => <p key={item}>{item}</p>)}</Section>
        <div className="mt-20 border-t border-dashed border-[#ddd] pt-16 text-[14px]"><p>Hugo César Martins Costa</p><div className="mt-20 flex justify-end"><button type="button" onClick={() => window.print()} className="flex items-center gap-2 rounded bg-[#007f99] px-3 py-2 text-white"><Printer size={18}/>Imprimir</button></div><p className="mt-24 text-right text-[#007f99]">◉ GTI</p></div>
      </div>
    </main><div className="h-[max(30px,env(safe-area-inset-bottom))] shrink-0 bg-[#0d111d]"/>
  </div>, document.body);
}
