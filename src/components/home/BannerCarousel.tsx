import React, { useState, useEffect, useRef } from "react";

interface Banner {
  id: string;
  bg: string;
  leftText: string;
  highlight: string;
  rightTitle: string;
  rightSub: string;
  btnLabel: string;
}

const BANNERS: Banner[] = [
  {
    id: "1",
    bg: "#0D4A4A",
    leftText: "O MERCADO\nÉ DE QUEM FAZ",
    highlight: "PUC MINAS",
    rightTitle: "PROCESSO\nSELETIVO",
    rightSub: "SIMPLIFICADO 2025",
    btnLabel: "INSCREVA-SE",
  },
  {
    id: "2",
    bg: "#0D2B4A",
    leftText: "SEU FUTURO\nCOMEÇA AQUI",
    highlight: "PUC MINAS",
    rightTitle: "VESTIBULAR\n2025",
    rightSub: "INSCRIÇÕES ABERTAS",
    btnLabel: "SAIBA MAIS",
  },
  {
    id: "3",
    bg: "#1A3A2A",
    leftText: "BOLSAS ATÉ\n100% PARA",
    highlight: "VOCÊ",
    rightTitle: "PROUNI\nE FIES",
    rightSub: "CONSULTE AQUI",
    btnLabel: "VER BOLSAS",
  },
];

const BannerCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % BANNERS.length);
    }, 3500);
  };

  useEffect(() => {
    start();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const banner = BANNERS[current];

  return (
    <div className="mx-4 mt-4">
      <div
        className="relative rounded-2xl overflow-hidden flex"
        style={{
          height: "150px",
          background: banner.bg,
          transition: "background 0.4s",
        }}
      >
        {/* Lado esquerdo — foto placeholder + texto */}
        <div
          className="relative flex-1 flex flex-col justify-end p-3"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, transparent 100%)",
          }}
        >
          {/* Simulação de pessoa (fundo mais escuro) */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 30% 100%, rgba(255,255,255,0.15) 0%, transparent 60%)",
            }}
          />
          <div className="relative">
            <p className="text-white text-sm font-bold leading-tight whitespace-pre-line">
              {banner.leftText}
            </p>
            <p
              className="font-extrabold text-base leading-none"
              style={{ color: "#F59E0B" }}
            >
              {banner.highlight}
            </p>
          </div>
        </div>

        {/* Divisor curvo */}
        <div
          className="absolute"
          style={{
            left: "48%",
            top: 0,
            bottom: 0,
            width: "24px",
            background: banner.bg,
            clipPath: "polygon(100% 0, 100% 100%, 0 100%, 40% 0)",
            zIndex: 1,
          }}
        />

        {/* Lado direito — CTA */}
        <div
          className="flex flex-col items-center justify-center gap-2 px-3 z-10"
          style={{ minWidth: "130px", background: "rgba(0,0,0,0.35)" }}
        >
          <p className="text-white text-xs font-black text-center leading-tight whitespace-pre-line uppercase">
            {banner.rightTitle}
          </p>
          <p className="text-gray-300 text-[9px] text-center uppercase tracking-wide">
            {banner.rightSub}
          </p>
          <button
            className="px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
            style={{ background: "#0891B2", color: "#fff" }}
          >
            {banner.btnLabel}
          </button>
          {/* Logo pequena */}
          <img
            src="/logo-puc-white.png"
            alt=""
            className="w-7 h-7 object-contain opacity-70"
          />
        </div>
      </div>

      {/* Dots indicadores */}
      <div className="flex justify-center gap-1.5 mt-2">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? "20px" : "6px",
              height: "4px",
              background: i === current ? "#0891B2" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
