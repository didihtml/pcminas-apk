import React, { useState } from "react";
import { ArrowLeft, Bell, Globe, MessageSquareText } from "lucide-react";
import ContactPage from "./ContactPage";

const principles = [
  "Fidelidade à doutrina cristã e respeito aos princípios da Igreja Católica, em seu compromisso missionário para com a educação superior.",
  "Promoção do bem comum e da dignidade da pessoa humana.",
  "Promoção da formação solidária, interdisciplinar e humanística, orientada por uma perspectiva ética, cristã e católica, respeitadas a autonomia universitária e a liberdade acadêmica.",
  "Compromisso com a inclusão e a justiça social.",
  "Integração e pluralismo na articulação e nas concepções de ensino, pesquisa e extensão, respeitados os projetos pedagógicos e as diretrizes fixadas pelos órgãos de deliberação superior.",
  "Valorização do mérito acadêmico.",
];
const values = [
  "Igualdade – de valor dos seres humanos e garantia de igualdade de direitos entre eles.",
  "Liberdade – de criação, de expressão do pensamento e de produção de conhecimento.",
  "Autonomia – capacidade de formular leis em liberdade e se reger por elas.",
  "Pluralidade – expressão de igualdade e diferença entre pessoas, iguais porque humanas e diferentes porque singulares.",
  "Solidariedade – adesão à causa do outro, fundada no respeito mútuo e na interlocução entre sujeitos da sociedade.",
  "Justiça – orientada pela igualdade de direitos e pelo respeito às diferenças.",
];

const MissaoValoresPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [showContact, setShowContact] = useState(false);
  if (showContact) return <ContactPage onBack={() => setShowContact(false)} />;
  return <div className="min-h-[100dvh] bg-[#0d111d] pb-28 text-white">
    <header className="sticky top-0 z-20 flex h-[100px] items-end justify-center bg-[#182037] px-12 pb-5 pt-[env(safe-area-inset-top)]"><button type="button" onClick={onBack} aria-label="Voltar" className="absolute bottom-4 left-3 p-1"><ArrowLeft size={21}/></button><h1 className="text-center text-[14px] font-semibold">MISSÃO E VALORES</h1><Bell size={19} className="absolute bottom-5 right-5" aria-label="Notificações"/></header>
    <main className="px-[15px] pt-[15px]"><img src="/missao-valores.png" alt="" className="block w-full rounded-lg"/>
      <div className="mt-4 text-[13px] leading-[1.18]"><section><h2 className="font-bold">Missão</h2><h3 className="font-bold">A missão explicita a razão da existência da nossa Instituição</h3><p>Promover o desenvolvimento humano e social, contribuindo para a formação humanista e científica de profissionais competentes, que tenha como base valores da ética e da solidariedade e compromisso com o bem comum, mediante a produção e disseminação das ciências, das artes e da cultura, a interdisciplinaridade e a integração entre a Universidade e a sociedade.</p></section>
      <section><h2 className="font-bold">Princípios</h2><h3 className="font-bold">A Universidade orienta suas ações, em consonância com o artigo 4° do seu Estatuto, pelos seguintes princípios:</h3><ul className="list-disc pl-[9px]">{principles.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section><h2 className="font-bold">Valores</h2><h3 className="font-bold">Em consonância com o PPI (Projeto Pedagógico Institucional) da Universidade, os seguintes valores devem ser considerados:</h3><ul className="list-disc pl-[9px]">{values.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section><h2 className="font-bold">Visão</h2><h3 className="font-bold">A visão da PUC Minas para o horizonte 2012-2016 explicita o seu desafio estratégico e sinaliza a direção a ser perseguida por todos:</h3><p>Ser uma instituição católica de educação cada vez mais reconhecida pela capacidade de gerar conhecimento e inovações, bem como promover a inclusão social e consolidar alianças nacionais e internacionais, atuando nas diversas áreas de conhecimento com eficiência, com agilidade e com adequada dimensão em sua estrutura acadêmico-administrativa, assegurando a sua contemporaneidade, qualidade e sustentabilidade.</p></section></div>
    </main>
    <section className="mt-4 bg-[#151923] px-7 py-8"><h2 className="text-center text-lg font-light">Dúvidas? Fale com a gente</h2><button type="button" onClick={() => setShowContact(true)} className="mt-7 flex w-full items-center justify-center gap-3 rounded-lg bg-[#00537d] px-4 py-3 text-sm font-semibold"><MessageSquareText size={18}/>Acessar Call Center</button><a href="https://www.pucminas.br/" target="_blank" rel="noopener noreferrer" className="mt-7 flex w-full items-center justify-center gap-3 rounded-lg bg-[#326f96] px-4 py-3 text-sm font-semibold"><Globe size={18}/>Visitar site</a></section>
  </div>;
};
export default MissaoValoresPage;
