import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import type { PieLabelRenderProps } from "recharts";

type PieChartDataItem = {
  label: string;
  value: number;
  color?: string;
};

type CustomPieChartProps = {
  data?: PieChartDataItem[];
  title?: string;
  chartHeight?: number;
  colors?: string[];
  showLegend?: boolean;
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

const RADIAN = Math.PI / 180;

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

  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function CustomPieChart({
  data = [],
  title = "Distribución de especialidades",
  chartHeight = 400,
  colors = DEFAULT_COLORS,
  showLegend = true,
  isAnimationActive = true,
  emptyMessage = "No hay datos disponibles.",
}: CustomPieChartProps) {
  if (!data.length) {
    return (
      <div className="w-full rounded-[10px] bg-white p-6 shadow-sm">
        <h2
          className="mb-4 text-[20px] font-semibold"
          style={{
            backgroundImage: "var(--gradient-primary-green)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </h2>

        <div className="flex h-[220px] items-center justify-center text-[16px] text-gray-500">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[10px] bg-white p-6 shadow-sm">
      <h2
        className="mb-4 text-[20px] font-semibold"
        style={{
          backgroundImage: "var(--gradient-primary-green)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {title}
      </h2>

      <div className="w-full" style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius="100%"
              labelLine={false}
              label={renderCustomizedLabel}
              isAnimationActive={isAnimationActive}
              stroke="#FFFFFF"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color ?? colors[index % colors.length]}
                />
              ))}
            </Pie>

            {showLegend && (
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconType="circle"
                wrapperStyle={{
                  right: 0,
                  paddingLeft: 4,
                  fontSize: "14px",
                }}
                formatter={(value) => (
                  <span style={{ color: "#111827", fontSize: 14 }}>
                    {value}
                  </span>
                )}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}