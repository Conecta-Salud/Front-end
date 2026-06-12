import {
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DashboardChart } from "../types/dashboardSummary.types";
import { adaptSummaryChartToScatterData } from "../utils/dashboardChart.adapter";

type DashboardScatterChartProps = Readonly<{
  chart: DashboardChart;
  height?: number;
}>;

const getColor = (colorToken?: string) => {
  switch (colorToken) {
    case "green":
      return "#14B8A6";
    case "yellow":
      return "#FACC15";
    case "red":
      return "#FC6767";
    case "neutral":
    default:
      return "#A3A3A3";
  }
};

export default function DashboardScatterChart({
  chart,
  height = 320,
}: DashboardScatterChartProps) {
  const data = adaptSummaryChartToScatterData(chart);

  if (!data.length) {
    return (
      <div className="flex h-[220px] items-center justify-center text-gray-500">
        No hay datos gráficos disponibles.
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 24, right: 32, left: 8, bottom: 24 }}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />

          <XAxis
            type="number"
            dataKey="x"
            name={chart.xKey ?? "x"}
            tick={{ fontSize: 12, fill: "#4B5563" }}
          />

          <YAxis
            type="number"
            dataKey="y"
            name={chart.yKey ?? "y"}
            tick={{ fontSize: 12, fill: "#4B5563" }}
          />

          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value, name) => [value, name]}
            labelFormatter={(_, payload) =>
              payload?.[0]?.payload?.label ?? "Territory"
            }
          />

          <Scatter data={data}>
            {data.map((entry) => (
              <Cell
                key={entry.code ?? entry.label}
                fill={getColor(entry.colorToken)}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
