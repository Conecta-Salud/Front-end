import { useMemo, useState } from "react";
import RankingTableCard from "../../../components/ui/RankingTable/RankingTableCard";
import RankingTableModal from "../../../components/ui/RankingTable/RankingTableModal";
import type { DashboardRanking } from "../types/dashboardSummary.types";
import {
  adaptSummaryRankingColumns,
  adaptSummaryRankingRows,
} from "../utils/dashboardRanking.adapter";

type DashboardRankingSectionProps = {
  ranking?: DashboardRanking;
  isLoading?: boolean;
  isError?: boolean;
};

export default function DashboardRankingSection({
  ranking,
  isLoading = false,
  isError = false,
}: DashboardRankingSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = useMemo(
    () => adaptSummaryRankingColumns(ranking),
    [ranking]
  );

  const rows = useMemo(() => adaptSummaryRankingRows(ranking), [ranking]);

  if (isLoading) {
    return (
      <div className="h-[300px] rounded-[20px] bg-white shadow-sm animate-pulse" />
    );
  }

  if (isError) {
    return (
      <div className="rounded-[20px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-red-500">
          Could not load ranking data.
        </p>
      </div>
    );
  }

  if (!ranking || !columns.length) {
    return (
      <div className="rounded-[20px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-gray-500">
          No ranking data available.
        </p>
      </div>
    );
  }

  return (
    <>
      <RankingTableCard
        title={ranking.title}
        columns={columns}
        data={rows}
        footerText="View full ranking"
        onFooterClick={() => setIsModalOpen(true)}
        emptyMessage="No ranking data available."
      />

      <RankingTableModal
        isOpen={isModalOpen}
        title={ranking.title}
        columns={columns}
        data={rows}
        onClose={() => setIsModalOpen(false)}
        emptyMessage="No ranking data available."
        className="w-full max-w-[1200px]"
      />
    </>
  );
}