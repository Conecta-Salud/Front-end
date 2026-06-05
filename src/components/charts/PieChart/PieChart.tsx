import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";

export type PieChartDataItem = {
  label: string;
  value: number;
  color?: string;
  colorToken?: "green" | "yellow" | "red" | "neutral";
};

type CustomPieChartProps = {
  data?: PieChartDataItem[];
  title?: string;
  chartHeight?: number;
  colors?: string[];
  showLegend?: boolean;
  showTitle?: boolean;
  isAnimationActive?: boolean;
  emptyMessage?: string;
};

const DEFAULT_COLORS = [
  "var(--color-pie-1)",
  "var(--color-pie-2)",
  "var(--color-pie-3)",
  "var(--color-pie-4)",
  "var(--color-pie-5)",
  "var(--color-pie-6)",
  "var(--color-pie-7)",
  "var(--color-pie-8)",
  "var(--color-pie-9)",
  "var(--color-pie-10)",
];

const FALLBACK_COLORS = [
  "#14B8A6",
  "#38BDF8",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
  "#22C55E",
];

const RADIAN = Math.PI / 180;

const getPieColor = (
  item: PieChartDataItem,
  index: number,
  colors: string[]
) => {
  if (item.color) return item.color;

  switch (item.colorToken) {
    case "green":
      return "#14B8A6";
    case "yellow":
      return "#FACC15";
    case "red":
      return "#FC6767";
    case "neutral":
      return "#A3A3A3";
    default:
      return colors[index % colors.length] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
  }
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (
    cx == null ||
    cy == null ||
    midAngle == null ||
    innerRadius == null ||
    outerRadius == null ||
    percent == null
  ) {
    return null;
  }

  if (percent < 0.05) return null;

  const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.6;
  const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={600}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function CustomPieChart({
  data = [],
  title = "Pie chart",
  chartHeight = 320,
  colors = DEFAULT_COLORS,
  showLegend = true,
  showTitle = true,
  isAnimationActive = true,
  emptyMessage = "No hay datos disponibles.",
}: CustomPieChartProps) {
  if (!data.length) {
    return (
      <div className="w-full rounded-[10px] bg-white p-6 shadow-sm">
        {showTitle && (
          <h2
            className="mb-4 text-[20px] font-semibold"
            style={{ color: "var(--color-blue)" }}
          >
            {title}
          </h2>
        )}

        <div className="flex h-[220px] items-center justify-center text-[16px] text-gray-500">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[10px] bg-white p-6 shadow-sm">
      {showTitle && (
        <h2
          className="mb-4 text-[20px] font-semibold"
          style={{ color: "var(--color-blue)" }}
        >
          {title}
        </h2>
      )}

      <div
        className="grid w-full grid-cols-[minmax(0,1fr)_minmax(180px,240px)] items-center gap-6"
        style={{ minHeight: `${chartHeight}px` }}
      >
        <div className="h-full min-h-[260px] min-w-0">
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius="85%"
                labelLine={false}
                label={renderCustomizedLabel}
                isAnimationActive={isAnimationActive}
                stroke="#FFFFFF"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`${entry.label}-${index}`}
                    fill={getPieColor(entry, index, colors)}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {showLegend && (
          <div className="flex min-w-0 flex-col gap-2">
            {data.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="flex min-w-0 items-start gap-2"
              >
                <span
                  className="mt-[4px] h-[14px] w-[14px] shrink-0 rounded-full"
                  style={{ backgroundColor: getPieColor(item, index, colors) }}
                />

                <span className="min-w-0 max-w-[220px] break-words text-[14px] leading-[18px] text-[#111827]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
