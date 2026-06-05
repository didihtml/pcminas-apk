import React from "react";

export const SGALogo: React.FC<{ size?: number }> = ({ size = 1 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: `${10 * size}px` }}>
    {/* Ícone */}
    <img
      src="/svga.ico"
      alt="SGA"
      style={{
        height: `${62 * size}px`,
        objectFit: "contain",
        background: "#172037",
      }}
    />

    {/* SGA + subtexto lado a lado */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: `${6 * size}px`,
        alignSelf: "center",
      }}
    >
      <span
        style={{
          color: "white",
          fontFamily: "'Bebas Neue', sans-serif",
          fontWeight: 400,
          fontSize: `${48 * size}px`,
          letterSpacing: "1px",
          lineHeight: 1,
        }}
      >
        SGA
      </span>

      <span
        style={{
          color: "rgba(255,255,255,0.75)",
          fontFamily: "Arial, sans-serif",
          fontSize: `${8.5 * size}px`,
          letterSpacing: "0.1px",
          lineHeight: 1.45,
          whiteSpace: "nowrap",
        }}
      >
        Sistema
        <br />
        de Gestão
        <br />
        Acadêmica
      </span>
    </div>
  </div>
);

export const IconProfessor: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

export const IconAluno: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Capelo de formatura */}
    <polygon points="12 2 22 8 12 14 2 8 12 2" />
    <path d="M6 10.5v5c0 2 2.7 3.5 6 3.5s6-1.5 6-3.5v-5" />
    <line x1="22" y1="8" x2="22" y2="14" />
  </svg>
);
