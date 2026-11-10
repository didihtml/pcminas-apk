import React, { useState } from "react";
import { ArrowLeft, Banknote, Bell, Book, BriefcaseBusiness, ChevronRight, ClipboardCheck, Laptop, LifeBuoy, Pencil, QrCode, ScanFace, UserRound, ReceiptText, MessagesSquare, BadgePercent, FileCheck, FileText, MessageCircle, MessageSquareText, Phone, PackageOpen, Landmark, Settings, LogOut, Download, Share2, Printer, CalendarDays } from "lucide-react";
import type { AccessCard } from "../types";
import FacialCapture from "../components/portal/FacialCapture";
import APucPage from "./APucPage";
import MissaoValoresPage from "./MissaoValoresPage";

interface MenuPageProps { card: AccessCard; onOpenAccessCredentials: () => void; onLogout: () => void; }
const menuItems = [
  { label: "Reconhecimento Facial", icon: ScanFace }, { label: "Credenciais de acesso", icon: QrCode },
  { label: "Financeiro", icon: Banknote }, { label: "Bolsas", icon: Book },
  { label: "Solicitação de Serviços", icon: Laptop }, { label: "Central de ajuda", icon: LifeBuoy },
  { label: "PUC Carreiras", icon: BriefcaseBusiness, disabled: true }, { label: "Avaliações Institucionais - CPA", icon: ClipboardCheck },
  { label: "A PUC Minas", icon: Landmark }, { label: "Configurações", icon: Settings }, { label: "Sair", icon: LogOut },
];
const referenceIcons: Record<string, string> = {
  "Reconhecimento Facial": "reconhecimento",
  "Credenciais de acesso": "credenciais",
  Financeiro: "financeiro",
  Bolsas: "bolsas",
  "Solicitação de Serviços": "servicos",
  "Central de ajuda": "ajuda",
  "PUC Carreiras": "carreiras",
  "A PUC Minas": "puc",
  "Configurações": "configuracoes",
};
const financeIcons: Record<string, string> = {
  "Emissão de boleto bancário": "boleto",
  "Negociação de Parcelas": "negociacao",
  "Valor do plano de estudos": "plano",
  "Declaração de pagamento": "declaracao",
};
const categoryItems: Record<string, { label: string; icon: typeof Book }[]> = {
  Financeiro: [ { label: "Emissão de boleto bancário", icon: ReceiptText }, { label: "Negociação de Parcelas", icon: MessagesSquare }, { label: "Valor do plano de estudos", icon: BadgePercent }, { label: "Declaração de pagamento", icon: FileCheck } ],
  Bolsas: [{ label: "Adesão ao termo de bolsa", icon: FileText }],
  "Central de ajuda": [ { label: "Assistente Virtual", icon: MessageCircle }, { label: "Fale Conosco", icon: MessageSquareText }, { label: "Ouvidoria", icon: MessagesSquare }, { label: "Whatsapp Institucional", icon: Phone } ],
};

