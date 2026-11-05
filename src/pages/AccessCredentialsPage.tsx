import React from "react";
import { ArrowLeft, ArrowRight, Bell, KeyRound, Mail, Monitor } from "lucide-react";

interface AccessCredentialsPageProps {
  onBack: () => void;
}

const AccessCredentialsPage: React.FC<AccessCredentialsPageProps> = ({ onBack }) => (
  <div className="min-h-[100dvh] bg-[#0d141c] pb-32 text-[#e8eaf0]">
    <header className="relative flex h-[100px] items-end justify-center bg-[#171b31] px-12 pb-5 pt-[env(safe-area-inset-top)]">
      <button type="button" onClick={onBack} aria-label="Voltar" className="absolute bottom-4 left-3 p-1"><ArrowLeft size={21} /></button>
      <h1 className="text-center text-[14px] font-semibold">CREDENCIAIS DE ACESSO</h1>
      <Bell size={19} strokeWidth={1.8} className="absolute bottom-5 right-5" aria-label="Notificações" />
    </header>

    <main className="px-2 pt-5">
      <section>
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#d4d8da] text-[#16435a]"><KeyRound size={24} /></span>
          <div><h2 className="text-[16px] font-bold">Código de pessoa</h2><p className="text-xs text-[#a4aab5]">Não disponível</p></div>
        </div>
        <p className="mt-3 text-justify text-[12px] leading-[15px] text-[#a4aab5]">A credencial de acesso é chamada de “Código de Pessoa”. A universidade concede uma a cada usuário no momento do vínculo, destinando esta para a pessoa por tempo indeterminado.</p>
      </section>

      <section className="mt-8 overflow-hidden rounded-[10px] border border-white/[0.025] bg-[#141b25]">
        <div className="flex items-center gap-3 border-b border-white/[0.04] p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#00527f]"><Mail size={22} /></span>
          <div><h2 className="text-[17px] font-bold">PUC Mail</h2><p className="text-sm text-[#858d99]">Login: não disponível</p></div>
        </div>
        <p className="px-4 py-5 text-justify text-[14px] leading-[17px] text-[#b0b6c0]">O PUC Mail é uma parceria entre a PUC Minas e o Google, é uma maneira segura de garantir o recebimento dos comunicados da PUC Minas e as informações necessárias para acesso aos sistemas institucionais. É importante que faça o primeiro acesso para a troca de senha. Se desejar, pode ser configurado o encaminhamento automático das mensagens para outro e-mail.</p>
        <div className="border-t border-white/[0.04] p-4"><button type="button" disabled className="flex items-center gap-2 rounded-[10px] bg-[#00527f] px-6 py-3 text-sm font-semibold opacity-60">Acessar <ArrowRight size={16} /></button><p className="mt-2 text-xs text-[#858d99]">Acesso indisponível no momento.</p></div>
      </section>

      <section className="mt-7 overflow-hidden rounded-[10px] border border-white/[0.025] bg-[#141b25]">
        <div className="flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#d33a13]"><Monitor size={22} /></span>
          <div><h2 className="text-[17px] font-bold">Office 365 / Teams</h2><p className="text-sm text-[#858d99]">Login: não disponível</p></div>
        </div>
      </section>
    </main>
  </div>
);

export default AccessCredentialsPage;

