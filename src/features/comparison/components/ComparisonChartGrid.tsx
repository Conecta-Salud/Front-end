import { useMemo } from "react";

import ComparisonBarChart from "../../../components/charts/ComparisonChart/ComparisonChart";
import type { ComparisonChart } from "../types/comparisonSummary.types";
import {
  adaptComparisonChartData,
  adaptComparisonReferenceLine,
  getComparisonChartAvailabilityState,
  translateComparisonChartTitle,
} from "../utils/comparisonChart.adapter";
import { formatComparisonChartValue } from "../utils/comparisonFormatters";

type ComparisonChartGridProps = {
  charts?: ComparisonChart[];
  isLoading?: boolean;
  isError?: boolean;
  emptyMessage?: string;
};

const getEmptyMessageForChart = (
  availabilityState: ReturnType<typeof getComparisonChartAvailabilityState>
) => {
  if (availabilityState === "empty" || availabilityState === "unavailable") {
    return "Dato no disponible para este nivel territorial.";
  }

  return "No hay datos disponibles.";
};

const getFooterNoteForChart = (
  availabilityState: ReturnType<typeof getComparisonChartAvailabilityState>
) => {
  if (availabilityState === "partial") {
    return "Algunos datos no están disponibles.";
  }

  return undefined;
};

export default function ComparisonChartGrid({
  charts = [],
  isLoading = false,
  isError = false,
  emptyMessage = "Selecciona dos territorios para visualizar las gráficas.",
}: ComparisonChartGridProps) {
  const chartCards = useMemo(
    () =>
      charts.map((chart) => {
        const availabilityState = getComparisonChartAvailabilityState(chart);

        return {
          id: chart.id,
          title: translateComparisonChartTitle(chart.title),
          data: adaptComparisonChartData(chart.data),
          referenceLine: adaptComparisonReferenceLine(chart),
          availabilityState,
          emptyMessage: getEmptyMessageForChart(availabilityState),
          footerNote: getFooterNoteForChart(availabilityState),
        };
      }),
    [charts]
  );

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
        <p className="text-[16px] text-gray-500">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {chartCards.map((chart) => (
        <ComparisonBarChart
          key={chart.id}
          title={chart.title}
          data={chart.data}
          referenceLine={chart.referenceLine}
          chartHeight={220}
          yDomain={[0, "auto"]}
          valueFormatter={(value) =>
            formatComparisonChartValue(chart.id, value)
          }
          emptyMessage={chart.emptyMessage}
          footerNote={chart.footerNote}
        />
      ))}
    </section>
  );
}
