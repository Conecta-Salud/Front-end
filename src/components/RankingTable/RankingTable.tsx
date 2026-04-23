import type {
  RankingTableBaseRow,
  RankingTableProps,
} from "./RankingTable.types";

const getAlignClass = (align?: "left" | "center" | "right") => {
  switch (align) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    case "left":
    default:
      return "text-left";
  }
};

const getRowHeightClass = (rowHeight: "sm" | "md" | "lg") => {
  switch (rowHeight) {
    case "sm":
      return "py-3";
    case "lg":
      return "py-6";
    case "md":
    default:
      return "py-4";
  }
};

export const RankingTable = <T extends RankingTableBaseRow>({
  columns,
  data,
  compact = false,
  rowHeight = "md",
  emptyMessage = "No hay datos disponibles.",
  className = "",
}: RankingTableProps<T>) => {
  const cellPadding = compact ? "px-2" : "px-3";
  const rowHeightClass = getRowHeightClass(rowHeight);

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr className="border-b-[2px] border-[#57D8BE]">
            {columns.map((col, index) => (
              <th
                key={`${String(col.key)}-${index}`}
                className={[
                  "pb-4 font-semibold text-black",
                  compact ? "text-[18px]" : "text-[20px]",
                  cellPadding,
                  getAlignClass(col.align),
                ].join(" ")}
              >
                <div
                  className={[
                    col.truncate ? "truncate" : "",
                    col.maxWidth ?? "",
                  ].join(" ")}
                  title={col.header}
                >
                  {col.header}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-gray-500 text-[16px]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className="border-b-[2px] border-[#57D8BE] last:border-b-[2px]"
              >
                {columns.map((col, index) => {
                  const content = col.render
                    ? col.render(row)
                    : String(row[col.key] ?? "");

                  return (
                    <td
                      key={`${String(col.key)}-${index}`}
                      className={[
                        rowHeightClass,
                        cellPadding,
                        compact ? "text-[16px]" : "text-[18px]",
                        "text-black font-normal align-middle",
                        getAlignClass(col.align),
                      ].join(" ")}
                    >
                      <div
                        className={[
                          col.truncate ? "truncate overflow-hidden whitespace-nowrap" : "",
                          col.maxWidth ?? "",
                        ].join(" ")}
                        title={typeof content === "string" ? content : undefined}
                      >
                        {content}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;