import type {
  ComparisonPriorityFactor,
  ComparisonPriorityResult,
} from "../types/comparisonSummary.types";
import {
  formatPriorityFactorValue,
  formatPriorityScore,
} from "./comparisonFormatters";

type PriorityCardLevel = "alta" | "media" | "baja";

export type PriorityCardMetric = {
  id: string;
  label: string;
  value: string | number;
};

export type PriorityCardViewData = {
  id: string;
  title: string;
  subtitle?: string;
  priority: PriorityCardLevel;
  progress: number;
  metrics: PriorityCardMetric[];
};

const priorityLevelMap: Record<
  ComparisonPriorityResult["level"],
  PriorityCardLevel
> = {
  high: "alta",
  medium: "media",
  low: "baja",
};

const factorLabelTranslations: Record<string, string> = {
  "Hospitals per population": "Hospitales por población",
  "Medical coverage": "Cobertura médica",
  "Older adults": "Adultos mayores",
};

const priorityLabelTranslations: Record<string, string> = {
  High: "Alta",
  Medium: "Media",
  Low: "Baja",
};

export function translatePriorityLabel(label: string) {
  return priorityLabelTranslations[label] ?? label;
}

function translateFactorLabel(label: string) {
  return factorLabelTranslations[label] ?? label;
}

function adaptPriorityFactor(
  factor: ComparisonPriorityFactor
): PriorityCardMetric {
  return {
    id: factor.id,
    label: translateFactorLabel(factor.label),
    value: formatPriorityFactorValue(factor),
  };
}

export function adaptPriorityResultsToCards(
  priorityResults: ComparisonPriorityResult[] = []
): PriorityCardViewData[] {
  return priorityResults.map((item) => ({
    id: item.territoryCode,
    title: item.name,
    subtitle: item.parentName,
    priority: priorityLevelMap[item.level],
    progress: Math.min(100, Math.max(0, item.score)),
    metrics: [
      {
        id: "priority_score",
        label: "Índice de prioridad",
        value: formatPriorityScore(item.score),
      },
      ...item.factors.map(adaptPriorityFactor),
    ],
  }));
}
