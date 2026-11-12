import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff, ChevronDown, X } from "lucide-react";
import { SGALogo } from "../components/portal/icons";
import type { AccessCard, LoginProfile } from "../types";
import PaymentPage from "./PaymentPage";

interface LoginPageProps {
  profile: LoginProfile;
  onBack: () => void;
  onSuccess: (card: AccessCard) => void;
}

interface LoginResponse {
  card: AccessCard;
}

const getApiBaseUrls = () => {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredUrl) {
    return [configuredUrl.replace(/\/$/, "")];
  }

  return ["", "http://localhost:3001"];
};

const API_BASE_URLS = getApiBaseUrls();

const ORIGENS = [
  "Graduação",
  "IEC",
  "Especialização Poços de Caldas",
  "Ensino a Distância",
  "Oficina de Teatro",
  "Faculdade de Odontologia",
  "IFTDJ",
  "Stricto Sensu",
];

const LoginPage: React.FC<LoginPageProps> = ({
  profile,
  onBack,
  onSuccess,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [manterId, setManterId] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [origem, setOrigem] = useState("");
  const [showOrigem, setShowOrigem] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentApi, setPaymentApi] = useState<string | null>(null);

  const isAluno = profile === "aluno";

  const handleAcessar = async () => {
    if (!usuario.trim()) {
      setError("Informe o código ou CPF cadastrado na tabela cards.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let lastError: unknown = null;

      for (const apiBaseUrl of API_BASE_URLS) {
        try {
          const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              usuario,
              senha,
              origem,
              profile,
              manterId,
            }),
          });

          const payload = ((response.headers
            .get("content-type")
            ?.includes("application/json")
            ? await response.json()
            : {
                message: `O servidor de login está indisponível (erro ${response.status}). Tente novamente mais tarde.`,
              }) ?? {}) as Partial<LoginResponse> & {
            message?: string;
          };

          if (response.status === 402) {
            setPaymentApi(apiBaseUrl);
            return;
          }
          if (!response.ok || !payload.card) {
            setError(
              payload.message ??
                "Não foi possível localizar um cartão no PostgreSQL.",
            );
            return;
          }

          await new Promise((resolve) => setTimeout(resolve, 1500));
          onSuccess(payload.card);
          return;
        } catch (error) {
          lastError = error;
        }
      }

      console.error("Falha ao conectar com a API", lastError);
      setError("Falha ao conectar com o servidor. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: "var(--bg-input)",
    border: "1.5px solid var(--input-border)",
    borderRadius: "14px",
  };

  if (paymentApi !== null) {
    return <PaymentPage identifier={usuario} apiBaseUrl={paymentApi} onBack={() => setPaymentApi(null)} onPaid={() => { setPaymentApi(null); void handleAcessar(); }} />;
  }

  return (
    <div
      className="login-screen min-h-screen flex flex-col"
      style={{ background: "var(--bg-nav)" }}
    >
      <div
        className="login-header flex items-center justify-between"
        style={{
          background: "var(--bg-header)",
        }}
      >
        <button onClick={onBack} className="text-white p-1">
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
        <span className="text-white text-sm font-semibold uppercase">
          {isAluno ? "Aluno" : profile === "funcionario" ? "Funcionário" : "Professor"}
        </span>
        <div className="w-8" />
      </div>

      <div className="login-content flex-1 flex flex-col items-center">
        <SGALogo size={2.0} />

        <div className="login-intro text-center">
          <h2
            className="text-[17px] font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Acesse sua conta
          </h2>
          <p
            className="text-[15px] leading-[19px]"
            style={{ color: "var(--text-muted)" }}
          >
            Por favor, insira seus dados de login
            <br />
            para visualizar suas informações
          </p>
        </div>

        <div className="login-form w-full flex flex-col">
          {isAluno && (
            <div className="relative">
              <button
                className="w-full flex items-center justify-between px-4 py-4 text-left"
                style={inputStyle}
                onClick={() => setShowOrigem((v) => !v)}
              >
                <span
                  className={
                    origem ? "text-white text-sm" : "text-gray-500 text-sm"
                  }
                >
                  {origem || "Selecione a origem"}
                </span>
                <ChevronDown
                  size={18}
                  className="text-gray-400 transition-transform"
                  style={{
                    transform: showOrigem ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
            </div>
          )}

          {showOrigem && (
            <>
              <div
                className="fixed inset-0 z-[60]"
                style={{
                  background: "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  animation: "overlayFadeIn 0.25s ease forwards",
                }}
                onClick={() => setShowOrigem(false)}
              />
              <div
                className="fixed bottom-0 left-1/2 w-full max-w-[430px] z-[70] rounded-t-3xl"
                style={{
                  background: "#1A1F2A",
                  animation:
                    "sheetSlideUp 0.38s cubic-bezier(0.32, 0.72, 0, 1) forwards",
                  willChange: "transform",
                }}
              >
                <div className="w-10 h-1 rounded-full bg-gray-600 mx-auto mt-3 mb-1" />

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-white text-base font-semibold">
                    Selecione a origem
                  </span>
                  <button
                    onClick={() => setShowOrigem(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
                  {ORIGENS.map((o) => (
                    <button
                      key={o}
                      className="w-full text-left px-6 py-4 text-base transition-colors hover:bg-white/5"
                      style={{
                        color: "#82878F",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                      onClick={() => {
                        setOrigem(o);
                        setShowOrigem(false);
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
                <div className="h-8" />
              </div>
            </>
          )}

          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Insira seu usuário"
            className="w-full px-4 py-4 text-sm placeholder-gray-500 outline-none"
            style={{ ...inputStyle, color: "var(--text-input)" }}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Insira sua senha"
              className="w-full px-4 py-4 pr-12 text-sm placeholder-gray-500 outline-none"
              style={{ ...inputStyle, color: "var(--text-input)" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={() => setManterId((v) => !v)}
              className="relative flex-shrink-0 rounded-full transition-colors"
              style={{
                width: "44px",
                height: "24px",
                background: manterId ? "#0891B2" : "#c2cfd3",
              }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                style={{
                  transform: manterId ? "translateX(20px)" : "translateX(0px)",
                }}
              />
            </button>
            <span className="text-sm" style={{ color: "var(--text-primary)" }}>
              Manter conectado
            </span>
          </div>

          <button
            onClick={handleAcessar}
            disabled={loading || !usuario.trim() || !senha || (isAluno && !origem)}
            className="w-full py-4 rounded-2xl font-semibold text-base mt-2 transition-opacity"
            style={{
              background: loading || !usuario.trim() || !senha || (isAluno && !origem) ? "#383b45" : "#00527F",
              color: "#B0B8C1",
            }}
          >
            {loading ? "Acessando..." : "Acessar"}
          </button>

          {error && (
            <p
              className="text-sm leading-relaxed mt-2"
              style={{ color: "#FCA5A5" }}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


