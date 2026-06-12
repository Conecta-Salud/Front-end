import { useQuery } from "@tanstack/react-query";
import { fetchComparisonSummary } from "../services/comparisonSummary.api";
import type {
  ComparisonLevel,
  GetComparisonSummaryParams,
} from "../types/comparisonSummary.types";

export const comparisonSummaryQueryKeys = {
  all: ["comparison-summary"] as const,

  summary: (params: {
    level?: ComparisonLevel | null;
    periodId?: number | null;
    codes?: string[];
  }) =>
    [
      ...comparisonSummaryQueryKeys.all,
      params.level ?? "no-level",
      params.periodId ?? "no-period",
      params.codes?.[0] ?? "no-code-a",
      params.codes?.[1] ?? "no-code-b",
    ] as const,
};

const hasValidCodes = (codes?: string[]): codes is [string, string] => {
  if (!codes || codes.length !== 2) return false;

  const [firstCode, secondCode] = codes;

  return Boolean(firstCode) && Boolean(secondCode) && firstCode !== secondCode;
};

export function useComparisonSummaryQuery(params: {
  level: ComparisonLevel;
  periodId?: number | null;
  codes: string[];
  enabled?: boolean;
}) {
  const canRun =
    Boolean(params.level) &&
    Boolean(params.periodId) &&
    hasValidCodes(params.codes);

  return useQuery({
    queryKey: comparisonSummaryQueryKeys.summary({
      level: params.level,
      periodId: params.periodId,
      codes: params.codes,
    }),
    queryFn: ({ signal }) =>
      fetchComparisonSummary(
        {
          level: params.level,
          periodId: params.periodId as number,
          codes: params.codes as [string, string],
        } satisfies GetComparisonSummaryParams,
        signal
      ),
    enabled: canRun && (params.enabled ?? true),
    staleTime: 1000 * 60 * 10,
  });
}
