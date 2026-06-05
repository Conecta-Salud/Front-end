import { createPortal } from "react-dom";
import RankingTable from "./RankingTable";
import type {
  RankingTableBaseRow,
  RankingTableModalProps,
} from "./RankingTable.types";
import closeIcon from "../../../assets/icons/closeIcon.svg";

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

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 py-6">
      <div
        className={[
          "relative w-full max-w-[1200px] max-h-[90vh] overflow-hidden rounded-[30px] bg-white shadow-2xl",
          className,
        ].join(" ")}
      >
        <div className="px-12 pt-10 pb-6">
          <div className="flex items-start justify-between gap-4 mb-8">
            <h2
              className="text-[24px] leading-tight font-semibold"
              style={{ color: "var(--color-blue)" }}
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
    </div>,
    document.body
  );
};

export default RankingTableModal;
