import React from "react";
import {
  BookOpen,
  ClipboardCheck,
  CreditCard,
  Grid3X3,
} from "lucide-react";
import type { AuthNavTab } from "../../types";

const IconHome = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M15 18H9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

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
    { id: "inicio", label: "Início", icon: <IconHome /> },
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
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 bg-[#0D111D]"
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
              style={{ color: isActive ? "#FFFFFF" : "#687184" }}
            >
              {isActive && (
                <span
                  className="absolute -top-3 h-0.5 w-10 rounded-full"
                  style={{ background: "#FFFFFF" }}
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
