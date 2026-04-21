import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ChartData {
  estado: string;
  valor: number;
}

interface MedicalChartProps {
  data: ChartData[];
  title?: string;
  barColor?: string;
  gridColor?: string;
}

export default function MedicalChart({
  data,
  title = "Estados vs médicos por 1000 habitantes",
}: MedicalChartProps) {
  return (
    <div className="w-full h-[400px] bg-white p-6 rounded-xl shadow-sm">
      {/* TÍTULO */}
      <h2 className="text-lg font-semibold text-[#14B8A6] mb-4">{title}</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          {/* GRID */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* EJE X */}
          <XAxis
            dataKey="estado"
            angle={-35}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
          />

          {/* EJE Y */}
          <YAxis domain={[2.5, 4]} />

          {/* TOOLTIP */}
          <Tooltip />

          {/* BARRAS */}
          <Bar
            dataKey="valor"
            fill="#4CAF50"
            radius={[6, 6, 0, 0]}
            barSize={28}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
