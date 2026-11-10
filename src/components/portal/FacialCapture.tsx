import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";

interface FacialCaptureProps {
  onClose: () => void;
}

const steps = [
  { title: "Aproxime mais", instruction: "Centralize seu rosto na moldura" },
  { title: "Olhe para a esquerda", instruction: "Vire o rosto lentamente para a esquerda" },
  { title: "Olhe para a direita", instruction: "Vire o rosto lentamente para a direita" },
  { title: "Olhe para a câmera", instruction: "Mantenha seu rosto centralizado" },
];

const FacialCapture: React.FC<FacialCaptureProps> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "complete">("loading");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    let stream: MediaStream | null = null;

    async function startCamera() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("A câmera não está disponível neste navegador. Acesse o aplicativo por HTTPS.");
        }
        const camera = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (!active) {
          camera.getTracks().forEach((track) => track.stop());
          return;
        }
        stream = camera;
        if (videoRef.current) {
          videoRef.current.srcObject = camera;
          await videoRef.current.play();
        }
        if (active) setStatus("ready");
      } catch (cause) {
        if (!active) return;
        stream?.getTracks().forEach((track) => track.stop());
        setError(cause instanceof DOMException && cause.name === "NotAllowedError"
          ? "Permita o acesso à câmera nas configurações do navegador para continuar."
          : cause instanceof Error ? cause.message : "Não foi possível acessar a câmera.");
        setStatus("error");
      }
    }

    void startCamera();
    return () => {
      active = false;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (status !== "ready") return;
    const timer = window.setTimeout(() => {
      if (step < steps.length - 1) setStep(step + 1);
      else {
        const stream = videoRef.current?.srcObject as MediaStream | null;
        stream?.getTracks().forEach((track) => track.stop());
        setStatus("complete");
      }
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [status, step]);

  return (
    <div className="fixed inset-0 z-[90] flex h-[100dvh] flex-col bg-[#0d111d] text-white">
      <header className="relative flex h-[100px] shrink-0 items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)]">
        <button type="button" onClick={onClose} className="absolute bottom-4 left-3 p-1" aria-label="Voltar"><ArrowLeft size={21} /></button>
        <h1 className="text-center text-[14px] font-semibold uppercase">Reconhecimento Facial</h1>
      </header>
      <main className="relative min-h-0 flex-1 overflow-hidden bg-black">
        <video ref={videoRef} muted playsInline autoPlay className="absolute inset-0 h-full w-full scale-x-[-1] object-cover" aria-label="Prévia da câmera frontal" />
        <div className="absolute left-4 top-4 rounded-xl bg-black/70 px-4 py-2 text-white">
          <p className="text-sm">Passo {step + 1}/{steps.length}</p>
          <p className="mt-1 text-lg font-semibold">{steps[step].title}</p>
        </div>
        <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded bg-white px-3 py-1.5 text-sm text-black">Fechar</button>
        {status === "ready" && <>
          <div aria-hidden="true" className="pointer-events-none absolute left-[5%] top-[15%] h-[67%] w-[90%] rounded-[50%] border-[5px] border-[#ff4048]" />
          <p aria-live="polite" className="absolute bottom-[12%] left-1/2 w-max max-w-[80%] -translate-x-1/2 rounded-2xl bg-black/85 px-5 py-2 text-center text-sm text-[#00e987]">{steps[step].instruction}</p>
        </>}
        {status === "loading" && <div role="status" className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 px-8 text-center"><span className="mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#10c5ec] border-b-transparent" /><p className="text-xl font-semibold">Quase pronto...</p><p className="mt-2 text-sm text-white/75">Abrindo a câmera. Aguarde.</p></div>}
        {status === "error" && <div role="alert" className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 px-8 text-center"><p className="text-lg font-semibold">Não foi possível abrir a câmera</p><p className="mt-3 text-sm text-white/75">{error}</p><button type="button" onClick={onClose} className="mt-5 rounded-lg bg-[#00537d] px-5 py-2">Voltar</button></div>}
        {status === "complete" && <div role="status" className="absolute inset-0 flex flex-col items-center justify-center bg-[#101115] px-8 text-center"><p className="text-xl font-semibold">Etapas concluídas</p><p className="mt-3 text-sm text-white/75">Nenhum reconhecimento ou cadastro facial foi realizado.</p><button type="button" onClick={onClose} className="mt-5 rounded-lg bg-[#00537d] px-5 py-2">Concluir</button></div>}
      </main>
      <div className="h-[max(24px,env(safe-area-inset-bottom))] shrink-0 bg-[#0d111d]" />
    </div>
  );
};

export default FacialCapture;
