import React from "react";
import { ClipboardCheck, GraduationCap, Grid3X3 } from "lucide-react";
import type { AuthNavTab } from "../../types";

const HomeIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 10.2 12 3l8.5 7.2v9.3H3.5z"/><path d="M8 16.5h8"/></svg>;
const CredentialIcon = () => <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3.5" width="20" height="15" rx="2"/><path d="M2 7.5h20M8.5 18.5v-1a3.5 3.5 0 0 1 7 0v1"/><circle cx="12" cy="12.5" r="2"/></svg>;

interface AuthenticatedBottomNavigationProps { activeTab: AuthNavTab; onTabChange: (tab: AuthNavTab) => void; }
const items: { id: AuthNavTab; label: string; icon: React.ReactNode }[] = [
  { id: "inicio", label: "Início", icon: <HomeIcon /> },
  { id: "disciplinas", label: "Disciplinas", icon: <ClipboardCheck size={17} strokeWidth={1.5} /> },
  { id: "credencial", label: "Credencial", icon: <CredentialIcon /> },
  { id: "avaliacoes", label: "Acadêmico", icon: <GraduationCap size={18} strokeWidth={1.5} /> },
  { id: "menu", label: "Menu", icon: <Grid3X3 size={17} strokeWidth={2} /> },
];

const AuthenticatedBottomNavigation: React.FC<AuthenticatedBottomNavigationProps> = ({ activeTab, onTabChange }) => (
  <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 rounded-t-[15px] border-t border-white/[0.025] bg-[#0d111b]" aria-label="Navegação do perfil">
    <div className="grid h-[77px] grid-cols-5 pb-[env(safe-area-inset-bottom)]">
      {items.map(({ id, label, icon }) => id === "credencial" ? (
        <button key={id} type="button" onClick={() => onTabChange(id)} aria-label="Abrir credencial de acesso" aria-current={activeTab === id ? "page" : undefined} className="relative flex justify-center">
          <span className="absolute -top-[23px] flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#00527f] shadow-[0_2px_8px_rgba(0,0,0,0.16)]">{icon}</span>
        </button>
      ) : (
        <button key={id} type="button" onClick={() => onTabChange(id)} aria-current={activeTab === id ? "page" : undefined} className={`relative flex flex-col items-center pt-[14px] ${activeTab === id ? "text-white" : "text-[#59616b]"}`}>
          {activeTab === id && <span className="absolute top-0 h-[3px] w-[34px] rounded-full bg-white" />}
          {icon}<span className={`mt-[4px] text-[10px] leading-none ${activeTab === id ? "font-semibold" : "font-normal"}`}>{label}</span>
        </button>
      ))}
    </div>
  </nav>
);
export default AuthenticatedBottomNavigation;
