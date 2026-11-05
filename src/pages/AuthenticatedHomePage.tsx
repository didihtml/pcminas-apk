import React, { useState } from "react";
import { AlarmClock, Bell, QrCode } from "lucide-react";
import type { AccessCard, AuthNavTab } from "../types";

interface AuthenticatedHomePageProps {
  card: AccessCard;
  onNavigate: (tab: AuthNavTab) => void;
  onOpenAccessCredentials: () => void;
}

const AcademicCalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v5M7 2v4M16 2v4M3 9h17" />
    <path d="m15 15.3 3.5-1.7 3.5 1.7-3.5 1.7-3.5-1.7ZM16.4 16.1v2.1c1.2 1 3 1 4.2 0v-2.1M22 15.3v2.4" />
  </svg>
);

const BankSlipIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8.5V7a2 2 0 0 1 1.4-1.9L16 2v5M5 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
    <circle cx="17" cy="13.5" r=".7" fill="currentColor" stroke="none" />
  </svg>
);
const shortcuts: Array<{
  label: string;
  icon: React.ReactNode;
  destination: AuthNavTab;
}> = [
  { label: "Grade de\nHorários", icon: <AlarmClock size={20} strokeWidth={1.6} />, destination: "avaliacoes" },
  { label: "Calendário\nLetivo", icon: <AcademicCalendarIcon />, destination: "avaliacoes" },
  { label: "Boletos\nBancários", icon: <BankSlipIcon />, destination: "menu" },
  { label: "Credenciais\nde Acesso", icon: <QrCode size={21} strokeWidth={1.6} />, destination: "credencial" },
];

const AuthenticatedHomePage: React.FC<AuthenticatedHomePageProps> = ({ card, onNavigate, onOpenAccessCredentials }) => {
  const [showNewsMessage, setShowNewsMessage] = useState(false);
  return (
  <div className="flex min-h-[100dvh] flex-col bg-[#0d1019] pb-28 text-white">
    <header className="relative flex h-[220px] flex-col items-center rounded-b-[18px] bg-[#171b31] px-5 pt-[max(48px,env(safe-area-inset-top))]">
      <Bell size={19} strokeWidth={1.8} className="absolute right-5 top-12" aria-label="Notificações" />
      <img src="/logo-splash.png" alt={`PUC Minas - ${card.nome}`} className="h-[105px] w-[105px] object-contain" />
    </header>

    <section className="relative z-10 -mt-[54px] px-[10px]" aria-label="Atalhos">
      <div className="grid grid-cols-2 gap-[10px]">
        {shortcuts.map((shortcut) => (
          <button
            key={shortcut.label}
            type="button"
            onClick={() => shortcut.destination === "credencial" ? onOpenAccessCredentials() : onNavigate(shortcut.destination)}
            className="flex h-[91px] flex-col items-center justify-center gap-3 rounded-[11px] border border-white/[0.025] bg-[#141720] px-3 text-center text-white"
          >
            {shortcut.icon}
            <span className="whitespace-pre-line text-[14px] font-semibold leading-4">{shortcut.label}</span>
          </button>
        ))}
      </div>
    </section>

    <main className="px-[14px] pt-[30px]">
      <h1 className="mb-[14px] text-[16px] font-bold">NOTÍCIAS</h1>
      <article className="rounded-[10px] border border-white/[0.025] bg-[#141720] px-[15px] py-[14px]">
        <time className="text-[14px] text-[#85858e]" dateTime="2026-10-02">02/10/2026</time>
        <h2 className="mt-1.5 text-[14px] font-semibold leading-[17px]">Você foi inscrito(a) como ingressante para o ENADE 2026</h2>
      </article>
      <button type="button" onClick={() => setShowNewsMessage(true)} className="mt-[11px] w-full rounded-[10px] bg-[#00527f] py-[14px] text-[13px] font-semibold text-white">
        Ver mais
      </button>
      {showNewsMessage && <p className="mt-3 text-sm text-white/50" role="status">Não há outras notícias disponíveis.</p>}
    </main>
  </div>
  );
};

export default AuthenticatedHomePage;



