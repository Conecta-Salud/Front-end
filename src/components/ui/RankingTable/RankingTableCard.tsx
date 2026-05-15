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
        "w-full bg-white rounded-[20px] shadow-sm px-4 py-5",
        className,
      ].join(" ")}
    >
      <h2
        className="text-[20px] font-semibold mb-4"
        style={{
          backgroundImage: "var(--gradient-primary-green)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {title}
      </h2>

      <RankingTable
        columns={columns}
        data={data.slice(0, 6)}
        compact
        rowHeight="sm"
        emptyMessage={emptyMessage}
      />

      {footerText && onFooterClick && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={onFooterClick}
            className="flex items-center gap-2 text-[16px] font-semibold transition-opacity hover:opacity-80"
            style={{
              backgroundImage: "var(--gradient-primary-green)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            <span>{footerText}</span>
            <span className="text-[22px] leading-none">›</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RankingTableCard;