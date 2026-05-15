import api from "../../../services/api";
import type {
  ComparisonLevel,
  ComparisonSummaryResponse,
  GetComparisonSummaryParams,
} from "../types/comparisonSummary.types";

const assertValidComparisonParams = ({
  level,
  periodId,
  codes,
}: GetComparisonSummaryParams) => {
  if (!level) {
    throw new Error("Comparison level is required.");
  }

  if (!periodId) {
    throw new Error("periodId is required.");
  }

  if (codes.length !== 2) {
    throw new Error("Exactly two territory codes are required.");
  }

  const [firstCode, secondCode] = codes;

  if (!firstCode || !secondCode) {
    throw new Error("Both territory codes are required.");
  }

  if (firstCode === secondCode) {
    throw new Error("Territory codes must be different.");
  }
};

const getComparisonSummaryPath = (level: ComparisonLevel) => {
  if (level === "state") {
    return "/comparison/summary/states";
  }

  return "/comparison/summary/municipalities";
};

const buildComparisonSummarySearchParams = ({
  level,
  periodId,
  codes,
}: GetComparisonSummaryParams) => {
  const params = new URLSearchParams();

  params.append("periodId", String(periodId));

  const codeParamName =
    level === "state" ? "stateCodes" : "municipalityCodes";

  codes.forEach((code) => {
    params.append(codeParamName, code);
  });

  return params;
};

export async function fetchComparisonSummary(
  params: GetComparisonSummaryParams
) {
  assertValidComparisonParams(params);

  const path = getComparisonSummaryPath(params.level);
  const searchParams = buildComparisonSummarySearchParams(params);

  const response = await api.get<ComparisonSummaryResponse>(
    `${path}?${searchParams.toString()}`
  );

  return response.data;
}