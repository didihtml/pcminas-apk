import React from "react";
import { ImageOff } from "lucide-react";

const BannerCarousel: React.FC = () => (
  <section aria-label="Destaques" className="relative z-10 ml-[21px] mr-[2px] -mt-[56px] flex h-[170px] flex-col items-center justify-center rounded-t-[12px] bg-[#151923] px-8 text-center text-[#92939d]">
    <ImageOff size={33} strokeWidth={2.2} aria-hidden="true" />
    <p className="mt-3 text-[14px] leading-[18px]">Nenhum destaque disponível no<br /> momento.</p>
  </section>
);
export default BannerCarousel;
