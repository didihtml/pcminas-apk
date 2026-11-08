import React, { useState } from "react";
import { ArrowLeft, Banknote, Bell, Book, BriefcaseBusiness, ChevronRight, ClipboardCheck, Laptop, LifeBuoy, Pencil, QrCode, ScanFace, UserRound, ReceiptText, MessagesSquare, BadgePercent, FileCheck, FileText, MessageCircle, MessageSquareText, Phone, PackageOpen } from "lucide-react";
import type { AccessCard } from "../types";

interface MenuPageProps { card: AccessCard; onOpenAccessCredentials: () => void; }
const menuItems = [
  { label: "Reconhecimento Facial", icon: ScanFace }, { label: "Credenciais de acesso", icon: QrCode },
  { label: "Financeiro", icon: Banknote }, { label: "Bolsas", icon: Book },
  { label: "Solicitação de Serviços", icon: Laptop }, { label: "Central de ajuda", icon: LifeBuoy },
  { label: "PUC Carreiras", icon: BriefcaseBusiness, disabled: true }, { label: "Avaliações Institucionais - CPA", icon: ClipboardCheck },
];
const categoryItems: Record<string, { label: string; icon: typeof Book }[]> = {
  Financeiro: [ { label: "Emissão de boleto bancário", icon: ReceiptText }, { label: "Negociação de Parcelas", icon: MessagesSquare }, { label: "Valor do plano de estudos", icon: BadgePercent }, { label: "Declaração de pagamento", icon: FileCheck } ],
  Bolsas: [{ label: "Adesão ao termo de bolsa", icon: FileText }],
  "Central de ajuda": [ { label: "Assistente Virtual", icon: MessageCircle }, { label: "Fale Conosco", icon: MessageSquareText }, { label: "Ouvidoria", icon: MessagesSquare }, { label: "Whatsapp Institucional", icon: Phone } ],
};

