import React, { useState, useEffect, useRef } from "react";
import BottomNavigation from "./components/layout/BottomNavigation";
import SGASheet from "./components/portal/SGASheet";
import HomePage from "./pages/HomePage";
import APucPage from "./pages/APucPage";
import CampiPage from "./pages/CampiPage";
import IngressarPage from "./pages/IngressarPage";
import LoginPage from "./pages/LoginPage";
import CarteirinhaPage from "./pages/CarteirinhaPage";
import MissaoValoresPage from "./pages/MissaoValoresPage";
import ValidacaoPage from "./pages/ValidacaoPage";
import type { AccessCard, LoginProfile, NavTab } from "./types";

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

const SplashScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setFading(true), 1800);
    const hide = setTimeout(onDone, 2300);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0D111D",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      <img
        src="/logo-puc-white.png"
        alt="PUC Minas"
        style={{ width: "150px" }}
      />
    </div>
  );
};

const CheckingUpdates: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setFading(true), 2500);
    const hide = setTimeout(onDone, 3100);
    return () => {
      clearTimeout(fade);
      clearTimeout(hide);
    };
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "32px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          minWidth: "260px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          style={{ animation: "spin 0.9s linear infinite" }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <circle
              key={i}
              cx={20 + 13 * Math.cos(((i * 45 - 90) * Math.PI) / 180)}
              cy={20 + 13 * Math.sin(((i * 45 - 90) * Math.PI) / 180)}
              r={i < 2 ? 3.5 : i < 4 ? 2.8 : i < 6 ? 2.2 : 1.6}
              fill={`rgba(52, 120, 160, ${1 - i * 0.1})`}
            />
          ))}
        </svg>

        <p
          style={{
            margin: 0,
            fontSize: "17px",
            fontWeight: 700,
            color: "#1a1a2e",
            textAlign: "center",
          }}
        >
          Verificando atualizações...
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#888",
            textAlign: "center",
          }}
        >
          Por favor, aguarde...
        </p>
      </div>
    </div>
  );
};

function getValidacaoId(): string | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("validacao");
}

const App: React.FC = () => {
  const validacaoId = getValidacaoId();
  const [splash, setSplash] = useState(!validacaoId);
  const [checking, setChecking] = useState(false);
  const alreadyChecked =
    typeof sessionStorage !== "undefined" && !!sessionStorage.getItem("uc");
  const [activeTab, setActiveTab] = useState<NavTab>("inicio");
  const [sgaOpen, setSgaOpen] = useState(false);
  const [loginProfile, setLoginProfile] = useState<LoginProfile | null>(null);
  const [showCarteirinha, setShowCarteirinha] = useState(false);
  const [authenticatedCard, setAuthenticatedCard] = useState<AccessCard | null>(
    null,
  );
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null,
  );
  const [showMissaoValores, setShowMissaoValores] = useState(false);
  const prevTabRef = useRef<NavTab>("inicio");

  const resetPortalState = () => {
    setShowCarteirinha(false);
    setLoginProfile(null);
    setAuthenticatedCard(null);
  };

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
    setShowCarteirinha(true);
  };

  const renderPage = () => {
    if (showCarteirinha && authenticatedCard) {
      return <CarteirinhaPage card={authenticatedCard} />;
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
      {splash && (
        <SplashScreen
          onDone={() => {
            setSplash(false);
            if (!alreadyChecked) {
              sessionStorage.setItem("uc", "1");
              setChecking(true);
            }
          }}
        />
      )}
      {checking && <CheckingUpdates onDone={() => setChecking(false)} />}
      <div
        key={
          activeTab +
          (loginProfile ? "-login" : "") +
          (showCarteirinha ? "-card" : "")
        }
        className={slideDirection ? `page-enter-${slideDirection}` : undefined}
      >
        {renderPage()}
      </div>
      {!showCarteirinha && !validacaoId && (
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      {showCarteirinha && (
        <BottomNavigation
          activeTab={"portal" as NavTab}
          onTabChange={(tab) => {
            if (tab !== "portal") {
              resetPortalState();
              setActiveTab(tab);
            }
          }}
        />
      )}
      {sgaOpen && (
        <SGASheet
          onClose={() => setSgaOpen(false)}
          onSelectProfile={handleSelectProfile}
        />
      )}
    </div>
  );
};

export default App;
