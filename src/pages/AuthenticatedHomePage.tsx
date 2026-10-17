import React from "react";
import {
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

const NotificationIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 16 16"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="m13.58 11.6-1.33-2.18V6.33A4.36 4.36 0 0 0 10 2.26a2.45 2.45 0 0 0 0-.38A1.94 1.94 0 0 0 8 0a1.94 1.94 0 0 0-2 1.88 1.64 1.64 0 0 0 0 .38 4.36 4.36 0 0 0-2.25 4.07v3.09L2.42 11.6a1.25 1.25 0 0 0 1.06 1.9h1.77A2.68 2.68 0 0 0 8 16a2.68 2.68 0 0 0 2.75-2.5h1.77a1.25 1.25 0 0 0 1.06-1.9zM7.25 1.88A.7.7 0 0 1 8 1.25a.7.7 0 0 1 .75.63 6 6 0 0 0-.75 0 5.9 5.9 0 0 0-.75 0zM8 14.75a1.44 1.44 0 0 1-1.5-1.25h3A1.44 1.44 0 0 1 8 14.75zm-4.52-2.5 1.34-2.17.18-.31V6.33a4 4 0 0 1 .6-2.12A2.68 2.68 0 0 1 8 3.12a2.68 2.68 0 0 1 2.4 1.09 4 4 0 0 1 .6 2.12v3.44l.18.31 1.34 2.17z" />
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
  <div className="flex min-h-[100dvh] flex-col bg-[#0D111D] pb-28 text-white">
    <header
      className="relative flex h-[280px] flex-col items-center rounded-b-[28px] px-5 pt-[max(42px,env(safe-area-inset-top))] text-white"
      style={{
        background: "#1E5FA8",
      }}
    >
      <button
        type="button"
        className="absolute right-5 top-12 rounded-full p-2 text-white"
        aria-label="Notificações"
      >
        <NotificationIcon />
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
    <section className="relative z-10 -mt-[72px] px-3">
      <div className="grid grid-cols-2 gap-3">
        {shortcuts.map((shortcut) => (
          <button
            key={shortcut.label}
            type="button"
            onClick={() =>
              shortcut.destination && onNavigate(shortcut.destination)
            }
            className="flex h-[124px] flex-col items-center justify-center gap-3 rounded-[18px] bg-[#172037] px-4 text-center text-white shadow-[0_8px_28px_rgba(0,0,0,0.35)]"
          >
            <span className="text-[#B7C7E8]">{shortcut.icon}</span>
            <span className="whitespace-pre-line text-[17px] font-medium leading-5">
              {shortcut.label}
            </span>
          </button>
        ))}
      </div>
    </section>

    <main className="flex flex-1 flex-col px-5 pt-[63px]">
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

      <div className="flex-1" aria-hidden="true" />
    </main>
  </div>
);

export default AuthenticatedHomePage;
