import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";

type DataItem = {
  ciudad: string;
  valor: number;
};

type Props = {
  data?: DataItem[];
  promedio?: number;
  titulo?: string;
};

export default function ComparacionCardiologos({
  data = [
    { ciudad: "Oaxaca", valor: 3 },
    { ciudad: "Cuernavaca", valor: 5 },
  ],
  promedio = 3.2,
  titulo = "comparación de cardiologos por ciudad",
}: Props) {
  //  Obtener min y max
  const valores = data.map((d) => d.valor);
  const min = Math.min(...valores);
  const max = Math.max(...valores);

  return (
    <div style={{ width: "100%", height: 400 }}>
      {/* Título */}
      <h3 style={{ textAlign: "center", marginBottom: "16px" }}>
        {titulo}
      </h3>

      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="ciudad" />
          <YAxis />

          <Tooltip />

          {/* ✅ Barras con color dinámico */}
          <Bar dataKey="valor">
            {data.map((entry, index) => {
              let color = "#8884d8"; // color base

              if (min === max) {
                color = "#8884d8"; // todos iguales
              } else if (entry.valor === max) {
                color = "#00C49F"; 
              } else if (entry.valor === min) {
                color = "#FF4C4C";
              }

              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Bar>

          {/*  promedio */}
          <ReferenceLine
            y={promedio}
            stroke="red"
            strokeWidth={2}
            strokeDasharray="6 6"
            label={{
              value: `Promedio (${promedio})`,
              position: "right",
              fill: "red",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}