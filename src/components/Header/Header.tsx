import React from "react";
import logoImg from "../../assets/ConectaSalud_logo.png";


type HeaderProps = {
  subtitle?: string;
  logo?: boolean;
};

const Header: React.FC<HeaderProps> = ({ subtitle, logo = true }) => {
  const firstPart = "Conecta";
  const secondPart = "Salud";

  return (
    <header
      className="w-full p-7.5 flex items-center gap-[9px] shadow-sm"
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {logo && (
        <img
          src={logoImg}
          alt="ConectaSalud logo"
          className="w-[56px] h-[48px] object-contain"
        />
      )}

      <div className="flex flex-col leading-tight">
        {/* Título */}
        <span
          style={{
            fontSize: "30px",
            fontWeight: "700",
            lineHeight: "1.1",
          }}
        >
          <span
            style={{
              backgroundImage: "var(--gradient-primary-green)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {firstPart}
          </span>
          <span
            style={{
              backgroundImage: "var(--gradient-primary-blue)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {secondPart}
          </span>
        </span>

        {/* Subtítulo */}
        {subtitle && (
          <span
            style={{
              fontSize: "14px",
              color: "black",
              marginTop: "2px",
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
