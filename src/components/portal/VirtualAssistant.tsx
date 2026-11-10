import React, { useState } from "react";
import { X } from "lucide-react";

interface VirtualAssistantProps { onClose: () => void }

const VirtualAssistant: React.FC<VirtualAssistantProps> = ({ onClose }) => {
  const [phone, setPhone] = useState("");
  const [notice, setNotice] = useState("");
  const digits = phone.replace(/\D/g, "").slice(0, 11);
  const formatted = digits.length <= 2 ? digits : `(${digits.slice(0, 2)}) ${digits.slice(2, digits.length > 10 ? 7 : 6)}${digits.length > (digits.length > 10 ? 7 : 6) ? `-${digits.slice(digits.length > 10 ? 7 : 6)}` : ""}`;
  const proceed = () => setNotice("O assistente virtual não está disponível no momento.");
  return <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-[18px]" role="dialog" aria-modal="true" aria-labelledby="assistant-title"><div className="w-full max-w-[400px] rounded-lg border border-white/[0.06] bg-[#151923] p-5 text-white"><div className="flex items-center justify-between"><h2 id="assistant-title" className="font-bold">Assistente Virtual</h2><button type="button" onClick={onClose} className="p-1 text-[#a4aab5]" aria-label="Fechar"><X size={19}/></button></div><p className="mt-4 text-sm text-[#a4aab5]">Informe seu telefone com DDD para que o assistente já inicie a conversa com seus dados.</p><label htmlFor="assistant-phone" className="mt-4 block text-xs text-[#a4aab5]">Telefone</label><input id="assistant-phone" type="tel" inputMode="numeric" autoComplete="tel" value={formatted} onChange={e => { setPhone(e.target.value); setNotice(""); }} placeholder="(31) 99999-9999" className="mt-1 h-11 w-full rounded-lg border border-[#a4aab5] bg-transparent px-3 text-sm text-white"/><button type="button" disabled={digits.length < 10} onClick={proceed} className="mt-5 w-full rounded-lg bg-[#00537d] px-4 py-3 text-sm font-semibold disabled:bg-[#474a53] disabled:text-white/50">Continuar</button><button type="button" onClick={proceed} className="mt-2 w-full rounded-lg border border-[#a4aab5] px-4 py-3 text-sm font-semibold">Continuar sem informar</button>{notice && <p role="status" className="mt-3 text-sm text-[#a4aab5]">{notice}</p>}</div></div>;
};
export default VirtualAssistant;
