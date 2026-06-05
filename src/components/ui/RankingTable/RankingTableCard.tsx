import RankingTable from "./RankingTable";
import type {
  RankingTableBaseRow,
  RankingTableCardProps,
} from "./RankingTable.types";

export const RankingTableCard = <T extends RankingTableBaseRow>({
  title,
  columns,
  data,
  footerText = "Ver ranking completo",
  onFooterClick,
  className = "",
  emptyMessage,
}: RankingTableCardProps<T>) => {

  return (
    <div
      className={[
        "flex h-full min-h-0 w-full flex-col rounded-[20px] bg-white px-4 py-5 shadow-sm",
        className,
      ].join(" ")}
    >
      <h2
        className="mb-4 shrink-0 text-[20px] font-semibold"
        style={{ color: "var(--color-blue)" }}
      >
        {title}
      </h2>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <RankingTable
          columns={columns}
          data={data.slice(0, 8)}
          compact
          rowHeight="sm"
          emptyMessage={emptyMessage}
        />
      </div>

      {footerText && onFooterClick && (
        <div className="mt-4 flex shrink-0 justify-center">
          <button
            type="button"
            onClick={onFooterClick}
            className="flex items-center gap-2 text-[16px] font-semibold transition-opacity hover:opacity-80"
            style={{ color: "var(--color-blue)" }}
          >
            <span>{footerText}</span>
            <span className="text-[22px] leading-none">&gt;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RankingTableCard;
