import { useId } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
  Cell,
  LabelList,
} from "recharts";

type ChartTone = "green" | "yellow" | "red" | "neutral" | "default";

type CustomXAxisTickProps = {
  x?: string | number;
  y?: string | number;
  payload?: {
    value?: string;
  };
  data: ChartData[];
};

interface ChartData {
  label: string;
  value: number;
  subtitle?: string;
  tone?: ChartTone;
}

interface StatusRule {
  min?: number;
  max?: number;
  tone: ChartTone;
}

interface ReferenceConfig {
  value: number;
  label: string;
}

interface ComparisonBarChartProps {
  data: ChartData[];
  title?: string;
  rules?: StatusRule[];
  referenceLine?: ReferenceConfig;
  yDomain?: [number | "auto", number | "auto"];
  chartHeight?: number;
  emptyMessage?: string;
}

const CustomXAxisTick = ({
  x = 0,
  y = 0,
  payload,
  data,
}: CustomXAxisTickProps) => {
  const numericX = typeof x === "number" ? x : Number(x);
  const numericY = typeof y === "number" ? y : Number(y);

  const label = payload?.value ?? "";
  const currentItem = data.find((item) => item.label === label);
  const subtitle = currentItem?.subtitle;

  return (
    <g transform={`translate(${numericX},${numericY})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#000000"
        fontSize="14"
        fontWeight="500"
      >
        {label}
      </text>

      {subtitle && (
        <text
          x={0}
          y={0}
          dy={34}
          textAnchor="middle"
          fill="#7A7A7A"
          fontSize="12"
          fontWeight="400"
        >
          {subtitle}
        </text>
      )}
    </g>
  );
};

export default function ComparisonBarChart({
  data,
  title = "Comparación",
  rules,
  referenceLine,
  yDomain = [0, "auto"],
  chartHeight = 320,
  emptyMessage = "No hay datos disponibles.",
}: ComparisonBarChartProps) {
  const chartId = useId();

  if (!data.length) {
    return (
      <div className="w-full bg-white p-6 rounded-[10px] shadow-sm">
        <h2
          className="text-[20px] font-semibold mb-4"
          style={{
            backgroundImage: "var(--gradient-primary-green)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </h2>

        <div className="h-[220px] flex items-center justify-center text-gray-500 text-[16px]">
          {emptyMessage}
        </div>
      </div>
    );
  }

  const getToneForEntry = (entry: ChartData): ChartTone => {
    if (entry.tone && entry.tone !== "default" && entry.tone !== "neutral") {
      return entry.tone;
    }

    if (rules?.length) {
      for (const rule of rules) {
        const meetsMin = rule.min === undefined || entry.value >= rule.min;
        const meetsMax = rule.max === undefined || entry.value <= rule.max;

        if (meetsMin && meetsMax) {
          return rule.tone;
        }
      }
    }

    return "yellow";
  };

  const gradientIds = {
    green: `${chartId}-greenGradient`,
    yellow: `${chartId}-yellowGradient`,
    red: `${chartId}-redGradient`,
  };

  return (
    <div className="w-full bg-white p-6 rounded-[10px] shadow-sm">
      <h2
        className="text-[20px] font-semibold mb-4"
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
          <BarChart
            data={data}
            margin={{ top: 30, right: 40, left: 0, bottom: 50 }}
          >
            <defs>
              <linearGradient id={gradientIds.green} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-green-start)" />
                <stop offset="73%" stopColor="var(--color-green-end)" />
              </linearGradient>

              <linearGradient id={gradientIds.yellow} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-yellow)" />
                <stop offset="100%" stopColor="var(--color-yellow-end)" />
              </linearGradient>

              <linearGradient id={gradientIds.red} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-red-start)" />
                <stop offset="100%" stopColor="var(--color-red)" />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="label"
              axisLine={{ stroke: "#BDBDBD" }}
              tickLine={false}
              interval={0}
              height={50}
              tick={(props) => <CustomXAxisTick {...props} data={data} />}
            />

            <YAxis
              domain={yDomain}
              axisLine={false}
              tickLine={{ stroke: "#BDBDBD" }}
              tick={{ fontSize: 12, fill: "#5B5B5B" }}
            />

            <Tooltip />

            {referenceLine && (
              <ReferenceLine
                y={referenceLine.value}
                stroke="var(--color-text-secundary)"
                strokeWidth={2}
                strokeDasharray="4 4"
                label={{
                  value: referenceLine.label,
                  position: "insideTopRight",
                  fill: "var(--color-text-secundary)",
                  fontSize: 12,
                }}
              />
            )}

            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={48}>
              <LabelList
                dataKey="value"
                position="top"
                fill="#000000"
                fontSize={14}
                fontWeight={700}
                formatter={(value) =>
                  typeof value === "number"
                    ? valueFormatter?.(value) ?? value.toFixed(2)
                    : ""
                }
              />

              {data.map((entry, index) => {
                const tone = getToneForEntry(entry);

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#${gradientIds[tone]})`}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}