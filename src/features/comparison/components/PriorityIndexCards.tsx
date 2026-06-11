import { useMemo } from "react";
import PriorityCard from "../../../components/charts/Priority/PriorityCard";
import type { ComparisonPriorityResult } from "../types/comparisonSummary.types";
import { adaptPriorityResultsToCards } from "../utils/comparisonPriority.adapter";

type PriorityIndexCardsProps = Readonly<{
  priority?: ComparisonPriorityResult[];
  isLoading?: boolean;
  isError?: boolean;
  emptyMessage?: string;
}>;

const loadingPriorityIds = [
  "priority-loading-1",
  "priority-loading-2",
];

export default function PriorityIndexCards({
  priority = [],
  isLoading = false,
  isError = false,
  emptyMessage = "No hay índice de prioridad disponible para esta comparación.",
}: PriorityIndexCardsProps) {
  const cards = useMemo(() => adaptPriorityResultsToCards(priority), [priority]);

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {loadingPriorityIds.map((loadingPriorityId) => (
          <div
            key={loadingPriorityId}
            className="h-[280px] rounded-[10px] bg-white shadow-sm animate-pulse"
          />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-[10px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-red-500">
          No se pudo cargar el índice de prioridad.
        </p>
      </section>
    );
  }

  if (!cards.length) {
    return (
      <section className="rounded-[10px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-gray-500">{emptyMessage}</p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {cards.map((card) => (
        <PriorityCard
          key={card.id}
          title={card.title}
          subtitle={card.subtitle}
          priority={card.priority}
          progress={card.progress}
          metrics={card.metrics}
          gradientDirection="horizontal"
        />
      ))}
    </section>
  );
}
