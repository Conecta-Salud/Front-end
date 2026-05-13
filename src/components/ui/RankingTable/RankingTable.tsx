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

const getCellValue = <T extends RankingTableBaseRow>(
  row: T,
  key: keyof T | string
) => {
  const directValue = row[key as keyof T];

  if (
    directValue !== undefined &&
    directValue !== null &&
    directValue !== ""
  ) {
    return directValue;
  }

  return row.extra?.[String(key)];
};

const formatCellValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "—";

  if (typeof value === "number") {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2,
    }).format(value);
  }

  if (typeof value === "string") {
    return value
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/^\w/, (letter) => letter.toUpperCase());
  }

  return String(value);
};

export const RankingTable = <T extends RankingTableBaseRow>({
  columns,
  data,
  compact = false,
  rowHeight = "md",
  emptyMessage = "No data available.",
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
                  compact ? "text-[14px]" : "text-[18px]",
                  cellPadding,
                  getAlignClass(col.align),
                ].join(" ")}
                style={{ width: col.width }}
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
                  const rawValue = getCellValue(row, col.key);

                  const content = col.render
                    ? col.render(row)
                    : formatCellValue(rawValue);

                  return (
                    <td
                      key={`${String(col.key)}-${index}`}
                      className={[
                        rowHeightClass,
                        cellPadding,
                        compact ? "text-[13px]" : "text-[16px]",
                        "text-black font-normal align-middle",
                        getAlignClass(col.align),
                      ].join(" ")}
                    >
                      <div
                        className={[
                          col.truncate
                            ? "truncate overflow-hidden whitespace-nowrap"
                            : "",
                          col.maxWidth ?? "",
                        ].join(" ")}
                        title={
                          typeof content === "string" ? content : undefined
                        }
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