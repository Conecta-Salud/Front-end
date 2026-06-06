import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
  Cell,
} from "recharts";

export interface ChartData {
  label: string;
  value: number;
  color?: string;
  colorToken?: "green" | "yellow" | "red" | "neutral";
}

export interface ChartReferenceLine {
  value: number;
  label: string;
}

interface CustomBarChartProps {
  data: ChartData[];
  title?: string;
  barColor?: string;
  yDomain?: [number | "auto", number | "auto"];
  chartHeight?: number;
  referenceLine?: ChartReferenceLine | null;
  showAverageLine?: boolean;
  showTitle?: boolean;
  emptyMessage?: string;
}

const getBarColor = (item: ChartData, fallbackColor?: string) => {
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
      return fallbackColor ?? "url(#barGradient)";
  }
};

const translateReferenceLineLabel = (label: string) => {
  const labels: Record<string, string> = {
    "Recommended reference": "Referencia recomendada",
  };

  return labels[label] ?? label;
};

export default function CustomBarChart({
  data,
  title = "Bar chart",
  barColor,
  yDomain = [0, "auto"],
  chartHeight = 320,
  referenceLine,
  showAverageLine = false,
  showTitle = true,
  emptyMessage = "No hay datos disponibles.",
}: CustomBarChartProps) {
  const dataLength = data.length;

  const xAxisAngle = dataLength > 10 ? -45 : -35;
  const xAxisHeight = dataLength > 10 ? 85 : 70;

  const xAxisInterval =
    dataLength <= 8 ? 0 : dataLength <= 15 ? 1 : "preserveStartEnd";

  const maxLabelLength = dataLength > 10 ? 10 : 18;

  const average =
    dataLength > 0
      ? data.reduce((sum, item) => sum + item.value, 0) / dataLength
      : 0;

  if (!data.length) {
    return (
      <div className="w-full rounded-[10px] bg-white p-6 shadow-sm">
        {showTitle && (
          <h2
            className="text-brand-blue mb-4 text-[20px] font-semibold"
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
          className="text-brand-blue mb-4 text-[20px] font-semibold"
        >
          {title}
        </h2>
      )}

      <div className="w-full" style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 24, right: 40, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14B8A6" />
                <stop offset="73%" stopColor="#6EE7B7" />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#D9D9D9"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="label"
              angle={xAxisAngle}
              textAnchor="end"
              interval={xAxisInterval}
              height={xAxisHeight}
              tick={{ fontSize: 12, fill: "#111827" }}
              tickFormatter={(value) =>
                String(value).length > maxLabelLength
                  ? `${String(value).slice(0, maxLabelLength)}...`
                  : String(value)
              }
            />

            <YAxis domain={yDomain} tick={{ fontSize: 12, fill: "#4B5563" }} />

            <Tooltip
              formatter={(value) => [value, "Valor"]}
              labelFormatter={(label) => String(label)}
            />

            {referenceLine && (
              <ReferenceLine
                y={referenceLine.value}
                stroke="var(--color-blue)"
                strokeWidth={2}
                strokeDasharray="6 6"
                label={{
                  value: translateReferenceLineLabel(referenceLine.label),
                  position: "insideTopRight",
                  fill: "var(--color-blue)",
                  fontSize: 12,
                }}
              />
            )}

            {showAverageLine && !referenceLine && (
              <ReferenceLine
                y={average}
                stroke="var(--color-blue)"
                strokeWidth={2}
                strokeDasharray="6 6"
                label={{
                  value: `Promedio: ${average.toFixed(2)}`,
                  position: "insideTopRight",
                  fill: "var(--color-blue)",
                  fontSize: 12,
                }}
              />
            )}

            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={30}>

              {data.map((entry) => (
                <Cell
                  key={entry.label}
                  fill={getBarColor(entry, barColor)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
