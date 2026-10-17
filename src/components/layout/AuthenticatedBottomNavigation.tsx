import React from "react";
import {
  BookOpen,
  ClipboardCheck,
  CreditCard,
  Grid3X3,
  House,
} from "lucide-react";
import type { AuthNavTab } from "../../types";

interface AuthenticatedBottomNavigationProps {
  activeTab: AuthNavTab;
  onTabChange: (tab: AuthNavTab) => void;
}

const AuthenticatedBottomNavigation: React.FC<
  AuthenticatedBottomNavigationProps
> = ({ activeTab, onTabChange }) => {
  const items: Array<{
    id: AuthNavTab;
    label: string;
    icon: React.ReactNode;
    center?: boolean;
  }> = [
    { id: "inicio", label: "Início", icon: <House size={21} /> },
    {
      id: "disciplinas",
      label: "Disciplinas",
      icon: <BookOpen size={21} />,
    },
    {
      id: "credencial",
      label: "Credencial",
      icon: <CreditCard size={27} />,
      center: true,
    },
    {
      id: "avaliacoes",
      label: "Avaliações",
      icon: <ClipboardCheck size={21} />,
    },
    { id: "menu", label: "Menu", icon: <Grid3X3 size={21} /> },
  ];

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-white/10 bg-[#0D111D] shadow-[0_-5px_18px_rgba(0,0,0,0.35)]"
      aria-label="Navegação do perfil"
    >
      <div className="relative flex items-end justify-around px-1 pb-[max(18px,env(safe-area-inset-bottom))] pt-3">
        {items.map((item) => {
          const isActive = activeTab === item.id;

          if (item.center) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className="relative -mt-9 flex min-w-[66px] flex-col items-center"
                aria-label="Abrir credencial de acesso"
              >
              <span
                  className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg shadow-black/40"
                  style={{ background: "#1762B7" }}
                >
                  {item.icon}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className="relative flex min-w-[62px] flex-col items-center gap-1.5"
              style={{ color: isActive ? "#63A4FF" : "#687184" }}
            >
              {isActive && (
                <span
                  className="absolute -top-3 h-0.5 w-10 rounded-full"
                  style={{ background: "#1762B7" }}
                />
              )}
              {item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default AuthenticatedBottomNavigation;
