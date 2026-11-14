import { useState } from 'react'
import { ArrowLeft, Bell, CalendarArrowDown } from 'lucide-react'

const examples = [
  { date: '2026-11-14', title: 'AVALIAÇÃO REPOSITIVA - 2ª CHAMADA', subject: 'LÍNGUA BRASILEIRA DE SINAIS - 2054.1.01', points: 55 },
  { date: '2026-11-21', title: 'Reavaliação', subject: 'LÍNGUA BRASILEIRA DE SINAIS - 2054.1.01', points: 100 },
  { date: '2026-11-23', title: 'Seminário', subject: 'FISIOLOGIA - 9732.1.00', points: 25 },
  { date: '2026-11-30', title: 'Atividade 7 - Compras no Supermercado', subject: 'LÍNGUA BRASILEIRA DE SINAIS - 2054.1.01', points: 5 },
  { date: '2026-11-30', title: 'Atividade 8 - Organização Espacial', subject: 'LÍNGUA BRASILEIRA DE SINAIS - 2054.1.01', points: 5 },
  { date: '2026-11-30', title: 'Atividade 9 - Tecnologia Assistiva para Surdos', subject: 'LÍNGUA BRASILEIRA DE SINAIS - 2054.1.01', points: 5 },
  { date: '2026-12-07', title: 'Terceira Prova', subject: 'FISIOLOGIA - 9732.1.00', points: 25 },
  { date: '2026-12-08', title: 'P3 - Prova Teórica', subject: 'BASES BIOLÓGICAS CELULARES - 8703.1.00', points: 25 },
  { date: '2026-12-14', title: 'Prova Reavaliação', subject: 'FISIOLOGIA - 9732.1.00', points: 100 },
]

export default function AcademicTermCalendarPage({ onBack }: { onBack: () => void }) {
  const [dialog, setDialog] = useState(false)
  const [hidden, setHidden] = useState(false)
  return <div className="min-h-[100dvh] bg-[#0d111d] pb-36 text-white">
    <header className="sticky top-0 z-10 flex h-[101px] items-end justify-center bg-[#182037] px-14 pb-5 pt-[env(safe-area-inset-top)]">
      <button type="button" onClick={onBack} className="absolute bottom-4 left-5 p-1" aria-label="Voltar para Acadêmico"><ArrowLeft size={22}/></button>
      <h1 className="text-center text-[15px] font-semibold">CALENDÁRIO LETIVO</h1>
      <button type="button" onClick={() => setDialog(true)} className="absolute bottom-4 right-[60px] p-1" aria-label="Sincronizar calendário"><CalendarArrowDown size={21}/></button>
      <Bell size={21} className="absolute bottom-5 right-5" aria-label="Notificações" />
    </header>
    <main className="px-[15px] pt-[15px]">
      {!hidden && <><p className="mb-2 text-xs text-[#a4aab5]">Exemplos de atividades; não são avaliações agendadas.</p>{examples.map(item => {
        const date = new Date(`${item.date}T12:00:00`)
        const day = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' }).format(date)
        const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date).replace('.', '').toLocaleUpperCase('pt-BR')
        const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(date).replace('-feira', '').toLocaleUpperCase('pt-BR')
        return <article key={`${item.date}-${item.title}`} className="flex gap-3 border-b border-white/[0.08] py-3 first:pt-0">
          <div className="flex w-[48px] shrink-0 flex-col items-center justify-center self-stretch rounded bg-[#005782] px-1 py-3 text-center"><span className="text-[15px] font-semibold leading-5">{day}</span><span className="text-[10px] font-semibold">{month}</span><span className="text-[7px] font-semibold">{weekday}</span></div>
          <div className="min-w-0"><h2 className="text-[15px] font-semibold leading-[18px]">{item.title}</h2><p className="mt-1 text-[15px] leading-[18px] text-[#92929e]">{item.subject}</p><p className="mt-2 text-[12px] font-bold">{item.points} PTS</p></div>
        </article>
      })}</>}
    </main>
    {dialog && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/65 px-5" onClick={() => setDialog(false)}>
      <div role="dialog" aria-modal="true" aria-labelledby="term-calendar-dialog" onClick={event => event.stopPropagation()} className="w-full max-w-[350px] rounded-[10px] border border-white/[0.06] bg-[#151923] p-6">
        <h2 id="term-calendar-dialog" className="text-[16px] font-bold">Calendário</h2>
        <p className="mt-4 text-[16px] leading-6 text-[#a4a4ae]">Deseja sincronizar os eventos do calendário?</p>
        <p className="mt-2 text-xs leading-4 text-[#a4a4ae]">Esta ação oculta os exemplos. A sincronização com o calendário não está disponível.</p>
        <div className="mt-5 flex gap-2"><button type="button" onClick={() => setDialog(false)} className="flex-1 rounded-xl border border-[#c4c7d0] py-3 text-sm font-semibold">Não</button><button type="button" onClick={() => { setHidden(true); setDialog(false) }} className="flex-1 rounded-xl bg-[#005782] py-3 text-sm font-semibold">Sim</button></div>
      </div>
    </div>}
  </div>
}
