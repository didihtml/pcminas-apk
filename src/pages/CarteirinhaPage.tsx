import React, { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { AccessCard } from "../types";

interface CarteirinhaPageProps {
  card: AccessCard;
}

function formatDate(value: string | null | undefined) {
  if (!value || value.trim() === "") {
    console.warn("[formatDate] Valor vazio ou nulo recebido:", value);
    return "-";
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    console.warn("[formatDate] Data inválida recebida:", value);
    return "-";
  }
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

const CarteirinhaPage: React.FC<CarteirinhaPageProps> = ({ card }) => {
  const [imageError, setImageError] = useState(false);
  const [qrPos, setQrPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, qrX: 0, qrY: 0 });

  const qrValue = `${typeof window !== "undefined" ? window.location.origin : ""}?validacao=${card.id}`;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      qrX: qrPos.x,
      qrY: qrPos.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    setQrPos({
      x: dragStart.current.qrX + deltaX,
      y: dragStart.current.qrY + deltaY,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <div
      className="h-screen flex flex-col"
      style={{ background: "var(--bg-main)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5"
        style={{ background: "#00527F", height: "90px", paddingTop: "36px" }}
      >
        <div className="w-8" />
        <span className="text-white text-sm font-bold uppercase tracking-widest">
          Cartões de Acesso
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m13.58 11.6-1.33-2.18V6.33A4.36 4.36 0 0 0 10 2.26a2.45 2.45 0 0 0 0-.38A1.94 1.94 0 0 0 8 0a1.94 1.94 0 0 0-2 1.88 1.64 1.64 0 0 0 0 .38 4.36 4.36 0 0 0-2.25 4.07v3.09L2.42 11.6a1.25 1.25 0 0 0 1.06 1.9h1.77A2.68 2.68 0 0 0 8 16a2.68 2.68 0 0 0 2.75-2.5h1.77a1.25 1.25 0 0 0 1.06-1.9zM7.25 1.88A.7.7 0 0 1 8 1.25a.7.7 0 0 1 .75.63 6 6 0 0 0-.75 0 5.9 5.9 0 0 0-.75 0zM8 14.75a1.44 1.44 0 0 1-1.5-1.25h3A1.44 1.44 0 0 1 8 14.75zm-4.52-2.5 1.34-2.17.18-.31V6.33a4 4 0 0 1 .6-2.12A2.68 2.68 0 0 1 8 3.12a2.68 2.68 0 0 1 2.4 1.09 4 4 0 0 1 .6 2.12v3.44l.18.31 1.34 2.17z" />
        </svg>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24">
        {/* Card principal */}
        <div
          className="flex flex-col overflow-hidden"
          style={{ background: "#024D85", borderRadius: "10px" }}
        >
          {/* Topo: foto + nome/código */}
          <div className="p-4 flex gap-4 items-start">
            <div
              className="flex-shrink-0 overflow-hidden flex items-center justify-center"
              style={{
                width: "110px",
                height: "130px",
                borderRadius: "14px",
                border: "3px solid #7ECCEF",
                background: "#01365C",
              }}
            >
              {!imageError && card.fotoUrl ? (
                <img
                  src={card.fotoUrl}
                  alt={card.nome}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span
                  className="text-center text-xs px-3"
                  style={{ color: "#C9E9F5" }}
                >
                  Foto indisponível
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <div>
                <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>
                  Nome
                </p>
                <p className="text-white text-sm font-bold leading-tight">
                  {card.nome}
                </p>
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>
                  Código
                </p>
                <p className="text-white text-sm font-semibold">
                  {card.codigo ?? card.id}
                </p>
              </div>
            </div>
          </div>

          {/* Meio: grid de informações */}
          <div className="px-4 pb-4 grid grid-cols-2 gap-x-3 gap-y-3">
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>
                Atribuição
              </p>
              <p className="text-white text-xs leading-snug font-bold">
                {card.atribuicao ?? card.status}
              </p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>
                RG
              </p>
              <p className="text-white text-xs leading-snug font-bold">
                {card.rg ?? "-"}
              </p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>
                CPF
              </p>
              <p className="text-white text-xs leading-snug font-bold">
                {card.cpf}
              </p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>
                Nascimento
              </p>
              <p className="text-white text-xs leading-snug font-bold">
                {card.nascimento ? formatDate(card.nascimento) : "-"}
              </p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>
                Campus
              </p>
              <p
                className="text-white text-xs leading-snug font-bold"
                style={{ whiteSpace: "pre-line" }}
              >
                {card.campus ? card.campus.replace("Caldas", "\nCaldas") : "-"}
              </p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#85AFBC" }}>
                Curso
              </p>
              <p className="text-white text-xs leading-snug font-bold">
                {card.curso}
              </p>
            </div>
          </div>

          {/* Baixo: credencial de acesso */}
          <div
            className="flex flex-col px-4 pt-3"
            style={{
              background: "#02406D",
              paddingBottom: "16px",
              marginTop: "-12px",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12,11A5,5,0,1,0,7,6,5.006,5.006,0,0,0,12,11Zm0-8A3,3,0,1,1,9,6,3,3,0,0,1,12,3ZM3,22V18a5.006,5.006,0,0,1,5-5h8a5.006,5.006,0,0,1,5,5v4a1,1,0,0,1-2,0V18a3,3,0,0,0-3-3H8a3,3,0,0,0-3,3v4a1,1,0,0,1-2,0Z" />
              </svg>
              <span className="text-white text-sm font-semibold">
                Credencial de acesso
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <div
                className={`bg-white rounded-xl p-1.5 flex-shrink-0 touch-none select-none transition-shadow ${
                  isDragging ? "cursor-grabbing shadow-lg" : "cursor-grab"
                }`}
                style={{
                  transform: `translate(${qrPos.x}px, ${qrPos.y}px)`,
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                title="Arraste o QR code para reposicioná-lo"
              >
                <QRCodeSVG value={qrValue} size={110} includeMargin />
              </div>

              <div>
                <p className="text-xs mb-1" style={{ color: "#85AFBC" }}>
                  Código
                </p>
                <p className="text-white text-sm font-bold">
                  {card.codigoAcesso ?? card.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarteirinhaPage;
