import type { ComparisonLevel } from "../types/comparisonSummary.types";
import { useComparisonSummaryQuery } from "../queries/comparisonSummary.queries";

type UseComparisonSummaryParams = {
  level: ComparisonLevel;
  periodId?: number | null;
  codes: string[];
  enabled?: boolean;
};

export function useComparisonSummary({
  level,
  periodId,
  codes,
  enabled = true,
}: UseComparisonSummaryParams) {
  const query = useComparisonSummaryQuery({
    level,
    periodId,
    codes,
    enabled,
  });

  return {
    summary: query.data,
    territories: query.data?.territories ?? [],
    charts: query.data?.charts ?? [],
    priority: query.data?.priority ?? [],
    period: query.data?.period,
    level: query.data?.level,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    isSuccess: query.isSuccess,
  };
}