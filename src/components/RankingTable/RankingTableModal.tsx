import RankingTable from "./RankingTable";
import type {
  RankingTableBaseRow,
  RankingTableModalProps,
} from "./RankingTable.types";
import closeIcon from "../../assets/icons/closeIcon.svg";

export const RankingTableModal = <T extends RankingTableBaseRow>({
  isOpen,
  title,
  columns,
  data,
  onClose,
  emptyMessage,
  className = "",
}: RankingTableModalProps<T>) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-6">
      <div
        className={[
          "relative max-w-[1000px] max-h-[90vh] overflow-hidden rounded-[30px] bg-white shadow-xl",
          className,
        ].join(" ")}
      >
        <div className="px-12 pt-10 pb-6">
          <div className="flex items-start justify-between gap-4 mb-8">
            <h2
              className="text-[20px] leading-none font-semibold"
              style={{
                backgroundImage: "var(--gradient-primary-green)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="shrink-0 transition-transform hover:scale-105"
              aria-label="Cerrar modal"
            >
              <img
                src={closeIcon}
                alt="Cerrar"
                className="w-[24px] h-[24px] object-contain"
              />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-auto pr-2">
            <RankingTable
              columns={columns}
              data={data}
              rowHeight="lg"
              emptyMessage={emptyMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingTableModal;