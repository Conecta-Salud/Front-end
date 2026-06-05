import React from "react";
import logoImg from "../../../assets/ConectaSalud_logo.png";


type HeaderProps = {
  subtitle?: string;
  logo?: boolean;
  actions?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ subtitle, logo = true, actions}) => {
  const firstPart = "Conecta";
  const secondPart = "Salud";

  return (
    <header
      className="w-full h-full flex items-center justify-between gap-6 px-[30px] shadow-sm"
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div className="flex items-center gap-[9px]">
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
              style={{ color: "var(--color-blue)" }}
            >
              {firstPart}
            </span>
            <span
              style={{ color: "var(--color-blue)" }}
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
      </div>

      {actions && (
        <div className="flex items-center justify-end gap-3 min-w-0">
          {actions}
        </div>
      )}
    </header>
  );
};

export default Header;
