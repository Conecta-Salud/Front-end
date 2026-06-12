import type {
  ComparisonPriorityFactor,
  ComparisonPriorityLevel,
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

const isFiniteNumber = (value: unknown): value is number => {
  return typeof value === "number" && Number.isFinite(value);
};

export function translatePriorityLabel(label: string) {
  return priorityLabelTranslations[label] ?? label;
}

function translateFactorLabel(label: string) {
  return factorLabelTranslations[label] ?? label;
}

function adaptPriorityLevel(
  level?: ComparisonPriorityLevel | null
): PriorityCardLevel {
  if (level === "high") return "alta";
  if (level === "low") return "baja";

  return "media";
}

function adaptPriorityProgress(score?: number | null) {
  if (!isFiniteNumber(score)) return 0;

  return Math.min(100, Math.max(0, score));
}

function adaptPriorityFactor(
  factor: ComparisonPriorityFactor,
  index: number
): PriorityCardMetric {
  return {
    id: factor.id || `factor-${index}`,
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
    priority: adaptPriorityLevel(item.level),
    progress: adaptPriorityProgress(item.score),
    metrics: [
      {
        id: "priority_score",
        label: "Índice de prioridad",
        value: formatPriorityScore(item.score),
      },
      ...(item.factors ?? []).map((factor, index) =>
        adaptPriorityFactor(factor, index)
      ),
    ],
  }));
}
