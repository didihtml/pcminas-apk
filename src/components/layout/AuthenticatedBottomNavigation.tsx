import React from "react";
import type { AuthNavTab } from "../../types";

const HomeIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 10.4a2 2 0 0 1 .7-1.5l6.5-5.5a2 2 0 0 1 2.6 0l6.5 5.5a2 2 0 0 1 .7 1.5v8.1a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-8.1Z"/><path d="M8.5 16.5h7"/></svg>;
const CredentialIcon = () => <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3.5" width="20" height="15" rx="2"/><path d="M2 7.5h20M8.5 18.5v-1a3.5 3.5 0 0 1 7 0v1"/><circle cx="12" cy="12.5" r="2"/></svg>;
const MenuIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{[5, 12, 19].flatMap(y => [5, 12, 19].map(x => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" />))}</svg>;
const AcademicIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m2.5 9 9.5-4.5L21.5 9 12 13.5 2.5 9Z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M21.5 9v6"/></svg>;
const DisciplinesIcon = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 21H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8"/><path d="M8 7h7M8 11h7M8 15h3M14 18l2.5 2.5L21 16"/></svg>;

interface AuthenticatedBottomNavigationProps { activeTab: AuthNavTab; onTabChange: (tab: AuthNavTab) => void; }
const items: { id: AuthNavTab; label: string; icon: React.ReactNode }[] = [
  { id: "inicio", label: "Início", icon: <HomeIcon /> },
  { id: "disciplinas", label: "Disciplinas", icon: <DisciplinesIcon /> },
  { id: "credencial", label: "Credencial", icon: <CredentialIcon /> },
  { id: "avaliacoes", label: "Acadêmico", icon: <AcademicIcon /> },
  { id: "menu", label: "Menu", icon: <MenuIcon /> },
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
