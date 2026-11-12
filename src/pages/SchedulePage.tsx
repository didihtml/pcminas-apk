import React from "react";
import { ArrowLeft, Bell } from "lucide-react";
import type { AccessCard } from "../types";

const SchedulePage: React.FC<{ card: AccessCard; onBack: () => void }> = ({ card, onBack }) => (
  <div className="min-h-[100dvh] bg-[#0d111d] pb-36 text-white">
    <header className="sticky top-0 z-10 flex h-[118px] items-end justify-center bg-[#182037] px-12 pb-6 pt-[env(safe-area-inset-top)]"><button type="button" onClick={onBack} className="absolute bottom-5 left-5 rounded-full p-1" aria-label="Voltar para Acadêmico"><ArrowLeft size={22} /></button><h1 className="text-center text-[16px] font-semibold">GRADE DE HORÁRIOS</h1><Bell size={21} strokeWidth={1.8} className="absolute bottom-6 right-6" aria-label="Notificações" /></header>
    <main className="px-[17px] pt-6"><p className="text-sm leading-5 text-[#a4aab5]">A grade de horários de {card.curso || "seu curso"} ainda não foi cadastrada.</p></main>
  </div>
);
export default SchedulePage;
