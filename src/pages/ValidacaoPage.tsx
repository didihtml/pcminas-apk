import { useEffect, useState } from "react";
import type { AccessCard } from "../types";

export default function ValidacaoPage({ cardId }: { cardId: string }) {
  const [card, setCard] = useState<AccessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    setCard(null);
    setImageError(false);
    fetch(`/api/cards/${encodeURIComponent(cardId)}`, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error("Carteirinha não encontrada.");
        const data = await response.json();
        if (!data.card) throw new Error("Carteirinha não encontrada.");
        setCard(data.card);
      })
      .catch(err => { if (err.name !== "AbortError") setError("Não foi possível consultar a carteirinha."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [cardId]);

  if (loading || error || !card) return <main className="flex min-h-[100dvh] items-center justify-center bg-white px-6 text-center text-[#555]" role="status">{loading ? "Consultando carteirinha..." : error || "Carteirinha não encontrada."}</main>;

  return <main className="min-h-[100dvh] bg-white px-5 pb-12 pt-[62px] text-center font-[Arial,sans-serif] text-[#555]">
    <img src={!imageError && card.fotoUrl ? card.fotoUrl : "/cartao-sem-foto.png"} onError={() => setImageError(true)} alt={imageError || !card.fotoUrl ? "Sem foto cadastrada" : `Foto de ${card.nome}`} className="mx-auto h-[min(52vw,200px)] w-[min(52vw,200px)] rounded-full object-cover" />
    <h1 className="mt-[45px] text-[19px] font-bold leading-tight text-[#28559a]">{card.nome}</h1>
    <p className="mt-[20px] text-[16px] italic leading-[1.3]">{[card.curso, card.campus].filter(Boolean).join(" - ") || "Curso não informado"}</p>
    <p className="mt-[14px] text-[16px]">Situação: <strong className="underline">{card.status || "Não informada"}</strong></p>
    <p className="mt-1 text-[16px]">Matrícula: <strong>{card.codigo || "Não informada"}</strong></p>
    <p className="mx-auto mt-12 max-w-[320px] text-[12px] leading-4 text-[#686868]">Consulta ao cadastro deste aplicativo. Não comprova vínculo institucional.</p>
  </main>;
}
