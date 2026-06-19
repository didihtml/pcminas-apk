import React from "react";

export const SGALogo: React.FC<{ size?: number }> = ({ size = 1 }) => (
  <img
    src="/SGALOGO.png"
    alt="SGA"
    style={{
      height: `${48 * size}px`,
      width: "auto",
      objectFit: "contain",
    }}
  />
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
