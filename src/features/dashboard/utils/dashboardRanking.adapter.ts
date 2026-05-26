import type {
  DashboardRanking,
  DashboardRankingRow,
} from "../types/dashboardSummary.types";

import {
  translateDashboardColumnLabel,
  translateDashboardRankingTitle,
  translateDashboardValue,
} from "./dashboardTranslation.utils";

import type { RankingColumn } from "../../../components/ui/RankingTable/RankingTable.types";

const centerKeys = new Set([
  "rank",
  "value",
  "doctors",
  "population",
  "hospitalBeds",
  "consultingRooms",
  "coverageIndex"
]);

const truncateKeys = new Set([
  "name",
  "unit",
  "unitName",
  "unitType",
  "careLevel",
]);

const translatableValueKeys = new Set([
  "careLevel",
  "unitType",
]);

export function adaptSummaryRankingTitle(ranking?: DashboardRanking) {
  if (!ranking?.title) return "";
  return translateDashboardRankingTitle(ranking.title);
}

export function adaptSummaryRankingColumns(
  ranking?: DashboardRanking
): RankingColumn<DashboardRankingRow>[] {
  if (!ranking?.columns?.length) return [];

  return ranking.columns.map((column) => ({
    header: translateDashboardColumnLabel(column.key, column.label),
    key: column.key,
    align: centerKeys.has(column.key) ? "center" : "left",
    truncate: truncateKeys.has(column.key),
    maxWidth: truncateKeys.has(column.key) ? "max-w-[180px]" : undefined,
    render: translatableValueKeys.has(column.key)
      ? (row) => {
          const value =
            row[column.key as keyof DashboardRankingRow] ??
            row.extra?.[column.key];

          const translatedValue = translateDashboardValue(value);

          return typeof translatedValue === "string"
            ? translatedValue
            : String(translatedValue ?? "—");
        }
      : undefined,
  }));
}

export function adaptSummaryRankingRows(
  ranking?: DashboardRanking
): DashboardRankingRow[] {
  if (!ranking?.rows?.length) return [];

  return ranking.rows.map((row, index) => ({
    ...row,
    id: row.id ?? row.code ?? String(index),
  }));
}