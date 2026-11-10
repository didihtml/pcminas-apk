import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface SettingsPageProps { onBack: () => void }

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const [showDevice, setShowDevice] = useState(false);
  const [notice, setNotice] = useState("");
  const language = typeof navigator === "undefined" ? "Indisponível" : navigator.language;
  const platform = typeof navigator === "undefined" ? "Indisponível" : navigator.platform || "Indisponível";
  const deviceInfo = `Plataforma: ${platform}\nIdioma: ${language}`;

  const copyInfo = async () => {
    try {
      await navigator.clipboard.writeText(deviceInfo);
      setNotice("Informações copiadas.");
    } catch {
      setNotice("Não foi possível copiar. Seu navegador pode bloquear o acesso à área de transferência.");
    }
  };

  return <div className="min-h-[100dvh] bg-[#0d111d] pb-32 text-white">
    <header className="relative flex h-[100px] items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)]">
      <button type="button" onClick={() => { if (showDevice) { setShowDevice(false); setNotice(""); } else onBack(); }} className="absolute bottom-4 left-3 p-1" aria-label="Voltar"><ArrowLeft size={21}/></button>
      <h1 className="text-center text-[14px] font-semibold">{showDevice ? "CONFIGURAÇÕES DO DISPOSITIVO" : "CONFIGURAÇÕES"}</h1>
    </header>
    {showDevice ? <main className="space-y-4 px-5 pt-5 text-sm"><div><h2 className="font-semibold">Plataforma</h2><p className="break-words text-[#8b8e9c]">{platform}</p></div><div><h2 className="font-semibold">Idioma</h2><p className="text-[#8b8e9c]">{language}</p></div><button type="button" onClick={copyInfo} className="w-full rounded-lg bg-[#00537d] px-4 py-3 text-sm font-semibold">Copiar configurações</button>{notice && <p role="status" className="text-sm text-[#a4aab5]">{notice}</p>}</main> : <main className="space-y-5 px-5 pt-5"><section><h2 className="text-sm font-bold">LOGIN</h2><div className="mt-3 flex items-center justify-between gap-4"><span className="text-sm text-[#9295a0]">Manter conectado</span><button type="button" disabled role="switch" aria-checked="false" aria-label="Manter conectado, indisponível" className="h-5 w-10 rounded-full bg-[#545965] opacity-60" /></div><p className="mt-1 text-xs text-[#9295a0]">Indisponível nesta versão.</p></section><section><h2 className="text-sm font-bold">NOTIFICAÇÕES</h2><div className="mt-3 flex items-center justify-between gap-4"><span className="text-sm text-[#9295a0]">Receber notificações</span><button type="button" disabled role="switch" aria-checked="false" aria-label="Receber notificações, indisponível" className="h-5 w-10 rounded-full bg-[#545965] opacity-60" /></div><p className="mt-1 text-xs text-[#9295a0]">Indisponível nesta versão.</p></section><section><h2 className="text-sm font-bold">GERAL</h2><button type="button" onClick={() => setShowDevice(true)} className="mt-3 w-full rounded-lg bg-[#00537d] px-4 py-3 text-sm font-semibold">Configuração do dispositivo</button></section></main>}
  </div>;
};

export default SettingsPage;
