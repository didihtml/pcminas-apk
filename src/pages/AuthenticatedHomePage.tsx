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
  <div className="min-h-[100dvh] bg-white pb-28 text-[#172037]">
    <header
      className="relative flex h-[265px] flex-col items-center px-5 pt-11 text-white"
      style={{
        background: "#1E5FA8",
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

      <div className="absolute -bottom-[166px] left-4 right-4 grid grid-cols-2 overflow-hidden rounded-[18px] bg-white shadow-[0_8px_28px_rgba(15,46,91,0.13)]">
        {shortcuts.map((shortcut, index) => (
          <button
            key={shortcut.label}
            type="button"
            onClick={() =>
              shortcut.destination && onNavigate(shortcut.destination)
            }
            className="flex h-[166px] flex-col items-center justify-center gap-4 bg-white px-4 text-center text-[#333747]"
            style={{
              borderRight: index % 2 === 0 ? "1px solid #ECEEF2" : undefined,
              borderBottom: index < 2 ? "1px solid #ECEEF2" : undefined,
            }}
          >
            <span className="text-[#4C5264]">{shortcut.icon}</span>
            <span className="whitespace-pre-line text-[17px] font-medium leading-5">
              {shortcut.label}
            </span>
          </button>
        ))}
      </div>
    </header>

    <main className="px-5 pt-[190px]">
      <h1 className="mb-8 text-[22px] font-semibold tracking-wide text-[#30323A]">
        NOTÍCIAS
      </h1>

      <article>
        <time className="text-[15px] text-[#888B93]">27/02/2026</time>
        <h2 className="mt-3 text-[17px] font-medium leading-6 text-[#304981]">
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
