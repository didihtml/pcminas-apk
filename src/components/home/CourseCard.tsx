import React from 'react'
import type { CourseCard as CourseCardType } from '../../types'

interface CourseCardProps {
  card: CourseCardType
}

// Referência (viewBox 330×200):
//   Borda esquerda da faixa azul:  topo x=178, base x=130
//   Borda direita da faixa escura: topo x=162, base x=114
//   → ângulo ≈ arctan((178-130)/200) ≈ 13.5°

const CourseCard: React.FC<CourseCardProps> = ({ card }) => {
  const clipId    = `clip-${card.id}`
  const stripeId  = `stripes-${card.id}`
  const circleId  = `ccl-${card.id}`

  // Pontos-chave do corte diagonal — ângulo mais inclinado (~27°)
  const topBlue   = 200   // x no topo onde começa o azul (61%)
  const botBlue   = 110   // x na base onde começa o azul (33%)
  const topDark   = 184   // x no topo da faixa escura
  const botDark   = 94    // x na base da faixa escura

  return (
    <div
      className="relative rounded-2xl overflow-hidden w-full"
      style={{ background: '#10192B', aspectRatio: '1.65' }}
      aria-label={card.title}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 330 200"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Clip da foto (tudo à esquerda da faixa azul) */}
          <clipPath id={clipId}>
            <polygon points={`0,0 ${topBlue},0 ${botBlue},200 0,200`} />
          </clipPath>

          {/* Listras diagonais */}
          <pattern
            id={stripeId}
            x="0" y="0" width="12" height="12"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-48)"
          >
            <rect width="12" height="12" fill="transparent" />
            <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(255,255,255,0.13)" strokeWidth="4.5" />
          </pattern>

          {/* Clip do círculo */}
          <clipPath id={circleId}>
            <circle cx="298" cy="48" r="42" />
          </clipPath>
        </defs>

        {/* ── Fundo azul-escuro do card ── */}
        <rect x="0" y="0" width="330" height="200" fill="#1C2B44" />

        {/* ── Área azul principal ── */}
        <polygon
          points={`${topBlue},0 330,0 330,200 ${botBlue},200`}
          fill="#1A4FD6"
        />

        {/* ── Listras sobre o azul ── */}
        <polygon
          points={`${topBlue},0 330,0 330,200 ${botBlue},200`}
          fill={`url(#${stripeId})`}
        />

        {/* ── Faixa escura de separação ── */}
        <polygon
          points={`${topDark},0 ${topBlue},0 ${botBlue},200 ${botDark},200`}
          fill="#0B2580"
        />

        {/* ── Foto P&B ── */}
        <image
          href={card.imageUrl}
          x="0" y="-10"
          width="230" height="220"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
          style={{ filter: 'grayscale(100%)' }}
        />

        {/* ── Blend suave borda da foto ── */}
        <polygon
          points={`${topDark},0 ${topBlue},0 ${botBlue},200 ${botDark},200`}
          fill="rgba(13,27,58,0.45)"
        />

        {/* ── Círculo decorativo ── */}
        <circle cx="298" cy="48" r="42" fill="rgba(0,0,0,0.12)" />
        <g clipPath={`url(#${circleId})`}>
          <rect x="256" y="6" width="84" height="84" fill={`url(#${stripeId})`} />
        </g>
        <circle
          cx="298" cy="48" r="42"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.5"
        />

        {/* ── Texto label ── */}
        {card.title.includes('\n') ? (
          <text
            textAnchor="middle"
            fill="white"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="700"
            fontSize="11.5"
            letterSpacing="1.3"
          >
            {card.title.split('\n').map((line, i, arr) => (
              <tspan
                key={i}
                x="252"
                y={arr.length === 2 ? (i === 0 ? 146 : 161) : 153 + i * 14}
              >
                {line}
              </tspan>
            ))}
          </text>
        ) : (
          <text
            x="252"
            y="153"
            textAnchor="middle"
            fill="white"
            fontFamily="Inter, system-ui, sans-serif"
            fontWeight="700"
            fontSize="11.5"
            letterSpacing="1.3"
          >
            {card.title}
          </text>
        )}
      </svg>
    </div>
  )
}

export default CourseCard
