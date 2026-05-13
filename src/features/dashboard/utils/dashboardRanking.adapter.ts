import type {
  DashboardRanking,
  DashboardRankingRow,
} from "../types/dashboardSummary.types";
import type { RankingColumn } from "../../../components/ui/RankingTable/RankingTable.types";

const centerKeys = new Set([
  "rank",
  "value",
  "doctors",
  "population",
  "hospitalBeds",
  "consultingRooms",
]);

const truncateKeys = new Set([
  "name",
  "unit",
  "unitName",
  "unitType",
  "careLevel",
]);

export function adaptSummaryRankingColumns(
  ranking?: DashboardRanking
): RankingColumn<DashboardRankingRow>[] {
  if (!ranking?.columns?.length) return [];

  return ranking.columns.map((column) => ({
    header: column.label,
    key: column.key,
    align: centerKeys.has(column.key) ? "center" : "left",
    truncate: truncateKeys.has(column.key),
    maxWidth: truncateKeys.has(column.key) ? "max-w-[180px]" : undefined,
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