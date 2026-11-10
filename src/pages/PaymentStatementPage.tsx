import React, { useState } from "react";
import { ArrowLeft, Bell, CalendarDays, Download, Share2, Printer } from "lucide-react";

interface PaymentStatementPageProps {
  onBack: () => void;
}

const PaymentStatementPage: React.FC<PaymentStatementPageProps> = ({ onBack }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notice, setNotice] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const fields = [
    { id: "statement-start", label: "DATA INÍCIO", placeholder: "Selecione o período inicial", value: startDate, setValue: setStartDate },
    { id: "statement-end", label: "DATA FIM", placeholder: "Selecione o período final", value: endDate, setValue: setEndDate },
  ];

  const handleView = () => {
    if (!startDate || !endDate) {
      setNotice("Selecione as datas de início e fim para continuar.");
    } else if (endDate < startDate) {
      setNotice("A data final deve ser igual ou posterior à data inicial.");
    } else {
      setNotice("");
      setShowPreview(true);
    }
  };

  if (showPreview) return <div className="fixed inset-0 z-[80] flex h-[100dvh] flex-col bg-[#0d111d] text-white">
    <header className="relative flex h-[100px] shrink-0 items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)]"><button type="button" onClick={() => setShowPreview(false)} className="absolute bottom-4 left-3 p-1" aria-label="Voltar para seleção de período"><ArrowLeft size={21}/></button><h1 className="text-center text-[14px] font-semibold">DECLARAÇÃO DE PAGAMENTO</h1></header>
    <main className="flex-1 overflow-auto bg-[#808080]"><div className="bg-[#4a4a52] px-[18px] py-3"><span className="rounded bg-[#38383e] px-3 py-1 text-sm">1 de 1</span></div><div className="p-[10px]"><section className="min-h-[min(123vw,900px)] bg-white px-4 pt-4 text-center text-black"><p className="text-[9px] font-bold uppercase">Não existem pagamentos para o aluno dentro do período informado</p><p className="mt-2 text-[9px] text-[#555]">Prévia visual: os pagamentos não foram consultados.</p></section></div></main>
    <footer className="flex shrink-0 gap-2 bg-[#0d111d] px-[15px] pb-[max(20px,env(safe-area-inset-bottom))] pt-3">{[{ icon: Download, label: "Salvar" }, { icon: Share2, label: "Compartilhar" }, { icon: Printer, label: "Imprimir" }].map(({ icon: Icon, label }) => <button key={label} type="button" disabled title="Disponível quando houver uma declaração" className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[#00537d] px-2 py-3 text-sm font-semibold opacity-50"><Icon size={17}/><span className="truncate">{label}</span></button>)}</footer>
  </div>;

  return <div className="flex min-h-[100dvh] flex-col bg-[#0d111d] pb-32 text-white">
    <header className="relative flex h-[100px] shrink-0 items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)]">
      <button type="button" onClick={onBack} className="absolute bottom-4 left-3 p-1" aria-label="Voltar para Financeiro"><ArrowLeft size={21} /></button>
      <h1 className="text-center text-[14px] font-semibold">DECLARAÇÃO DE PAGAMENTO</h1>
      <Bell size={19} className="absolute bottom-5 right-5" aria-label="Notificações" />
    </header>
    <main className="flex flex-1 flex-col px-[15px] pb-3 pt-4">
      <h2 className="text-[17px] font-bold uppercase leading-5 text-[#a4a4ae]">Informe o período que deseja consultar</h2>
      {fields.map(({ id, label, placeholder, value, setValue }) => <div key={id} className="mt-4">
        <label htmlFor={id} className="mb-1 block text-xs text-[#a4a4ae]">{label}</label>
        <div className="relative flex h-[52px] w-full items-center justify-between rounded-lg border border-[#b7b8c1] px-[14px] text-[15px] text-[#c6c7d1] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white">
          <span aria-hidden="true">{value ? value.split("-").reverse().join("/") : placeholder}</span>
          <CalendarDays size={21} className="text-[#898c94]" aria-hidden="true" />
          <input id={id} type="date" value={value} onChange={e => { setValue(e.target.value); setNotice(""); }} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
        </div>
      </div>)}
      {notice && <p role="status" className="mt-3 text-sm text-[#a4aab5]">{notice}</p>}
      <button type="button" onClick={handleView} className="mt-auto w-full rounded-xl bg-[#00537d] px-4 py-3 text-sm font-semibold">Visualizar declaração</button>
    </main>
  </div>;
};

export default PaymentStatementPage;
