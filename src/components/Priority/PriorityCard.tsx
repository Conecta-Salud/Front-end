import React from "react";

type Metric = {
  label: string;
  value: string | number;
};

type Variant = "alta" | "baja" | "media";

type PriorityCardProps = {
  title: string;
  subtitle: string;
  variant: Variant;
  progress: number;
  metrics: Metric[];
};

const variantStyles: Record<
  Variant,
  {
    gradient: string;
    color: string;
    border: string;
  }
> = {
  alta: {
    gradient: "var(--gradient-primary-red)",
    color: "#FC6767",
    border: "#FC6767",
  },
  baja: {
    gradient: "var(--gradient-primary-green)",
    color: "#14B8A6",
    border: "#14B8A6",
  },
  media: {
    gradient: "var(--gradient-primary-yellow)",
    color: "#F59E0B",
    border: "#F59E0B",
  },
};

const PriorityCard: React.FC<PriorityCardProps> = ({
  title,
  subtitle,
  variant,
  progress,
  metrics,
}) => {
  const styles = variantStyles[variant];

  const labelMap = {
    alta: "Alta",
    baja: "Baja",
    media: "Media",
  };

  return (
    <div
      className="rounded-2xl overflow-hidden w-full max-w-md"
      style={{
        border: `2px solid ${styles.border}`,
      }}
    >
      {/* Header */}
      <div
        className="text-white p-4 text-center font-bold text-lg"
        style={{
          background: styles.gradient,
        }}
      >
        {labelMap[variant]}
      </div>

      {/* Body */}
      <div className="bg-gray-100 p-6 text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-400">{subtitle}</p>

        {/* Progress */}
        <div className="mt-4 w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: styles.color,
            }}
          />
        </div>

        {/* Metrics */}
        <div className="mt-4 text-left space-y-2">
          {metrics.map((m, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: styles.color }}
                />
                <span>{m.label}</span>
              </div>
              <span className="font-semibold" style={{ color: styles.color }}>
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriorityCard;
