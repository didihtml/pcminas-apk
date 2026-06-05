import React from "react";

const Header: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center pt-10 pb-8 px-6"
      style={{
        background: "var(--bg-header)",
        borderBottomLeftRadius: "28px",
        borderBottomRightRadius: "28px",
      }}
    >
      <img
        src="/logo-puc-white.png"
        alt="PUC Minas"
        className="w-32 h-32 object-contain"
      />
    </div>
  );
};

export default Header;