const MenuPage: React.FC<MenuPageProps> = ({ card, onOpenAccessCredentials }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [voice, setVoice] = useState(true);
  const [notice, setNotice] = useState("");
  const choose = (label: string) => { setNotice(""); if (label === "Credenciais de acesso") onOpenAccessCredentials(); else setSelectedItem(label); };
  const unavailable = () => setNotice("Este serviço não está disponível no momento.");
  return <div className="min-h-[100dvh] bg-[#0d1019] pb-32 text-white">
    <header className="relative flex h-[100px] items-end justify-center bg-[#171b31] px-12 pb-5 pt-[env(safe-area-inset-top)]">
      {selectedItem && <button type="button" onClick={() => { setSelectedItem(null); setNotice(""); }} className="absolute bottom-4 left-3 p-1" aria-label="Voltar para Menu"><ArrowLeft size={21} /></button>}
      <h1 className="text-center text-[14px] font-semibold uppercase">{selectedItem ?? "Menu"}</h1>
      {selectedItem !== "Reconhecimento Facial" && selectedItem !== "Solicitação de Serviços" && <Bell size={19} strokeWidth={1.8} className="absolute bottom-5 right-5" aria-label="Notificações" />}
    </header>
    {!selectedItem ? <main className="px-[17px]">
      <div className="mb-9 mt-2 flex min-h-[82px] items-center gap-[17px]"><div className="relative shrink-0"><div className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full bg-[#e8e8e8] text-[#8c8c8c]">{card.fotoUrl && !imageError ? <img src={card.fotoUrl} alt="" onError={() => setImageError(true)} className="h-full w-full object-cover" /> : <UserRound size={32} />}</div><span className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border border-white bg-[#00577c]"><Pencil size={9} /></span></div><div><h2 className="text-[17px] font-semibold">{card.nome}</h2>{card.codigo && <p className="mt-1 text-sm text-[#85858e]">RA {card.codigo}</p>}</div></div>
      <div className="space-y-2">{menuItems.map(({ label, icon: Icon, disabled }) => <button key={label} type="button" disabled={disabled} onClick={() => choose(label)} className="flex min-h-[65px] w-full items-center gap-[15px] rounded-[9px] border border-white/[0.035] bg-[#141720] px-[18px] text-left disabled:text-[#85858e]"><Icon size={24} strokeWidth={1.7} className="shrink-0" /><span className="min-w-0 flex-1 text-[17px] font-semibold leading-tight">{label}</span><ChevronRight size={24} /></button>)}</div>
    </main> : categoryItems[selectedItem] ? <main className="space-y-2 px-[15px] pt-[15px]">{categoryItems[selectedItem].map(({ label, icon: Icon }) => <button key={label} type="button" onClick={unavailable} className="flex min-h-[55px] w-full items-center gap-3 rounded-lg border border-white/[0.05] bg-[#141720] px-4 text-left"><Icon size={21} className="shrink-0 text-[#80c7e6]" strokeWidth={1.7}/><span className="flex-1 text-[15px] font-semibold">{label}</span><ChevronRight size={21} className="text-[#80c7e6]" /></button>)}{notice && <p role="status" className="px-1 pt-3 text-sm text-[#a4aab5]">{notice}</p>}</main>
    : selectedItem === "Reconhecimento Facial" ? <main><section className="flex min-h-[500px] flex-col items-center justify-center px-5 py-10"><h2 className="mb-4 text-xl font-semibold">Cadastro Facial</h2><div className="w-full rounded-md border border-[#296277] bg-[#133441] p-4 text-[#c6edf4]"><h3 className="mb-2 font-bold">Instruções</h3><ul className="list-disc space-y-1 pl-6 text-sm"><li>🔊 Ligue e aumente o som para ouvir as instruções</li><li>👀 Abra bem os olhos e olhe para a câmera</li><li>💡 Fique em um local bem iluminado</li><li>🚫 Remova óculos, chapéu ou máscara</li></ul></div><label className="mt-6 flex items-center gap-2 text-sm"><input type="checkbox" role="switch" checked={voice} onChange={e => setVoice(e.target.checked)} className="peer sr-only" /><span aria-hidden="true" className="relative h-[18px] w-[34px] rounded-full bg-[#59616b] transition-colors peer-checked:bg-[#0d6efd] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-white after:absolute after:left-[2px] after:top-[2px] after:h-[14px] after:w-[14px] after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" /> Habilitar guia de voz</label><button type="button" onClick={unavailable} className="mt-5 rounded-lg bg-[#00527f] px-5 py-3 text-base">Iniciar Captura Facial</button>{notice && <p role="status" className="mt-3 text-center text-sm text-[#a4aab5]">{notice}</p>}</section><section className="border-t border-white/10 bg-[#141720] px-5 py-5 text-sm text-[#a4aab5]"><h3 className="mb-2 text-[#80c7e6]">Identificação facial para acesso à PUC</h3><p>Ao ativar o reconhecimento facial, sua identificação será utilizada exclusivamente para controle de acesso às dependências da PUC Minas, como portarias e áreas autorizadas.</p><p className="mt-3">Sua imagem não é armazenada como foto. Ela é convertida em um código digital seguro, usado apenas para confirmar sua identidade.</p></section></main>
    : selectedItem === "Solicitação de Serviços" ? <main className="flex flex-col items-center px-8 pt-16 text-center"><PackageOpen size={150} strokeWidth={0.9} className="mb-10 text-[#3b7890]"/><h2 className="text-lg font-bold">Nada por aqui!</h2><p className="mt-3 text-base text-[#a4aab5]">Comece abrindo um novo chamado.</p><button type="button" onClick={unavailable} className="mt-14 w-full rounded bg-[#00527f] px-4 py-3 font-semibold">ABRIR CHAMADO</button>{notice && <p role="status" className="mt-3 text-sm text-[#a4aab5]">{notice}</p>}</main>
    : <main className="px-5 pt-8 text-sm text-[#a4aab5]">Este serviço não está disponível no momento.</main>}
  </div>;
};
export default MenuPage;