const MenuPage: React.FC<MenuPageProps> = ({ card, onOpenAccessCredentials, onLogout }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [voice, setVoice] = useState(true);
  const [capturing, setCapturing] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [showBoletos, setShowBoletos] = useState(false);
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [showPlanPreview, setShowPlanPreview] = useState(false);
  const [planDate, setPlanDate] = useState("");
  const [negotiationNotice, setNegotiationNotice] = useState(false);
  const [notice, setNotice] = useState("");
  const choose = (label: string) => { setNotice(""); if (label === "Credenciais de acesso") onOpenAccessCredentials(); else if (label === "Sair") onLogout(); else setSelectedItem(label); };
  const unavailable = () => setNotice("Este serviço não está disponível no momento.");
  if (showPlanPreview) return <div className="fixed inset-0 z-[80] flex h-[100dvh] flex-col bg-[#0d111d] text-white">
    <header className="relative flex h-[100px] shrink-0 items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)]"><button type="button" onClick={() => setShowPlanPreview(false)} className="absolute bottom-4 left-3 p-1" aria-label="Voltar"><ArrowLeft size={21}/></button><h1 className="text-center text-[14px] font-semibold">VALOR DO PLANO DE ESTUDOS</h1></header>
    <main className="flex-1 overflow-auto bg-[#808080] p-2"><p role="status" className="mb-2 rounded bg-[#0d111d] p-2 text-xs text-white">O demonstrativo financeiro não está disponível. As páginas abaixo são apenas uma prévia do formato.</p>{[1, 2].map(page => <section key={page} className="mb-2 aspect-[1.29] bg-white p-[4%] text-[clamp(5px,1.4vw,8px)] text-black"><div className="flex items-start justify-between"><img src="/logo-puc-coat.png" alt="" className="h-8 w-8 object-contain"/><h2 className="text-center font-bold">Demonstrativo Acadêmico Financeiro Simplificado</h2><span>Página {page}</span></div><p className="mt-3 font-semibold">Dados financeiros indisponíveis</p><p className="mt-1">Período selecionado: {planDate.split("-").reverse().join("/")}</p><div className="mt-4 border border-[#a0a0a0] bg-[#e6e6e6] px-1 py-0.5 font-bold">{page === 1 ? "Plano de estudos" : "Posição financeira"}</div><div className="grid grid-cols-4 border-x border-b border-[#a0a0a0] text-center"><span className="border-r border-[#a0a0a0] p-1">Descrição</span><span className="border-r border-[#a0a0a0] p-1">Data</span><span className="border-r border-[#a0a0a0] p-1">Valor</span><span className="p-1">Situação</span></div><p className="mt-2 text-center text-[#666]">Nenhum dado financeiro foi consultado.</p></section>)}</main>
    <footer className="flex shrink-0 gap-2 bg-[#0d111d] px-[15px] pb-[max(20px,env(safe-area-inset-bottom))] pt-3">{[[Download, "Salvar"], [Share2, "Compartilhar"], [Printer, "Imprimir"]].map(([Icon, label]) => { const ButtonIcon = Icon as typeof Download; return <button key={label as string} type="button" disabled title="Disponível quando houver um demonstrativo" className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[#00537d] px-2 py-3 text-sm font-semibold opacity-50"><ButtonIcon size={17}/><span className="truncate">{label as string}</span></button>; })}</footer>
  </div>;
  if (showStudyPlan) return <div className="flex min-h-[100dvh] flex-col bg-[#0d111d] pb-32 text-white">
    <header className="relative flex h-[100px] shrink-0 items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)]"><button type="button" onClick={() => { setShowStudyPlan(false); setNotice(""); }} className="absolute bottom-4 left-3 p-1" aria-label="Voltar para Financeiro"><ArrowLeft size={21}/></button><h1 className="text-center text-[14px] font-semibold">VALOR DO PLANO DE ESTUDOS</h1><Bell size={19} className="absolute bottom-5 right-5" aria-label="Notificações" /></header>
    <main className="flex flex-1 flex-col px-[15px] pb-3 pt-4"><h2 className="text-[17px] font-bold uppercase leading-5 text-[#a4a4ae]">Informe a data de início do período cursado que deseja consultar</h2><label htmlFor="plan-date" className="mb-1 mt-4 text-xs text-[#a4a4ae]">DATA INÍCIO</label><div className="relative flex h-[52px] w-full items-center justify-between rounded-lg border border-[#b7b8c1] px-[14px] text-[15px] text-[#c6c7d1] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white"><span aria-hidden="true">{planDate ? planDate.split("-").reverse().join("/") : "Selecione o período"}</span><CalendarDays size={21} className="text-[#898c94]" aria-hidden="true"/><input id="plan-date" type="date" value={planDate} onChange={e => setPlanDate(e.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" /></div>{notice && <p role="status" className="mt-3 text-sm text-[#a4aab5]">{notice}</p>}<button type="button" onClick={() => { if (planDate) { setNotice(""); setShowPlanPreview(true); } else setNotice("Selecione a data de início para continuar."); }} className="mt-auto w-full rounded-xl bg-[#00537d] px-4 py-3 text-sm font-semibold">Visualizar valor do plano</button></main>
  </div>;
  if (showNegotiation) return <div className="flex min-h-[100dvh] flex-col bg-[#0d111d] pb-32 text-white">
    <header className="relative flex h-[100px] shrink-0 items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)]"><button type="button" onClick={() => setShowNegotiation(false)} className="absolute bottom-4 left-3 p-1" aria-label="Voltar para Financeiro"><ArrowLeft size={21}/></button><h1 className="text-center text-[14px] font-semibold">NEGOCIAÇÃO</h1><Bell size={19} className="absolute bottom-5 right-5" aria-label="Notificações" /></header>
    <main className="flex flex-1 flex-col"><div className="fixed bottom-[77px] left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 border-t border-white/[0.06] bg-[#151923] px-[15px] py-3"><p className="text-xs text-[#a4aab5]"><strong>Atenção:</strong> Somente parcelas com a mesma mensagem de plano de pagamento poderão ser negociadas em conjunto.</p><button type="button" disabled className="mt-2 w-full rounded-lg bg-[#555861] px-4 py-3 text-sm text-white/60">Gerar resumo de pagamento</button></div></main>
    {negotiationNotice && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-[18px]" role="dialog" aria-modal="true" aria-labelledby="negotiation-title"><div className="w-full max-w-[400px] rounded-lg border border-white/[0.06] bg-[#151923] p-6"><h2 id="negotiation-title" className="flex items-center gap-2 text-base font-bold"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fff0d8] text-[#f59e0b]">⚠</span>Aviso</h2><p className="mt-5 text-sm text-[#a4aab5]">Não há parcelas disponíveis para negociação nesta tela. A consulta financeira não está integrada.</p><button type="button" onClick={() => setNegotiationNotice(false)} className="mt-5 w-full rounded-lg bg-[#00537d] px-4 py-3 text-sm font-semibold">OK</button></div></div>}
  </div>;
  if (showBoletos) return <div className="min-h-[100dvh] bg-[#0d111d] pb-32 text-white">
    <header className="relative flex h-[100px] items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)]"><button type="button" onClick={() => setShowBoletos(false)} className="absolute bottom-4 left-3 p-1" aria-label="Voltar para Financeiro"><ArrowLeft size={21}/></button><h1 className="text-center text-[14px] font-semibold">EMISSÃO DE BOLETO</h1><Bell size={19} className="absolute bottom-5 right-5" aria-label="Notificações" /></header>
    <main className="space-y-[9px] px-[15px] pt-[15px]">{[[5, "01/11/26"], [4, "01/10/26"], [3, "15/09/26"], [2, "01/09/26"], [1, "05/08/26"]].map(([number, date]) => <section key={number} className="rounded-lg border border-white/[0.06] bg-[#151923] px-3 py-3"><div className="flex items-center justify-between gap-3 border-b border-white/[0.06] pb-3"><h2 className="text-[15px] font-bold">Parcela {number} - 2/2026</h2><span className="rounded bg-[#27b968] px-3 py-1 text-[11px] font-semibold text-[#064e2a]">PAGO · EXEMPLO</span></div><p className="pt-3 text-[13px]"><strong>Vencimento:</strong> {date}</p></section>)}</main>
  </div>;
  if (selectedItem === "A PUC Minas") return showMission ? <MissaoValoresPage onBack={() => setShowMission(false)} /> : <APucPage onBack={() => setSelectedItem(null)} onMissaoValores={() => setShowMission(true)} />;
  return <div className={`min-h-[100dvh] pb-32 text-white ${selectedItem === "Reconhecimento Facial" || selectedItem === "Financeiro" ? "bg-[#0d111d]" : "bg-[#0d1019]"}`}>
    <header className={`relative flex h-[100px] items-end justify-center px-12 pb-5 pt-[env(safe-area-inset-top)] ${selectedItem === "Reconhecimento Facial" || selectedItem === "Financeiro" ? "bg-[#182037]" : "bg-[#171b31]"}`}>
      {selectedItem && <button type="button" onClick={() => { setSelectedItem(null); setNotice(""); }} className="absolute bottom-4 left-3 p-1" aria-label="Voltar para Menu"><ArrowLeft size={21} /></button>}
      <h1 className="text-center text-[14px] font-semibold uppercase">{selectedItem ?? "Menu"}</h1>
      {selectedItem !== "Reconhecimento Facial" && selectedItem !== "Solicitação de Serviços" && <Bell size={19} strokeWidth={1.8} className="absolute bottom-5 right-5" aria-label="Notificações" />}
    </header>
    {!selectedItem ? <main className="px-[17px]">
      <div className="mb-9 mt-2 flex min-h-[82px] items-center gap-[17px]"><div className="relative shrink-0"><div className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full bg-[#e8e8e8] text-[#8c8c8c]">{card.fotoUrl && !imageError ? <img src={card.fotoUrl} alt="" onError={() => setImageError(true)} className="h-full w-full object-cover" /> : <UserRound size={32} />}</div><span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-[#00577c]"><Pencil size={9} /></span></div><div><h2 className="text-[17px] font-semibold">{card.nome}</h2>{card.codigo && <p className="mt-1 text-sm text-[#85858e]">RA {card.codigo}</p>}</div></div>
      <div className="space-y-2">{menuItems.map(({ label, icon: Icon, disabled }) => <button key={label} type="button" disabled={disabled} onClick={() => choose(label)} className="flex min-h-[65px] w-full items-center gap-[15px] rounded-[9px] border border-white/[0.035] bg-[#141720] px-[18px] text-left disabled:text-[#85858e]">{referenceIcons[label] ? <img src={`/menu-icons/${referenceIcons[label]}.png`} alt="" className="h-6 w-6 shrink-0" /> : <Icon size={24} strokeWidth={1.7} className="shrink-0" />}<span className="min-w-0 flex-1 text-[17px] font-semibold leading-tight">{label}</span><ChevronRight size={24} /></button>)}</div>
    </main> : categoryItems[selectedItem] ? <main className={selectedItem === "Financeiro" ? "space-y-[7px] px-[11px] pt-[13px]" : "space-y-2 px-[15px] pt-[15px]"}>{categoryItems[selectedItem].map(({ label, icon: Icon }) => <button key={label} type="button" onClick={() => { if (label === "Emissão de boleto bancário") setShowBoletos(true); else if (label === "Negociação de Parcelas") { setShowNegotiation(true); setNegotiationNotice(true); } else if (label === "Valor do plano de estudos") { setNotice(""); setShowStudyPlan(true); } else unavailable(); }} className={selectedItem === "Financeiro" ? "flex min-h-[51px] w-full items-center gap-3 rounded-lg border border-white/[0.05] bg-[#151923] px-[15px] text-left" : "flex min-h-[55px] w-full items-center gap-3 rounded-lg border border-white/[0.05] bg-[#141720] px-4 text-left"}>{selectedItem === "Financeiro" ? <img src={`/menu-icons/${financeIcons[label]}.png`} alt="" className="h-[20px] w-[20px] shrink-0" /> : <Icon size={21} className="shrink-0 text-[#80c7e6]" strokeWidth={1.7}/>}<span className={selectedItem === "Financeiro" ? "flex-1 text-[13px] font-semibold" : "flex-1 text-[15px] font-semibold"}>{label}</span><ChevronRight size={21} className={selectedItem === "Financeiro" ? "text-white" : "text-[#80c7e6]"} /></button>)}{notice && <p role="status" className="px-1 pt-3 text-sm text-[#a4aab5]">{notice}</p>}</main>
    : selectedItem === "Reconhecimento Facial" ? <main><section className="flex min-h-[500px] flex-col items-center justify-center bg-[#101115] px-5 py-10"><h2 className="mb-4 text-xl font-semibold">Cadastro Facial</h2><div className="w-full rounded-md border border-[#183e77] bg-[#0d1c31] p-4 text-[#cbdcf6]"><h3 className="mb-2 font-bold">Instruções</h3><ul className="list-disc space-y-1 pl-6 text-sm"><li>🔊 Ligue e aumente o som para ouvir as instruções</li><li>👀 Abra bem os olhos e olhe para a câmera</li><li>💡 Fique em um local bem iluminado</li><li>🚫 Remova óculos, chapéu ou máscara</li></ul></div><label className="mt-6 flex items-center gap-2 text-sm"><input type="checkbox" role="switch" checked={voice} onChange={e => setVoice(e.target.checked)} className="peer sr-only" /><span aria-hidden="true" className="relative h-[18px] w-[34px] rounded-full bg-[#59616b] transition-colors peer-checked:bg-[#0d6efd] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white after:absolute after:left-[2px] after:top-[2px] after:h-[14px] after:w-[14px] after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" /> Habilitar guia de voz</label><button type="button" onClick={() => setCapturing(true)} className="mt-5 rounded-lg bg-[#00537d] px-5 py-3 text-base">Iniciar Captura Facial</button>{notice && <p role="status" className="mt-3 text-center text-sm text-[#a4aab5]">{notice}</p>}</section><section className="border-t border-[#202637] bg-[#0d111d] px-5 py-5 text-sm text-[#8a8e9b]"><h3 className="mb-2 text-[#f5f6fa]">Identificação facial para acesso à PUC</h3><p>Esta tela não realiza identificação nem libera acesso às dependências da PUC Minas.</p><p className="mt-3">A imagem da câmera é usada apenas para a prévia e não é armazenada ou enviada.</p></section></main>
    : selectedItem === "Solicitação de Serviços" ? <main className="flex flex-col items-center px-8 pt-16 text-center"><PackageOpen size={150} strokeWidth={0.9} className="mb-10 text-[#3b7890]"/><h2 className="text-lg font-bold">Nada por aqui!</h2><p className="mt-3 text-base text-[#a4aab5]">Comece abrindo um novo chamado.</p><button type="button" onClick={unavailable} className="mt-14 w-full rounded bg-[#00527f] px-4 py-3 font-semibold">ABRIR CHAMADO</button>{notice && <p role="status" className="mt-3 text-sm text-[#a4aab5]">{notice}</p>}</main>
    : <main className="px-5 pt-8 text-sm text-[#a4aab5]">Este serviço não está disponível no momento.</main>}
    {capturing && <FacialCapture onClose={() => setCapturing(false)} />}
  </div>;
};
export default MenuPage;
