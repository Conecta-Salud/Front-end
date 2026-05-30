import React from "react";

const toneStyles = {
  green: {
    background: "var(--gradient-primary-green)",
    color: "#FFFFFF",
  },
  default: {
    background: "#FFFFFF",
    color: "#000000",
  },
  red: {
    background: "var(--color-red)",
    color: "#FFFFFF",
  },
};

const sizeStyles = {
  xs: {
    container: "min-h-[90px] w-full px-3 py-2",
    title: "text-[14px]",
    subtitle: "text-[11px]",
    value: "text-[28px]",
  },
  sm: {
    container: "min-h-[116px] w-[180px] px-3 py-3",
    title: "text-[16px]",
    subtitle: "text-[13px]",
    value: "text-[30px]",
  },
  md: {
    container: "min-h-[116px] w-[242px] px-[10px] py-[10px]",
    title: "text-[20px]",
    subtitle: "text-[16px]",
    value: "text-[40px]",
  },
  lg: {
    container: "min-h-[116px] w-[320px] px-4 py-4",
    title: "text-[24px]",
    subtitle: "text-[18px]",
    value: "text-[52px]",
  },
};

interface CustomKPIProps {
  title: string;
  titleSecondLine?: string;
  subtitle?: string;
  value: string | number;
  variant?: "default" | "green" | "red";
  size?: "sm" | "md" | "lg" | "xs";
  fullWidth?: boolean;
  className?: string;
}

const CustomKPI: React.FC<CustomKPIProps> = ({
  title,
  titleSecondLine,
  subtitle,
  value,
  variant = "default",
  size = "md",
  fullWidth = false,
  className = "",
}) => {
  const currentSize = sizeStyles[size];

  return (
    <div
      className={[
        "flex flex-col items-center justify-center",
        "rounded-[10px] shadow-lg text-center",
        fullWidth ? "w-full" : "",
        currentSize.container,
        className,
      ].join(" ")}
      style={toneStyles[variant]}
    >
      <div className="leading-tight">
        <p className={`${currentSize.title}`}>
          {title}
          {titleSecondLine && (
            <>
              <br />
              {titleSecondLine}
            </>
          )}
        </p>
      </div>

      {subtitle && (
        <p
          className={`${currentSize.subtitle} mt-1`}
          style={{
            color:
              variant === "default"
                ? "var(--color-text-secundary)"
                : "rgba(255,255,255,0.8)",
          }}
        >
          {subtitle}
        </p>
      )}

      <p className={`${currentSize.value} font-semibold leading-none mt-2`}>
        {value}
      </p>
    </div>
  );
};

export default CustomKPI;
