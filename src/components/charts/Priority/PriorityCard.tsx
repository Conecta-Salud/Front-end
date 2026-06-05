import React from "react";

type Metric = {
  id: string;
  label: string;
  value: string | number;
};

type PriorityCardProps = {
  title: string;
  subtitle?: string;
  priority: PriorityLevel;
  progress: number;
  metrics: Metric[];
  className?: string;
  showProgress?: boolean;
  gradientDirection?: GradientDirection;
};

const priorityStyles: Record<
  PriorityLevel,
  {
    label: string;
    gradient: string;
  }
> = {
  alta: {
    label: "Alta",
    gradient: "var(--gradient-primary-red)",
  },
  media: {
    label: "Media",
    gradient: "var(--gradient-primary-yellow)",
  },
  baja: {
    label: "Baja",
    gradient: "var(--gradient-primary-green)",
  },
};

type PriorityLevel = "alta" | "media" | "baja";
type GradientDirection = "horizontal" | "diagonal";

const priorityGradientName: Record<PriorityLevel, "red" | "yellow" | "green"> = {
  alta: "red",
  media: "yellow",
  baja: "green",
};

const getGradient = (priority: PriorityLevel, direction: GradientDirection) => {
  const color = priorityGradientName[priority];
  return `var(--gradient-primary-${color}-${direction})`;
};

const clampProgress = (value: number) => {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
};

const PriorityCard: React.FC<PriorityCardProps> = ({
  title,
  subtitle,
  priority,
  progress,
  metrics,
  className = "",
  showProgress = true,
  gradientDirection = "horizontal",
}) => {
  const styles = priorityStyles[priority];
  const safeProgress = clampProgress(progress);
  const gradient = getGradient(priority, gradientDirection);

  return (
    <article
      className={[
        "w-full rounded-[10px] p-[2px] shadow-sm",
        className,
      ].join(" ")}
      style={{ background: gradient }}
    >
      <div className="overflow-hidden rounded-[8px] bg-white">
        <div
          className="h-[60px] flex items-center justify-center text-white text-[24px] font-semibold"
          style={{ background: gradient }}
        >
          {styles.label}
        </div>

        <div className="px-6 py-5 text-center">
          <h3 className="text-[20px] font-semibold leading-tight text-black">
            {title}
          </h3>

          {subtitle && (
            <p
              className="text-[16px] font-normal leading-tight"
              style={{ color: "var(--color-gray)" }}
            >
              {subtitle}
            </p>
          )}

          {showProgress && (
            <div className="mt-5 w-full h-[5px] bg-[#E5E5E5] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${safeProgress}%`,
                  background: gradient,
                }}
              />
            </div>
          )}

          <div className="mt-5 flex flex-col gap-2 text-left">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="grid grid-cols-[1fr_auto] items-center gap-4 text-[15px]"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-[6px] h-[6px] rounded-full shrink-0"
                    style={{ background: gradient }}
                  />

                  <span className="truncate text-black">
                    {metric.label}
                  </span>
                </div>

                <span
                  className="font-semibold whitespace-nowrap"
                  style={{ color: "var(--color-blue)" }}
                >
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PriorityCard;
