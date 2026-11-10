import React, { useState } from "react";
import { ArrowLeft, Info, Shield } from "lucide-react";

const recoveryUrl = "https://sgl.icei.pucminas.br/recuperar-senha";

const PasswordRecoveryPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [code, setCode] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  return <div className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-white text-[#31343b]">
    <header className="relative flex h-[76px] shrink-0 items-center justify-center bg-[#182037]">
      <button type="button" onClick={onBack} aria-label="Voltar" className="absolute left-4 rounded p-2 text-white"><ArrowLeft size={20} /></button>
      <img src="/logo-puc-white.png" alt="PUC Minas" className="h-[58px] w-auto object-contain" />
    </header>
    <main className="mx-auto flex w-full max-w-[420px] flex-1 flex-col px-5 pb-6 pt-5">
      <div className="mb-4 flex items-center gap-4"><div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#f0f6fb] font-bold text-[#2271bb] shadow-md">***</div><div className="border-l border-[#e0e5ea] pl-4"><span className="rounded-full border border-[#d4e5fa] bg-[#eef5fd] px-2 py-1 text-[10px] font-bold text-[#1c68b5]">Segurança</span><h1 className="mt-2 text-lg font-bold tracking-tight text-[#003d5f]">Redefinição de Senha</h1></div></div>
      <label htmlFor="recovery-code" className="mb-3 text-sm">Informe seu código de pessoa</label>
      <input id="recovery-code" inputMode="numeric" value={code} onChange={e => setCode(e.target.value)} placeholder="Código de pessoa" className="h-11 w-full rounded-xl border border-[#d0d8e2] bg-white px-4 text-sm text-[#31343b] placeholder:text-[#64748b] outline-none focus:border-[#286eb6]" />
      <button type="button" onClick={() => setShowInfo(!showInfo)} className="mt-2 flex items-center gap-1 self-start text-xs text-[#0064b6]"><Info size={14} /> Informações de acesso</button>
      {showInfo && <p className="mt-2 text-xs text-[#5d6c7b]">A redefinição é realizada no site oficial da PUC Minas. Informe seu código novamente nessa página.</p>}
      <a href={recoveryUrl} target="_blank" rel="noopener noreferrer" className="mt-7 flex h-10 items-center justify-center rounded-xl bg-[#8bb0dd] text-xs font-semibold text-white">PESQUISAR</a>
      <p className="mt-2 text-center text-[10px] text-[#667085]">A pesquisa continua no site oficial da PUC Minas.</p>
      <div className="mt-5 flex items-center gap-3"><span className="h-px flex-1 bg-[#d5dbe2]" /><a href={recoveryUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full border border-[#e2eaf3] bg-[#f2f7fc] px-3 py-2 text-xs font-semibold text-[#1768b8]"><Shield size={15} /> Redefinir MFA</a><span className="h-px flex-1 bg-[#d5dbe2]" /></div>
      <div className="mt-6 border-t border-[#d5dbe2] pt-3 text-center"><h2 className="text-xs font-semibold text-[#687384]">Utilize para acessar</h2><p className="mt-2 rounded bg-[#f1f6fa] px-1 py-2 text-[11px] leading-5 text-[#687384]">Rede Acadêmica &nbsp; Office365/Teams/Canvas &nbsp; Rede Wi-Fi &nbsp; CAPES</p></div>
      <footer className="mt-auto pt-16 text-[10px] text-[#596476]"><div className="flex justify-between"><span>🇧🇷 Português</span><span><span className="mr-1 text-[#00b67a]">●</span>Redefinição no site oficial</span></div><p className="mt-4 text-center text-[#647b96]">Centro de Recursos Computacionais</p></footer>
    </main>
  </div>;
};

export default PasswordRecoveryPage;

