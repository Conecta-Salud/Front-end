import React from "react";

type Metric = {
  label: string;
  value: string | number;
};

type PriorityCardProps = {
  title: string;
  subtitle: string;
  state: "alta" | "baja";
  progress: number; // 0 a 100
  metrics: Metric[];
};

const PriorityCard: React.FC<PriorityCardProps> = ({
  title,
  subtitle,
  state,
  progress,
  metrics,
}) => {
  const isAlta = state === "alta";

  const colors = {
    bgHeader: isAlta ? "from-red-500 to-red-400" : "from-green-500 to-teal-400",
    border: isAlta ? "border-red-400" : "border-teal-400",
    progress: isAlta ? "bg-red-500" : "bg-teal-400",
    dot: isAlta ? "bg-red-500" : "bg-teal-400",
    textValue: isAlta ? "text-red-500" : "text-teal-500",
  };

  return (
    <div
      className={`rounded-2xl border ${colors.border} overflow-hidden w-full max-w-md`}
    >
      {/* Header */}
      <div
        className={`bg-gradient-to-r ${colors.bgHeader} text-white p-4 text-center font-bold text-lg`}
      >
        {state === "alta" ? "⚠ Alta" : "👍 Baja"}
      </div>

      {/* Body */}
      <div className="bg-gray-100 p-6 text-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-400">{subtitle}</p>

        {/* Progress bar */}
        <div className="mt-4 w-full h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className={`${colors.progress} h-full`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Metrics */}
        <div className="mt-4 text-left space-y-2">
          {metrics.map((m, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                <span>{m.label}</span>
              </div>
              <span className={`font-semibold ${colors.textValue}`}>
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
