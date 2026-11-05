import React, { useState } from "react";
import {
  ArrowLeft, Banknote, Bell, Book, BriefcaseBusiness, ChevronRight,
  ClipboardCheck, Laptop, LifeBuoy, Pencil, QrCode, ScanFace, UserRound,
} from "lucide-react";
import type { AccessCard } from "../types";

interface MenuPageProps {
  card: AccessCard;
  onOpenAccessCredentials: () => void;
}

const menuItems = [
  { label: "Reconhecimento Facial", icon: ScanFace },
  { label: "Credenciais de acesso", icon: QrCode },
  { label: "Financeiro", icon: Banknote },
  { label: "Bolsas", icon: Book },
  { label: "Solicitação de Serviços", icon: Laptop },
  { label: "Central de ajuda", icon: LifeBuoy },
  { label: "PUC Carreiras", icon: BriefcaseBusiness, disabled: true },
  { label: "Avaliações Institucionais - CPA", icon: ClipboardCheck },
];

const MenuPage: React.FC<MenuPageProps> = ({ card, onOpenAccessCredentials }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-[#0d1019] pb-32 text-white">
      <header className="relative flex h-[118px] items-end justify-center bg-[#171b31] pb-6 pt-[env(safe-area-inset-top)]">
        {selectedItem && (
          <button type="button" onClick={() => setSelectedItem(null)} className="absolute bottom-5 left-5 rounded-full p-1" aria-label="Voltar para Menu">
            <ArrowLeft size={22} />
          </button>
        )}
        <h1 className="text-[16px] font-semibold">MENU</h1>
        <Bell size={21} strokeWidth={1.8} className="absolute bottom-6 right-6" aria-label="Notificações" />
      </header>

      {selectedItem ? (
        <main className="px-[18px] pt-7">
          <h2 className="text-lg font-semibold">{selectedItem}</h2>
          <p className="mt-4 text-sm text-white/50">Esta área está em desenvolvimento.</p>
        </main>
      ) : (
        <main className="px-[17px]">
          <div className="mb-9 mt-2 flex min-h-[82px] items-center gap-[17px]">
            <div className="relative shrink-0">
              <div className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full bg-[#e8e8e8] text-[#8c8c8c]">
                {card.fotoUrl && !imageError ? (
                  <img src={card.fotoUrl} alt="" onError={() => setImageError(true)} className="h-full w-full object-cover" />
                ) : <UserRound size={32} strokeWidth={1.5} aria-hidden="true" />}
              </div>
              <span className="absolute bottom-0 right-0 flex h-[16px] w-[16px] items-center justify-center rounded-full border border-white bg-[#00577c]" aria-hidden="true">
                <Pencil size={9} />
              </span>
            </div>
            <div className="min-w-0">
              <h2 className="text-[17px] font-semibold leading-tight">{card.nome}</h2>
              {card.codigo && <p className="mt-1 text-[14px] text-[#85858e]">RA {card.codigo}</p>}
            </div>
          </div>

          <div className="space-y-2">
            {menuItems.map(({ label, icon: Icon, disabled }) => (
              <button
                key={label}
                type="button"
                disabled={disabled}
                onClick={() => label === "Credenciais de acesso" ? onOpenAccessCredentials() : setSelectedItem(label)}
                className="flex min-h-[65px] w-full items-center gap-[15px] rounded-[9px] border border-white/[0.035] bg-[#141720] px-[18px] text-left shadow-[0_1px_4px_rgba(0,0,0,0.15)] disabled:text-[#85858e]"
              >
                <Icon size={24} strokeWidth={1.7} className="shrink-0" aria-hidden="true" />
                <span className="min-w-0 flex-1 text-[17px] font-semibold leading-tight">{label}</span>
                <ChevronRight size={24} strokeWidth={1.8} className="shrink-0" aria-hidden="true" />
              </button>
            ))}
          </div>
        </main>
      )}
    </div>
  );
};

export default MenuPage;

