import React, { useState, useRef } from "react";
import BottomNavigation from "./components/layout/BottomNavigation";
import AuthenticatedBottomNavigation from "./components/layout/AuthenticatedBottomNavigation";
import SGASheet from "./components/portal/SGASheet";
import HomePage from "./pages/HomePage";
import AuthenticatedHomePage from "./pages/AuthenticatedHomePage";
import MenuPage from "./pages/MenuPage";
import AccessCredentialsPage from "./pages/AccessCredentialsPage";
import DisciplinesPage from "./pages/DisciplinesPage";
import AcademicPage from "./pages/AcademicPage";
import APucPage from "./pages/APucPage";
import CampiPage from "./pages/CampiPage";
import IngressarPage from "./pages/IngressarPage";
import LoginPage from "./pages/LoginPage";
import CarteirinhaPage from "./pages/CarteirinhaPage";
import MissaoValoresPage from "./pages/MissaoValoresPage";
import ValidacaoPage from "./pages/ValidacaoPage";
import type {
  AccessCard,
  AuthNavTab,
  LoginProfile,
  NavTab,
} from "./types";

const TAB_ORDER: NavTab[] = ["inicio", "ingressar", "campi", "a-puc"];

function getTabIndex(tab: NavTab): number {
  return TAB_ORDER.indexOf(tab);
}

const slideStyles = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideInLeft {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  .page-enter-right {
    animation: slideInRight 0.3s ease forwards;
  }
  .page-enter-left {
    animation: slideInLeft 0.3s ease forwards;
  }
`;

function getValidacaoId(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("validacao");
}

const App: React.FC = () => {
  const validacaoId = getValidacaoId();
  const [showWelcomeNotice, setShowWelcomeNotice] = useState(!validacaoId);
  const [activeTab, setActiveTab] = useState<NavTab>("inicio");
  const [sgaOpen, setSgaOpen] = useState(false);
  const [loginProfile, setLoginProfile] = useState<LoginProfile | null>(null);
  const [authenticatedCard, setAuthenticatedCard] = useState<AccessCard | null>(
    null,
  );
  const [authenticatedTab, setAuthenticatedTab] =
    useState<AuthNavTab>("credencial");
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null,
  );
  const [showMissaoValores, setShowMissaoValores] = useState(false);
  const [showAccessCredentials, setShowAccessCredentials] = useState(false);
  const prevTabRef = useRef<NavTab>("inicio");

  const openMissaoValores = () => setShowMissaoValores(true);
  const closeMissaoValores = () => setShowMissaoValores(false);

  const handleTabChange = (tab: NavTab) => {
    if (tab === "portal") {
      setSgaOpen(true);
      return;
    }
    // Se estiver na tela de login e clicar em outra aba, sai do login
    if (loginProfile) {
      setLoginProfile(null);
    }
    const prevIdx = getTabIndex(prevTabRef.current);
    const nextIdx = getTabIndex(tab);
    if (prevIdx !== -1 && nextIdx !== -1) {
      setSlideDirection(nextIdx > prevIdx ? "right" : "left");
    } else {
      setSlideDirection(null);
    }
    prevTabRef.current = tab;
    setActiveTab(tab);
  };

  const handleSelectProfile = (profile: LoginProfile) => {
    setSgaOpen(false);
    setLoginProfile(profile);
  };

  const handleLoginSuccess = (card: AccessCard) => {
    setAuthenticatedCard(card);
    setAuthenticatedTab("credencial");
  };

  const renderPage = () => {
    if (authenticatedCard) {
      if (showAccessCredentials) return <AccessCredentialsPage card={authenticatedCard} onBack={() => setShowAccessCredentials(false)} />;
      switch (authenticatedTab) {
        case "inicio":
          return (
            <AuthenticatedHomePage
              card={authenticatedCard}
              onNavigate={setAuthenticatedTab}
              onOpenAccessCredentials={() => setShowAccessCredentials(true)}
            />
          );
        case "credencial":
          return <CarteirinhaPage card={authenticatedCard} />;
        case "disciplinas":
          return <DisciplinesPage card={authenticatedCard} />;
        case "avaliacoes":
          return <AcademicPage />;
        case "menu":
          return <MenuPage card={authenticatedCard} onOpenAccessCredentials={() => setShowAccessCredentials(true)} onLogout={() => { setAuthenticatedCard(null); setLoginProfile(null); setShowAccessCredentials(false); setActiveTab("inicio"); }} />;
      }
    }

    if (loginProfile) {
      return (
        <LoginPage
          profile={loginProfile}
          onBack={() => setLoginProfile(null)}
          onSuccess={handleLoginSuccess}
        />
      );
    }

    if (validacaoId) {
      return (
        <div className="pb-0">
          <ValidacaoPage cardId={validacaoId} />
        </div>
      );
    }

    if (showMissaoValores) {
      return <MissaoValoresPage onBack={closeMissaoValores} />;
    }

    const goHome = () => setActiveTab("inicio");

    switch (activeTab) {
      case "inicio":
        return <HomePage />;
      case "ingressar":
        return <IngressarPage onBack={goHome} />;
      case "campi":
        return <CampiPage onBack={goHome} />;
      case "a-puc":
        return <APucPage onBack={goHome} onMissaoValores={openMissaoValores} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--bg-main)" }}
    >
      <style>{slideStyles}</style>
      <div
        key={
          activeTab +
          (loginProfile ? "-login" : "") +
          (authenticatedCard ? `-${authenticatedTab}` : "")
        }
        className={slideDirection ? `page-enter-${slideDirection}` : undefined}
      >
        {renderPage()}
      </div>
      {!authenticatedCard && !validacaoId && (
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      {authenticatedCard && !validacaoId && (
        <AuthenticatedBottomNavigation
          activeTab={authenticatedTab}
          onTabChange={(tab) => { setShowAccessCredentials(false); setAuthenticatedTab(tab); }}
        />
      )}
      {sgaOpen && (
        <SGASheet
          onClose={() => setSgaOpen(false)}
          onSelectProfile={handleSelectProfile}
        />
      )}
      {showWelcomeNotice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3" role="dialog" aria-modal="true" aria-label="Aviso de avaliação institucional">
          <div className="flex max-h-[calc(100dvh-24px)] w-full max-w-[320px] flex-col gap-3 rounded-2xl bg-[#141720] p-3">
            <img
              src="/aviso-avaliacao.png?v=2"
              alt="Sua voz ajuda a construir o futuro da PUC Minas. Chegou a hora de avaliar os professores, coordenadores e membros de colegiado. Acesse o SGA, o PUC Mobile ou o Canvas e participe. Alunos dos demais cursos: 5/10 a 13/11. Alunos do curso de Medicina e professores: 5/10 a 18/12."
              className="min-h-0 w-full flex-1 rounded-xl object-contain"
            />
            <button type="button" autoFocus onClick={() => setShowWelcomeNotice(false)} className="min-h-11 w-full shrink-0 rounded-[10px] bg-[#00527f] px-4 py-3 text-sm font-semibold text-white">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;





