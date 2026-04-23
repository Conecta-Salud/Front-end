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

import { useEffect, useState } from "react";

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
  const [gradients, setGradients] = useState({
    red: ["#000", "#000"],
    green: ["#000", "#000"],
    blue: ["#000", "#000"],
  });

  // 🔥 Leer variables CSS y extraer colores del gradient
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);

    const extractColors = (gradient: string) => {
      const matches = gradient.match(/#([0-9A-Fa-f]{6})/g);
      return matches || ["#000", "#000"];
    };

    const red = extractColors(
      styles.getPropertyValue("--gradient-primary-red")
    );
    const green = extractColors(
      styles.getPropertyValue("--gradient-primary-green")
    );
    const blue = extractColors(
      styles.getPropertyValue("--gradient-primary-blue")
    );

    setGradients({
      red,
      green,
      blue,
    });
  }, []);

  // min / max
  const valores = data.map((d) => d.valor);
  const min = Math.min(...valores);
  const max = Math.max(...valores);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3 style={{ textAlign: "center", marginBottom: "16px" }}>{titulo}</h3>

      <ResponsiveContainer>
        <BarChart data={data}>
          {/* ✅ DEFINICIÓN DE GRADIENTES */}
          <defs>
            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradients.red[0]} />
              <stop offset="100%" stopColor={gradients.red[1]} />
            </linearGradient>

            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradients.green[0]} />
              <stop offset="100%" stopColor={gradients.green[1]} />
            </linearGradient>

            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradients.blue[0]} />
              <stop offset="100%" stopColor={gradients.blue[1]} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ciudad" />
          <YAxis />
          <Tooltip />

          {/* ✅ BARRAS */}
          <Bar dataKey="valor">
            {data.map((entry, index) => {
              let fill = "url(#blueGradient)";

              if (min === max) {
                fill = "url(#blueGradient)";
              } else if (entry.valor === max) {
                fill = "url(#redGradient)";
              } else if (entry.valor === min) {
                fill = "url(#greenGradient)";
              }

              return <Cell key={`cell-${index}`} fill={fill} />;
            })}
          </Bar>

          {/* Promedio */}
          <ReferenceLine
            y={promedio}
            stroke="var(--color-red)"
            strokeWidth={2}
            strokeDasharray="6 6"
            label={{
              value: `Promedio (${promedio})`,
              position: "right",
              fill: "var(--color-red)",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
