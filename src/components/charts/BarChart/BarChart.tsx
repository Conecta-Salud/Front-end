import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";

interface ChartData {
  label: string;
  value: number;
}

interface CustomBarChartProps {
  data: ChartData[];
  title?: string;
  barColor?: string;
  yDomain?: [number | "auto", number | "auto"];
  chartHeight?: number;
  showAverageLine?: boolean;
}

export default function CustomBarChart({
  data,
  title = "Gráfica de barras",
  barColor,
  yDomain = [0, "auto"],
  chartHeight = 320,
  showAverageLine = true,
}: CustomBarChartProps) {
  const dataLength = data.length;

  const xAxisAngle = dataLength > 10 ? -45 : -35;
  const xAxisHeight = dataLength > 10 ? 80 : 70;

  const xAxisInterval =
    dataLength <= 8
      ? 0
      : dataLength <= 15
      ? 1
      : "preserveStartEnd";

  const maxLabelLength = dataLength > 10 ? 10 : 18;

  const average =
  data.length > 0
    ? data.reduce((sum, item) => sum + item.value, 0) / data.length
    : 0;

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
            margin={{ top: 10, right: 100, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14B8A6" />
                <stop offset="73%" stopColor="#6EE7B7" />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#D9D9D9" strokeDasharray="0" />

            <XAxis
              dataKey="label"
              angle={xAxisAngle}
              textAnchor="end"
              interval={xAxisInterval}
              height={xAxisHeight}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) =>
                value.length > maxLabelLength
                  ? `${value.slice(0, maxLabelLength)}...`
                  : value
              }
            />

            <YAxis domain={yDomain} />

            <Tooltip />
            
            {showAverageLine && (
              <ReferenceLine
                y={average}
                stroke="var(--color-blue)"
                strokeWidth={2}
                strokeDasharray="6 6"
                label={{
                  value: `Promedio: ${average.toFixed(2)}`,
                  position: "right",
                  fill: "var(--color-blue)",
                  fontSize: 12,
                }}
              />
            )}

            <Bar
              dataKey="value"
              fill={barColor ?? "url(#barGradient)"}
              radius={[6, 6, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}