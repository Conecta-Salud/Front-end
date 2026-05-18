import ComparisonBarChart from "../../../components/charts/ComparisonChart/ComparisonChart";
import type { ComparisonChart } from "../types/comparisonSummary.types";
import {
  adaptComparisonChartData,
  adaptComparisonReferenceLine,
  translateComparisonChartTitle,
} from "../utils/comparisonChart.adapter";
import { formatComparisonChartValue } from "../utils/comparisonFormatters";

type ComparisonChartGridProps = {
  charts?: ComparisonChart[];
  isLoading?: boolean;
  isError?: boolean;
};

export default function ComparisonChartGrid({
  charts = [],
  isLoading = false,
  isError = false,
}: ComparisonChartGridProps) {
  if (isLoading) {
    return (
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[260px] rounded-[10px] bg-white shadow-sm animate-pulse"
          />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-[10px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-red-500">
          No se pudieron cargar las gráficas de comparación.
        </p>
      </section>
    );
  }

  if (!charts.length) {
    return (
      <section className="rounded-[10px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-gray-500">
          Selecciona dos territorios para visualizar las gráficas.
        </p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {charts.map((chart) => (
        <ComparisonBarChart
          key={chart.id}
          title={translateComparisonChartTitle(chart.title)}
          data={adaptComparisonChartData(chart.data)}
          referenceLine={adaptComparisonReferenceLine(chart)}
          chartHeight={220}
          yDomain={[0, "auto"]}
          valueFormatter={(value) =>
            formatComparisonChartValue(chart.id, value)
          }
          emptyMessage="No hay datos disponibles."
        />
      ))}
    </section>
  );
}