import { useId } from "react";
// @ts-ignore
import medIcon from "../../assets/icons/medIcon.svg"; 
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

type ChartTone = "green" | "yellow" | "red";

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
  rules: StatusRule[];
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

  const ChartHeader = () => (
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-[#E6FFFA] p-2 rounded-lg shrink-0">
        <img src={medIcon} alt="Icono Médico" className="w-6 h-6 object-contain" />
      </div>
      <h2
        className="text-[18px] font-black leading-tight uppercase tracking-tight"
        style={{
          backgroundImage: "var(--gradient-primary-green)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {title}
      </h2>
    </div>
  );

  if (!data.length) {
    return (
      <div className="w-full bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
        <ChartHeader />
        <div className="h-[220px] flex items-center justify-center text-gray-400 text-[14px] font-medium italic">
          {emptyMessage}
        </div>
      </div>
    );
  }

  const getToneForValue = (value: number): ChartTone => {
    for (const rule of rules) {
      const meetsMin = rule.min === undefined || value >= rule.min;
      const meetsMax = rule.max === undefined || value <= rule.max;

      if (meetsMin && meetsMax) {
        return rule.tone;
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
    <div className="w-full bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 hover:shadow-md transition-shadow duration-300">
      <ChartHeader />

      <div className="w-full" style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 30, right: 20, left: -20, bottom: 20 }}
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
              axisLine={{ stroke: "#F1F5F9" }}
              tickLine={false}
              interval={0}
              height={50}
              tick={(props) => <CustomXAxisTick {...props} data={data} />}
            />

            <YAxis
              domain={yDomain}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94A3B8", fontWeight: 600 }}
            />

            <Tooltip 
                cursor={{fill: '#F8FAFC'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />

            {referenceLine && (
              <ReferenceLine
                y={referenceLine.value}
                stroke="#94A3B8"
                strokeWidth={1.5}
                strokeDasharray="6 6"
                label={{
                  value: referenceLine.label,
                  position: "top",
                  fill: "#64748B",
                  fontSize: 10,
                  fontWeight: 700
                }}
              />
            )}

            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
              <LabelList
                dataKey="value"
                position="top"
                fill="#1E293B"
                fontSize={13}
                fontWeight={800}
                offset={10}
                formatter={(value: number) => value.toFixed(1)}
              />

              {data.map((entry, index) => {
                const tone = getToneForValue(entry.value);
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