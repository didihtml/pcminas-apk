import React, { useState } from "react";
import { ArrowLeft, Menu } from "lucide-react";

const locations = [
  { name: "Barreiro", lines: ["Av. Afonso Vaz de Melo, 1.200", "Barreiro – Belo Horizonte"] },
  { name: "Betim", lines: ["R. do Rosário, 1.081", "Angola – Betim"] },
  { name: "Contagem", lines: ["R. Rio Comprido, 4.580", "Cinco – Contagem"] },
  { name: "Coração Eucarístico", lines: ["Av. Dom José Gaspar, 500", "Coração Eucarístico – Belo Horizonte"] },
  { name: "São Gabriel", lines: ["R. Walter Ianni, 255", "São Gabriel – Belo Horizonte"] },
  { name: "Lourdes (Praça da Liberdade)", lines: ["Av. Brasil, 2023", "Savassi, Belo Horizonte"] },
  { name: "Serro", lines: ["Pç. João Pessoa, 74", "Centro – Serro"] },
  { name: "Poços de Caldas", lines: ["Av. Padre Cletus Francis Cox, 1.661", "Jardim Country Club – Poços de Caldas"] },
];

const ContactPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="fixed inset-y-0 left-1/2 z-[60] flex w-full max-w-[430px] -translate-x-1/2 flex-col bg-[#0d111d]">
    <header className="relative flex h-[100px] shrink-0 items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)] text-white"><button type="button" onClick={onBack} aria-label="Voltar para Central de Ajuda" className="absolute bottom-4 left-3 p-1"><ArrowLeft size={21}/></button><h1 className="text-center text-[14px] font-semibold">FALE CONOSCO</h1></header>
    <main className="min-h-0 flex-1 overflow-y-auto bg-white text-[#25262a]">
      <img src="/fale-conosco-banner.png" alt="Call Center PUC Minas — Informações e Relacionamento" className="block w-full"/>
      <div className="bg-[#13b5bd] px-3 py-2"><button type="button" aria-expanded={menuOpen} aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)} className="flex h-10 w-[110px] items-center justify-center rounded border border-black/10 text-[#086f79]"><Menu size={26}/></button>{menuOpen && <div className="mt-2 rounded bg-white p-3 text-sm"><a href="https://www.pucminas.br/central/Paginas/default.aspx" target="_blank" rel="noopener noreferrer" className="text-[#006b7c] underline">Abrir site oficial da Central de Informações</a></div>}</div>
      <article className="px-3 pb-12 pt-4"><h2 className="text-center text-[26px] font-bold leading-tight text-[#17b6be]">Call Center PUC Minas</h2><h3 className="mt-1 text-center text-[22px] font-light leading-tight text-[#777]">Informações e Relacionamento</h3><div className="mt-4 space-y-4 text-[15px] leading-[1.55]"><p>O Call Center PUC Minas – Informações e Relacionamento é o setor responsável por manter o diálogo permanente e direto entre a Universidade e seus vários públicos, prestando todo tipo de informação sobre a Instituição, como cursos ofertados, processos de seleção, bolsas de estudo, serviços prestados à comunidade e eventos acadêmicos.</p><p>Vinculada à Secretaria de Comunicação da Instituição, o Call Center PUC Minas dedica-se a proporcionar atendimento qualificado e personalizado aos alunos, futuros estudantes, professores, funcionários e demais membros da comunidade universitária, sempre norteada pela missão e pelos valores da Universidade.</p></div><p className="mt-4 text-xs text-[#666]">Informações da <a className="text-[#006b7c] underline" href="https://www.pucminas.br/central/Paginas/default.aspx" target="_blank" rel="noopener noreferrer">Central de Informações da PUC Minas</a>.</p></article>
      <footer className="grid grid-cols-2 gap-x-6 gap-y-5 bg-[#001b1e] px-3 py-5 text-white"><div><img src="/logo-puc-white.png" alt="PUC Minas" className="max-h-32 w-full max-w-[115px] object-contain"/></div>{locations.map(place => <section key={place.name}><h4 className="text-[15px]">{place.name}</h4>{place.lines.map(line => <p key={line} className="mt-0.5 text-xs leading-5 text-white/75">{line}</p>)}</section>)}</footer>
    </main><div className="h-[max(30px,env(safe-area-inset-bottom))] shrink-0 bg-[#0d111d]"/>
  </div>;
};
export default ContactPage;
