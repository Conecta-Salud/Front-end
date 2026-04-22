import { Pie, PieChart, Sector, Legend, Cell } from "recharts";
import type { PieLabelRenderProps, PieSectorShapeProps } from "recharts";

// 🎯 Tipado de datos
type DataItem = {
  name: string;
  value: number;
};

type Props = {
  data?: DataItem[];
  titulo?: string;
  isAnimationActive?: boolean;
};

// Colores base
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AA66CC",
  "#FF4444",
];

const RADIAN = Math.PI / 180;

// Labels centrados correctamente
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const ncy = Number(cy);

  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > ncx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

// Shape (opcional)
const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} />;
};

export default function PieChartWithCustomizedLabel({
  data = [
    { name: "Medico general", value: 40 },
    { name: "Pediatras", value: 15 },
    { name: "Ginecoobstetas", value: 12 },
    { name: "Internistas", value: 10 },
    { name: "Urgenciologos", value: 10 },
    { name: "Anestesiologos", value: 13 },
  ],
  titulo = "Distribución de Especialidades",
  isAnimationActive = true,
}: Props) {
  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
      {/* Título dinámico */}
      <h3
        style={{
          textAlign: "left",
          marginBottom: "10px",
          fontFamily: "var(--font-primary)",
          fontWeight: "var(--font-weight-semibold)",
        }}
      >
        {titulo}
      </h3>

      <PieChart width={700} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={isAnimationActive}
          startAngle={90}
          endAngle={450}
          shape={MyCustomPie}
        >
          {/* Colores dinámicos */}
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* Leyenda */}
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </div>
  );
}
