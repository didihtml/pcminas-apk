import React from "react";
import {
  Bell,
  CalendarDays,
  CreditCard,
  Landmark,
  Timer,
} from "lucide-react";
import type { AccessCard, AuthNavTab } from "../types";

interface AuthenticatedHomePageProps {
  card: AccessCard;
  onNavigate: (tab: AuthNavTab) => void;
}

const shortcuts: Array<{
  label: string;
  icon: React.ReactNode;
  destination?: AuthNavTab;
}> = [
  { label: "Grade de\nHorários", icon: <Timer size={27} strokeWidth={1.45} /> },
  {
    label: "Calendário\nLetivo",
    icon: <CalendarDays size={27} strokeWidth={1.45} />,
  },
  {
    label: "Boletos\nBancários",
    icon: <Landmark size={27} strokeWidth={1.45} />,
  },
  {
    label: "Credenciais\nde Acesso",
    icon: <CreditCard size={27} strokeWidth={1.45} />,
    destination: "credencial",
  },
];

const AuthenticatedHomePage: React.FC<AuthenticatedHomePageProps> = ({
  card,
  onNavigate,
}) => (
  <div className="min-h-[100dvh] bg-[#0D111D] pb-28 text-white">
    <header
      className="relative flex h-[265px] flex-col items-center px-5 pt-11 text-white"
      style={{
        background:
          "linear-gradient(145deg, #11479F 0%, #185FC0 55%, #236BC5 100%)",
      }}
    >
      <button
        type="button"
        className="absolute right-5 top-12 rounded-full p-2 text-white"
        aria-label="Notificações"
      >
        <Bell size={22} strokeWidth={1.8} />
      </button>

      <img
        src="/logo-puc-white.png"
        alt="PUC Minas"
        className="h-[112px] w-[112px] object-contain"
      />
      <p className="mt-1 max-w-[260px] truncate text-sm font-medium text-white/85">
        Olá, {card.nome.split(" ")[0]}
      </p>

      <div className="absolute -bottom-[166px] left-4 right-4 grid grid-cols-2 overflow-hidden rounded-[18px] bg-[#172037] shadow-[0_8px_28px_rgba(0,0,0,0.35)]">
        {shortcuts.map((shortcut, index) => (
          <button
            key={shortcut.label}
            type="button"
            onClick={() =>
              shortcut.destination && onNavigate(shortcut.destination)
            }
            className="flex h-[166px] flex-col items-center justify-center gap-4 bg-[#172037] px-4 text-center text-white"
            style={{
              borderRight: index % 2 === 0 ? "1px solid rgba(255,255,255,0.08)" : undefined,
              borderBottom: index < 2 ? "1px solid rgba(255,255,255,0.08)" : undefined,
            }}
          >
            <span className="text-[#B7C7E8]">{shortcut.icon}</span>
            <span className="whitespace-pre-line text-[17px] font-medium leading-5">
              {shortcut.label}
            </span>
          </button>
        ))}
      </div>
    </header>

    <main className="px-5 pt-[190px]">
      <h1 className="mb-8 text-[22px] font-semibold tracking-wide text-white">
        NOTÍCIAS
      </h1>

      <article>
        <time className="text-[15px] text-white/50">27/02/2026</time>
        <h2 className="mt-3 text-[17px] font-medium leading-6 text-[#A9C8FF]">
          Formaturas PUC Minas - Cadastro Comissão | Representantes
        </h2>
      </article>

      <button
        type="button"
        className="mt-10 w-full rounded-xl py-4 text-base font-semibold text-white shadow-sm"
        style={{ background: "#1B5DB5" }}
      >
        Ver mais
      </button>
    </main>
  </div>
);

export default AuthenticatedHomePage;
