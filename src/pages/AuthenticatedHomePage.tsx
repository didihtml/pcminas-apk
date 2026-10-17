import React from "react";
import {
  Bell,
  CalendarDays,
  Landmark,
  Timer,
} from "lucide-react";
import type { AccessCard, AuthNavTab } from "../types";

interface AuthenticatedHomePageProps {
  card: AccessCard;
  onNavigate: (tab: AuthNavTab) => void;
}

const AccessCredentialIcon = () => (
  <svg
    width="27"
    height="27"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7 12H12V17M3.01 12H3M8.01 17H8M12.01 21H12M21.01 12H21M3 17H4.5M15.5 12H17.5M3 21H8M12 2V8M17.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7951 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V17.6C21 17.0399 21 16.7599 20.891 16.546C20.7951 16.3578 20.6422 16.2049 20.454 16.109C20.2401 16 19.9601 16 19.4 16H17.6C17.0399 16 16.7599 16 16.546 16.109C16.3578 16.2049 16.2049 16.3578 16.109 16.546C16 16.7599 16 16.7599 16 17.6V19.4C16 19.9601 16 20.2401 16.109 20.454C16.2049 20.6422 16.3578 20.7951 16.546 20.891C16.7599 21 17.0399 21 17.6 21ZM17.6 8H19.4C19.9601 8 20.2401 8 20.454 7.89101C20.6422 7.79513 20.7951 7.64215 20.891 7.45399C21 7.24008 21 6.96005 21 6.4V4.6C21 4.03995 21 3.75992 20.891 3.54601C20.7951 3.35785 20.6422 3.20487 20.454 3.10899C20.2401 3 19.9601 3 19.4 3H17.6C17.0399 3 16.7599 3 16.546 3.10899C16.3578 3.20487 16.2049 3.35785 16.109 3.54601C16 3.75992 16 4.03995 16 4.6V6.4C16 6.96005 16 7.24008 16.109 7.45399C16.2049 7.64215 16.3578 7.79513 16.546 7.89101C16.7599 8 17.0399 8 17.6 8ZM4.6 8H6.4C6.96005 8 7.24008 8 7.45399 7.89101C7.64215 7.79513 7.79513 7.64215 7.89101 7.45399C8 7.24008 8 6.96005 8 6.4V4.6C8 4.03995 8 3.75992 7.89101 3.54601C7.79513 3.35785 7.64215 3.20487 7.45399 3.10899C7.24008 3 6.96005 3 6.4 3H4.6C4.03995 3 3.75992 3 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3 3.75992 3 4.03995 3 4.6V6.4C3 6.96005 3 7.24008 3.10899 7.45399C3.20487 7.64215 3.35785 7.79513 3.54601 7.89101C3.75992 8 3.96005 8 4.6 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
    icon: <AccessCredentialIcon />,
    destination: "credencial",
  },
];

const AuthenticatedHomePage: React.FC<AuthenticatedHomePageProps> = ({
  card,
  onNavigate,
}) => (
  <div className="min-h-[100dvh] bg-[#0D111D] pb-28 text-white">
    <header
      className="relative flex h-[300px] flex-col items-center px-5 pt-[max(42px,env(safe-area-inset-top))] text-white"
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
        src="/logo-splash.png"
        alt={`PUC Minas - ${card.nome}`}
        className="h-[122px] w-[122px] object-contain"
      />

    </header>

    {/*
      O bloco fica fora do header. O header reserva toda a altura do logo;
      somente o container completo é sobreposto à borda azul, nunca os cards
      individualmente sobre o logo.
    */}
    <section className="relative z-10 -mt-[72px] px-4">
      <div className="grid grid-cols-2 overflow-hidden rounded-[18px] bg-[#172037] shadow-[0_8px_28px_rgba(0,0,0,0.35)]">
        {shortcuts.map((shortcut, index) => (
          <button
            key={shortcut.label}
            type="button"
            onClick={() =>
              shortcut.destination && onNavigate(shortcut.destination)
            }
            className="flex h-[142px] flex-col items-center justify-center gap-3 bg-[#172037] px-4 text-center text-white"
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
    </section>

    <main className="px-5 pt-7">
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
