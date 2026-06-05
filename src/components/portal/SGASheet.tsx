import React from "react";
import { X, ChevronRight } from "lucide-react";
import { SGALogo, IconProfessor, IconAluno } from "./icons";

type Profile = "professor" | "aluno";

interface SGASheetProps {
  onClose: () => void;
  onSelectProfile: (profile: Profile) => void;
}

const SGASheet: React.FC<SGASheetProps> = ({ onClose, onSelectProfile }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60]"
        style={{
          background: "rgba(0,0,0,0.6)",
          animation: "overlayFadeIn 0.25s ease forwards",
        }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="fixed bottom-0 left-1/2 w-full max-w-[430px] z-[70] rounded-t-3xl px-6 pt-4 pb-10"
        style={{
          background: "#172037",
          animation:
            "sheetSlideUp 0.38s cubic-bezier(0.32, 0.72, 0, 1) forwards",
          willChange: "transform",
        }}
      >
        {/* Handle */}
        <div
          className="w-10 h-1.5 rounded-full mx-auto mb-5"
          style={{ background: "rgba(255,255,255,0.25)" }}
        />

        <div className="flex flex-col gap-5">
          {/* Header SGA */}
          <div className="flex items-center justify-between">
            <SGALogo size={0.85} />
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-gray-400 text-sm">
            Escolha seu perfil de acesso ao SGA
          </p>

          {/* Opção Professor */}
          <button
            onClick={() => onSelectProfile("professor")}
            className="flex items-center justify-between w-full px-4 py-4 rounded-2xl"
            style={{ background: "#0D111D" }}
          >
            <div className="flex items-center gap-3">
              <span className="text-white">
                <IconProfessor size={22} />
              </span>
              <span className="text-white text-base font-bold">Professor</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          {/* Opção Aluno */}
          <button
            onClick={() => onSelectProfile("aluno")}
            className="flex items-center justify-between w-full px-4 py-4 rounded-2xl"
            style={{ background: "#0D111D" }}
          >
            <div className="flex items-center gap-3">
              <span className="text-white">
                <IconAluno size={22} />
              </span>
              <span className="text-white text-base font-bold">Aluno</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          <p className="text-gray-500 text-xs text-center">
            Você será redirecionado para a tela de login
          </p>
        </div>
      </div>
    </>
  );
};

export default SGASheet;
