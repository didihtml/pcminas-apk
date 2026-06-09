import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { AccessCard } from "../types";

function formatDate(value: string | null | undefined) {
  if (!value || value.trim() === "") return "-";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeZone: "UTC" }).format(date);
}

interface ValidacaoPageProps {
  cardId: string;
}

const ValidacaoPage: React.FC<ValidacaoPageProps> = ({ cardId }) => {
  const [card, setCard] = useState<AccessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const qrValue = `${typeof window !== "undefined" ? window.location.origin : ""}?validacao=${cardId}`;

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch(`/api/cards/${cardId}`);
        if (!res.ok) {
          setError("Carteirinha não encontrada.");
          return;
        }
        const data = await res.json();
        if (data.card) {
          setCard(data.card);
        } else {
          setError("Carteirinha não encontrada.");
        }
      } catch {
        setError("Erro ao consultar a carteirinha.");
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, [cardId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0B1120" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/70 text-sm">Consultando credencial...</p>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "#0B1120" }}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: "rgba(239,68,68,0.15)" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Credencial inválida</h2>
          <p className="text-white/60 text-sm">{error ?? "Não foi possível localizar esta carteirinha no sistema."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ background: "#0B1120" }}>
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Painel da esquerda - Validação */}
        <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-white/50 text-sm font-medium mb-2">Carteirinha pública</p>
          <h1 className="text-white text-3xl font-bold mb-4">Validação da credencial</h1>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            Esta página pública exibe os dados oficiais da carteirinha encontrada no PostgreSQL.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.05)" }}>
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">ID</p>
              <p className="text-white text-sm font-semibold break-all">{card.id}</p>
            </div>
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.25)",
              }}
            >
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "rgba(74,222,128,0.7)" }}>
                Status da consulta
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#22C55E", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }}
                />
                <p className="text-sm font-semibold" style={{ color: "#4ADE80" }}>
                  Validado
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Painel da direita - Carteirinha */}
        <div className="rounded-3xl overflow-hidden flex flex-col" style={{ background: "#024D85" }}>
          {/* Topo: foto + dados */}
          <div className="p-5 flex gap-4">
            <div
              className="flex-shrink-0 overflow-hidden flex items-center justify-center"
              style={{ width: "90px", height: "110px", borderRadius: "12px", border: "3px solid #7ECCEF", background: "#01365C" }}
            >
              {!imageError && card.fotoUrl ? (
                <img src={card.fotoUrl} alt={card.nome} className="w-full h-full object-cover" onError={() => setImageError(true)} />
              ) : (
                <span className="text-center text-xs px-2" style={{ color: "#C9E9F5" }}>Foto indisponível</span>
              )}
            </div>
            <div className="flex flex-col gap-1.5 pt-0.5">
              <div>
                <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>Nome</p>
                <p className="text-white text-base font-bold leading-tight">{card.nome}</p>
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>Código</p>
                <p className="text-white text-sm font-semibold">{card.codigo ?? card.id}</p>
              </div>
            </div>
          </div>

          {/* Grid de informações */}
          <div className="px-5 pb-5 grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>Atribuição</p>
              <p className="text-white text-xs font-bold">{card.atribuicao ?? card.status}</p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>RG</p>
              <p className="text-white text-xs font-bold">{card.rg ?? "-"}</p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>CPF</p>
              <p className="text-white text-xs font-bold">{card.cpf}</p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>Nascimento</p>
              <p className="text-white text-xs font-bold">{card.nascimento ? formatDate(card.nascimento) : "-"}</p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>Campus</p>
              <p className="text-white text-xs font-bold" style={{ whiteSpace: "pre-line" }}>
                {card.campus ? card.campus.replace("Caldas", "\nCaldas") : "-"}
              </p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>Curso</p>
              <p className="text-white text-xs font-bold">{card.curso}</p>
            </div>
          </div>

          {/* Credencial de acesso */}
          <div className="flex flex-col px-5 pt-4 pb-5 mt-auto" style={{ background: "#02406D" }}>
            <div className="flex items-center gap-2 mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12,11A5,5,0,1,0,7,6,5.006,5.006,0,0,0,12,11Zm0-8A3,3,0,1,1,9,6,3,3,0,0,1,12,3ZM3,22V18a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5v4a1,1,0,0,1-2,0V18a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v4a1,1,0,0,1-2,0Z" />
              </svg>
              <span className="text-white text-sm font-semibold">Credencial de acesso</span>
            </div>
            <div className="flex gap-4 items-center">
              <div className="bg-white rounded-xl p-1.5 flex-shrink-0">
                <QRCodeSVG value={qrValue} size={110} includeMargin />
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "#85AFBC" }}>Código</p>
                <p className="text-white text-xl font-bold">{card.codigoAcesso ?? card.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidacaoPage;
