import { useMemo, useState } from "react";
import RankingTableCard from "../../../components/ui/RankingTable/RankingTableCard";
import RankingTableModal from "../../../components/ui/RankingTable/RankingTableModal";
import type { DashboardRanking } from "../types/dashboardSummary.types";
import {
  adaptSummaryRankingColumns,
  adaptSummaryRankingRows,
  adaptSummaryRankingTitle,
} from "../utils/dashboardRanking.adapter";

type DashboardRankingSectionProps = {
  ranking?: DashboardRanking;
  isLoading?: boolean;
  isError?: boolean;
  className?: string;
};

export default function DashboardRankingSection({
  ranking,
  isLoading = false,
  isError = false,
  className = "",
}: DashboardRankingSectionProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = useMemo(() => adaptSummaryRankingTitle(ranking), [ranking]);

  const columns = useMemo(
    () => adaptSummaryRankingColumns(ranking),
    [ranking]
  );

  const rows = useMemo(() => adaptSummaryRankingRows(ranking), [ranking]);

  if (isLoading) {
    return (
      <div
        className={[
          "rounded-[20px] bg-white shadow-sm animate-pulse",
          className || "h-[300px]",
        ].join(" ")}
      />
    );
  }

  if (isError) {
    return (
      <div
        className={[
          "rounded-[20px] bg-white p-6 shadow-sm",
          className,
        ].join(" ")}
      >
        <p className="text-[16px] text-red-500">
          No se pudieron cargar los datos la tabla ranking.
        </p>
      </div>
    );
  }

  if (!ranking || !columns.length) {
    return (
      <div
        className={[
          "rounded-[20px] bg-white p-6 shadow-sm",
          className,
        ].join(" ")}
      >
        <p className="text-[16px] text-red-500">
          No se pudo cargar la tabla ranking.
        </p>
      </div>
    );
  }

  return (
    <>
      <RankingTableCard
        title={title}
        columns={columns.slice(0, 5)}
        data={rows}
        footerText="Ver ranking completo"
        onFooterClick={() => setIsModalOpen(true)}
        emptyMessage="No hay datos de ranking disponibles."
        className={className}
      />

      <RankingTableModal
        isOpen={isModalOpen}
        title={title}
        columns={columns}
        data={rows}
        onClose={() => setIsModalOpen(false)}
        emptyMessage="No hay datos de ranking disponibles."
        className="w-full max-w-[1200px]"
      />
    </>
  );
}