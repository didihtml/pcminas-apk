import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import packageInfo from "../../package.json";

interface SettingsPageProps { onBack: () => void }
interface UserAgentDetails { model?: string; platform?: string; platformVersion?: string }
interface UserAgentDataLike { platform?: string; getHighEntropyValues?: (hints: string[]) => Promise<UserAgentDetails> }
type NavigatorWithUserAgentData = Navigator & { userAgentData?: UserAgentDataLike };

function getDeviceInfo(details: UserAgentDetails | null) {
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const android = /Android/i.test(ua);
  const system = ios ? "iOS / iPadOS" : details?.platform || (android ? "Android" : navigator.platform || "Não informado");
  const versionMatch = ios ? ua.match(/(?:CPU (?:iPhone )?OS|OS) ([\d_]+)/) : android ? ua.match(/Android\s+([\d.]+)/i) : null;
  const version = versionMatch?.[1]?.replaceAll("_", ".") || details?.platformVersion || "Não informado pelo navegador";
  const model = details?.model || "Não informado pelo navegador";
  return [
    { label: "Modelo", value: model },
    { label: "Fabricante", value: ios ? "Apple" : "Não informado pelo navegador" },
    { label: "Nome do dispositivo", value: "Não informado pelo navegador" },
    { label: "Sistema Operacional", value: system },
    { label: "Versão do Sistema Operacional", value: version },
    { label: "Idioma", value: navigator.language || "Não informado" },
    { label: "Versão do aplicativo", value: packageInfo.version },
    { label: "Token FCM", value: "Não disponível" },
  ];
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const [showDevice, setShowDevice] = useState(false);
  const [notice, setNotice] = useState("");
  const [deviceDetails, setDeviceDetails] = useState<UserAgentDetails | null>(null);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(
    () => typeof Notification === "undefined" ? "unsupported" : Notification.permission,
  );

  useEffect(() => {
    if (!showDevice) return;
    let active = true;
    const uaData = (navigator as NavigatorWithUserAgentData).userAgentData;
    if (uaData?.getHighEntropyValues) {
      void uaData.getHighEntropyValues(["model", "platform", "platformVersion"]).then(details => {
        if (active) setDeviceDetails(details);
      }).catch(() => { if (active) setDeviceDetails(null); });
    }
    return () => { active = false; };
  }, [showDevice]);

  const requestNotifications = async () => {
    if (typeof Notification === "undefined") {
      setNotice("Este navegador não disponibiliza permissões de notificação.");
      return;
    }
    if (Notification.permission === "granted") {
      setNotice("A permissão está ativa. Para alterá-la, use as configurações do navegador ou dispositivo.");
      return;
    }
    if (Notification.permission === "denied") {
      setNotice("As notificações estão bloqueadas. Altere a permissão nas configurações do navegador ou dispositivo.");
      return;
    }
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      setNotice(result === "granted" ? "Permissão concedida. O envio de notificações ainda não está configurado." : "A permissão de notificações não foi concedida.");
    } catch {
      setNotice("Não foi possível solicitar permissão para notificações neste dispositivo.");
    }
  };

  const deviceFields = getDeviceInfo(deviceDetails);
  const copyInfo = async () => {
    try {
      await navigator.clipboard.writeText(deviceFields.map(({ label, value }) => `${label}: ${value}`).join("\n"));
      setNotice("Informações copiadas.");
    } catch {
      setNotice("Não foi possível copiar. Seu navegador pode bloquear o acesso à área de transferência.");
    }
  };

  return <div className="min-h-[100dvh] bg-[#0d111d] pb-32 text-white">
    <header className="relative flex h-[100px] items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)]"><button type="button" onClick={() => { if (showDevice) { setShowDevice(false); setNotice(""); } else onBack(); }} className="absolute bottom-4 left-3 p-1" aria-label="Voltar"><ArrowLeft size={21}/></button><h1 className="text-center text-[14px] font-semibold">{showDevice ? "CONFIGURAÇÕES DO DISPOSITIVO" : "CONFIGURAÇÕES"}</h1></header>
    {showDevice ? <main className="space-y-3 px-[15px] pt-4 text-sm">{deviceFields.map(({ label, value }) => <div key={label}><h2 className="font-semibold">{label}</h2><p className="break-words text-[#8b8e9c]">{value}</p></div>)}<button type="button" onClick={copyInfo} className="w-full rounded-lg bg-[#00537d] px-4 py-3 text-sm font-semibold">Copiar configurações</button>{notice && <p role="status" className="text-sm text-[#a4aab5]">{notice}</p>}</main> : <main className="space-y-5 px-5 pt-5"><section><h2 className="text-sm font-bold">LOGIN</h2><div className="mt-3 flex items-center justify-between gap-4"><span className="text-sm text-[#9295a0]">Manter conectado</span><button type="button" disabled role="switch" aria-checked="false" aria-label="Manter conectado, indisponível" className="h-5 w-10 rounded-full bg-[#545965] opacity-60" /></div><p className="mt-1 text-xs text-[#9295a0]">Requer uma sessão de login segura.</p></section><section><h2 className="text-sm font-bold">NOTIFICAÇÕES</h2><div className="mt-3 flex items-center justify-between gap-4"><span className="text-sm text-[#9295a0]">Permissão de notificações</span><button type="button" role="switch" aria-checked={permission === "granted"} onClick={() => void requestNotifications()} className={`relative h-5 w-10 rounded-full ${permission === "granted" ? "bg-[#005b88]" : "bg-[#545965]"}`} aria-label="Permissão de notificações"><span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${permission === "granted" ? "left-0.5 translate-x-5" : "left-0.5"}`}/></button></div><p className="mt-1 text-xs text-[#9295a0]">O envio de notificações ainda não está configurado.</p></section>{notice && <p role="status" className="text-sm text-[#a4aab5]">{notice}</p>}<section><h2 className="text-sm font-bold">GERAL</h2><button type="button" onClick={() => { setNotice(""); setShowDevice(true); }} className="mt-3 w-full rounded-lg bg-[#00537d] px-4 py-3 text-sm font-semibold">Configuração do dispositivo</button></section></main>}
  </div>;
};

export default SettingsPage;
