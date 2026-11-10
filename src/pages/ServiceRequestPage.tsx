import React, { useState } from "react";
import { Eraser, ExternalLink, Search, SquareMinus, SquarePlus } from "lucide-react";

interface ServiceRequestPageProps { onBack: () => void }
const groups = [
  { title: "Acesso Canvas", items: ["Suporte ao Canvas (Solicitação)"] },
  { title: "Acesso Office 365 (Teams, OneDrive e outros)", items: ["Suporte ao MFA - Autenticação Multifator (Solicitação)", "Suporte ao Office365 (Solicitação)"] },
  { title: "Acesso remoto", items: ["Suporte técnico ao acesso remoto (Solicitação)"] },
  { title: "Internet", items: ["Liberar acesso a site da Internet na rede acadêmica (Solicitação)"] },
  { title: "Laboratórios e salas de aula", items: ["Suporte técnico em Laboratório (Solicitação)"] },
  { title: "Usuário da Rede", items: ["Falha em acesso a rede (Incidente)", "Suporte a desativação de credencial de acesso (Solicitação)", "Troca de senha acadêmica (Solicitação)"] },
];

const ServiceRequestPage: React.FC<ServiceRequestPageProps> = ({ onBack }) => {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string[]>(["Serviços de TI", "Rede Acadêmica", ...groups.map(group => group.title)]);
  const [notice, setNotice] = useState("");
  const toggle = (key: string) => setExpanded(previous => previous.includes(key) ? previous.filter(value => value !== key) : [...previous, key]);
  const search = query.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const matches = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search);
  const filteredGroups = groups.map(group => ({ ...group, items: matches(group.title) ? group.items : group.items.filter(matches) })).filter(group => group.items.length > 0);
  const heading = (title: string) => <button type="button" onClick={() => toggle(title)} aria-expanded={expanded.includes(title)} className="flex items-center gap-1 text-left text-[13px] text-[#202020]">{expanded.includes(title) ? <SquareMinus size={13} className="text-[#696969]"/> : <SquarePlus size={13} className="text-[#696969]"/>}{title}</button>;
  return <main className="min-h-0 flex-1 overflow-y-auto bg-[#f9f9f9] px-2 pb-8 pt-2 text-[#555]">
    <h2 className="text-[17px] font-bold uppercase">Abertura de chamado</h2>
    <div className="mt-6 flex gap-1"><div className="relative flex-1"><label htmlFor="service-search" className="sr-only">Pesquisar serviços</label><input id="service-search" value={query} onChange={e => { setQuery(e.target.value); setNotice(""); }} placeholder="Pesquisar:" className="h-[29px] w-full border-2 border-[#34799c] bg-white px-3 pr-9 text-sm text-[#333] placeholder:text-[#aaa]"/><Search size={17} className="pointer-events-none absolute right-3 top-1.5 text-[#333]" aria-hidden="true"/></div><button type="button" onClick={() => { setQuery(""); setNotice(""); }} aria-label="Limpar pesquisa" className="flex h-[31px] w-12 items-center justify-center rounded border border-[#ccc] bg-white text-[#333]"><Eraser size={18}/></button></div>
    <div className="ml-5 mt-4">{heading("Serviços de TI")}{expanded.includes("Serviços de TI") && <div className="ml-3 mt-4">{heading("Rede Acadêmica")}{expanded.includes("Rede Acadêmica") && <div className="ml-3 mt-4 space-y-5">{filteredGroups.length === 0 && <p className="text-sm">Nenhum serviço encontrado.</p>}{filteredGroups.map(group => <section key={group.title}>{heading(group.title)}{expanded.includes(group.title) && <div className="ml-4 mt-4 space-y-5">{group.items.map(item => <button key={item} type="button" onClick={() => setNotice("A abertura de chamados não está disponível no momento.")} className="flex items-start gap-2 text-left text-[13px] leading-4 text-[#005580]"><ExternalLink size={14} className="mt-0.5 shrink-0"/><span>{item}</span></button>)}</div>}</section>)}</div>}</div>}</div>
    {notice && <p role="status" className="mt-5 text-sm">{notice}</p>}
    <button type="button" onClick={onBack} className="mt-12 rounded border border-[#005580] bg-white px-8 py-1.5 text-sm text-[#005580]">Voltar</button>
  </main>;
};
export default ServiceRequestPage;
