import React from "react";
import { X, ArrowRight, BriefcaseBusiness } from "lucide-react";
import { SGALogo, IconProfessor, IconAluno } from "./icons";
import type { LoginProfile } from "../../types";

interface SGASheetProps {
  onClose: () => void;
  onSelectProfile: (profile: LoginProfile) => void;
}

const SGASheet: React.FC<SGASheetProps> = ({ onClose, onSelectProfile }) => {
  const profiles: { id: LoginProfile; label: string; icon: React.ReactNode }[] = [
    { id: "professor", label: "Professor", icon: <IconProfessor size={24} /> },
    { id: "aluno", label: "Aluno", icon: <IconAluno size={24} /> },
    { id: "funcionario", label: "Funcionário", icon: <BriefcaseBusiness size={24} strokeWidth={1.7} /> },
  ];
  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/60" onClick={onClose} />
      <div className="sga-sheet fixed bottom-0 left-1/2 w-full max-w-[430px] z-[70]" role="dialog" aria-modal="true" aria-label="Escolha seu perfil de acesso ao SGA">
        <div className="sga-sheet-header">
          <SGALogo size={0.48} />
          <button onClick={onClose} aria-label="Fechar"><X size={23} /></button>
        </div>
        <p className="sga-sheet-title">Escolha seu perfil de acesso ao SGA</p>
        <div className="sga-profile-list">
          {profiles.map(({ id, label, icon }) => (
            <button key={id} className="sga-profile" onClick={() => onSelectProfile(id)}>
              <span className="sga-profile-label">{icon}<span>{label}</span></span>
              <ArrowRight size={24} />
            </button>
          ))}
        </div>
        <p className="sga-sheet-note">Você será redirecionado para a tela de login</p>
        <div className="sga-home-indicator" />
      </div>
    </>
  );
};
export default SGASheet;
