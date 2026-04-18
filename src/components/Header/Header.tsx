import React from "react";

type HeaderProps = {
  subtitle?: string;
  logo?: string;
};

const Header: React.FC<HeaderProps> = ({ subtitle, logo }) => {
  const firstPart = "Conecta";
  const secondPart = "Salud";

  return (
    <header
      className="w-full p-7.5 flex items-center gap-3 shadow-sm"
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {logo && (
        <img src={logo} alt="logo" className="w-14 h-14 object-contain" />
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
          <span style={{ color: "var(--color-green)" }}>{firstPart}</span>
          <span style={{ color: "#1E4F9C" }}>{secondPart}</span>
        </span>

        {/* Subtítulo */}
        {subtitle && (
          <span
            style={{
              fontSize: "13px",
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
