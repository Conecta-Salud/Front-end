import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import plusIcon from "../../../assets/icons/button/plusIcon.svg";
import downloadIcon from "../../../assets/icons/button/downloadIcon.svg";

type CustomButtonProps = Readonly<{
  label: string;
  tone?: "green" | "blue" | "red";
  height?: "40" | "60";
  buttonType?: "add" | "download";
  icon?: ReactNode;
  iconPlacement?: "left" | "right";
  textSize?: "md" | "lg";
  loading?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>>;

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  tone = "green",
  height = "40",
  buttonType,
  icon,
  iconPlacement = "right",
  textSize = "md",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  const heightClasses = {
    "40": "h-[40px]",
    "60": "h-[60px]",
  };

  const textSizeClasses = {
    md: "text-[18px]",
    lg: "text-[24px]",
  };

  const toneStyles = {
    green: {
      background: "var(--gradient-primary-green)",
      color: "#FFFFFF",
    },
    blue: {
      background: "var(--gradient-primary-blue)",
      color: "#FFFFFF",
    },
    red: {
      background: "var(--color-red)",
      color: "#FFFFFF",
    },
  };

  const presetConfig = {
    add: {
      src: plusIcon,
      alt: "Agregar",
      placement: "left" as const,
    },
    download: {
      src: downloadIcon,
      alt: "Descargar",
      placement: "right" as const,
    },
  };

  const resolvedPreset = buttonType ? presetConfig[buttonType] : undefined;
  let resolvedIcon = icon;

  if (!resolvedIcon && resolvedPreset) {
    resolvedIcon = (
      <img
        src={resolvedPreset.src}
        alt={resolvedPreset.alt}
        className="w-[18px] h-[18px] object-contain"
      />
    );
  }

  const resolvedPlacement = resolvedPreset
    ? resolvedPreset.placement
    : iconPlacement;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center rounded-[6px] px-[15px] transition-all duration-200",
        "font-semibold shadow-md",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        heightClasses[height],
        "w-fit min-w-[130px]",
        className,
      ].join(" ")}
      style={toneStyles[tone]}
      {...props}
    >
      <div className="flex items-center justify-center gap-[14px] w-full">
        {!loading && resolvedPlacement === "left" && resolvedIcon && (
          <span className="flex items-center justify-center shrink-0">
            {resolvedIcon}
          </span>
        )}

        <span
          className={[
            "font-semibold whitespace-nowrap",
            textSizeClasses[textSize],
          ].join(" ")}
        >
          {loading ? "Cargando..." : label}
        </span>

        {!loading && resolvedPlacement === "right" && resolvedIcon && (
          <span className="flex items-center justify-center shrink-0">
            {resolvedIcon}
          </span>
        )}
      </div>
    </button>
  );
};

export default CustomButton;
