import React from "react";
import PageHeader from "../components/layout/PageHeader";

interface MissaoValoresPageProps {
  onBack: () => void;
}

const MissaoValoresPage: React.FC<MissaoValoresPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen pb-32" style={{ background: "var(--bg-main)" }}>
      <PageHeader title="MISSÃO E VALORES" onBack={onBack} />

      <div className="px-4 pt-24">
        {/* Imagem */}
        <div className="rounded-2xl overflow-hidden mb-6">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop"
            alt="PUC Minas"
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Missão */}
        <section className="mb-6">
          <h2 className="text-white text-lg font-bold mb-1">Missão</h2>
          <h3 className="text-white text-base font-bold mb-2">
            A missão explicita a razão da existência da nossa Instituição
          </h3>
          <p className="text-white text-sm leading-relaxed">
            Promover o desenvolvimento humano e social, contribuindo para a
            formação humanista e científica de profissionais competentes, que
            tenha como base valores da ética e da solidariedade e compromisso
            com o bem comum, mediante a produção e disseminação das ciências,
            das artes e da cultura, a interdisciplinaridade e a integração
            entre a Universidade e a sociedade.
          </p>
        </section>

        {/* Princípios */}
        <section className="mb-6">
          <h2 className="text-white text-lg font-bold mb-2">Princípios</h2>
          <h3 className="text-white text-base font-bold mb-2">
            A Universidade orienta suas ações, em consonância com o artigo 4°
            do seu Estatuto, pelos seguintes princípios:
          </h3>
          <ul className="text-white text-sm leading-relaxed list-none space-y-2">
            <li className="flex gap-2">
              <span>•</span>
              <span>
                Fidelidade à doutrina cristã e respeito aos princípios da Igreja
                Católica, em seu compromisso missionário para com a educação
                superior.
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>
                Promoção do bem comum e da dignidade da pessoa humana.
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>
                Promoção da formação solidária, interdisciplinar e humanística,
                orientada por uma perspectiva ética, cristã e católica,
                respeitadas a autonomia universitária e a liberdade acadêmica.
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>
                Pluralidade – expressão de igualdade e diferença entre pessoas,
                iguais porque humanas e diferentes porque singulares.
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>
                Solidariedade – adesão à causa do outro, fundada no respeito
                mútuo e na interlocução entre sujeitos da sociedade.
              </span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>
                Justiça – orientada pela igualdade de direitos e pelo respeito
                às diferenças.
              </span>
            </li>
          </ul>
        </section>

        {/* Visão */}
        <section className="mb-6">
          <h2 className="text-white text-lg font-bold mb-1">Visão</h2>
          <h3 className="text-white text-base font-bold mb-2">
            A visão da PUC Minas para o horizonte 2012-2016 explicita o seu
            desafio estratégico e sinaliza a direção a ser perseguida por todos:
          </h3>
          <p className="text-white text-sm leading-relaxed">
            Ser uma instituição católica de educação cada vez mais reconhecida
            pela capacidade de gerar conhecimento e inovações, bem como
            promover a inclusão social e consolidar alianças nacionais e
            internacionais, atuando nas diversas áreas de conhecimento com
            eficiência, com agilidade e com adequada dimensão em sua estrutura
            acadêmico-administrativa, assegurando a sua contemporaneidade,
            qualidade e sustentabilidade.
          </p>
        </section>

        {/* Call Center e Site */}
        <section className="mt-8 space-y-3">
          <p className="text-white text-base font-semibold text-center mb-4">
            Dúvidas? Fale com a gente
          </p>
          <a
            href="https://www.pucminas.br/callcenter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl text-white font-semibold text-sm"
            style={{ background: "#06557D" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Acessar Call Center
          </a>
          <a
            href="https://www.pucminas.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl text-white font-semibold text-sm"
            style={{ background: "#3A7CA5" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Visitar site
          </a>
        </section>
      </div>
    </div>
  );
};

export default MissaoValoresPage;
