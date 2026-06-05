import { useCallback, useMemo, useState } from "react";

import RankingTable from "../../../components/ui/RankingTable/RankingTable";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { ADMIN_PAGE_SIZE } from "../constants/adminDisplay.constants";
import { useAdminActivityLogsQuery } from "../queries/adminActivity.queries";
import {
  adaptAdminActivityToRows,
  getAdminActivityColumns,
} from "../utils/adminActivityTable.adapter";
import AdminActivityToolbar from "./AdminActivityToolBar";
import AdminPagination from "./AdminPagination";

export default function AdminActivityView() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm.trim(), 350);
  const [actionFilter, setActionFilter] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [resultFilter, setResultFilter] = useState("");
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  const activityQueryParams = useMemo(
    () => ({
      query: debouncedSearchTerm || undefined,
      action: actionFilter || undefined,
      module: moduleFilter || undefined,
      result: resultFilter || undefined,
      page,
      size: ADMIN_PAGE_SIZE,
    }),
    [debouncedSearchTerm, actionFilter, moduleFilter, resultFilter, page]
  );

  const {
    data: activityData,
    isError: isActivityError,
    isFetching: isActivityFetching,
    isLoading: isActivityLoading,
  } = useAdminActivityLogsQuery(activityQueryParams);

  const rows = useMemo(
    () => adaptAdminActivityToRows(activityData?.items ?? []),
    [activityData?.items]
  );

  const columns = useMemo(() => getAdminActivityColumns(), []);

  const hasPreviousActivityPage = page > 0;
  const hasNextActivityPage =
    typeof activityData?.totalPages === "number"
      ? page + 1 < activityData.totalPages
      : rows.length >= ADMIN_PAGE_SIZE;

  const handlePreviousActivityPage = useCallback(() => {
    setPage((currentPage) => Math.max(currentPage - 1, 0));
  }, []);

  const handleNextActivityPage = useCallback(() => {
    if (!hasNextActivityPage) return;

    setPage((currentPage) => currentPage + 1);
  }, [hasNextActivityPage]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setPage(0);
  }, []);

  const handleActionChange = useCallback((value: string) => {
    setActionFilter(value);
    setPage(0);
  }, []);

  const handleModuleChange = useCallback((value: string) => {
    setModuleFilter(value);
    setPage(0);
  }, []);

  const handleResultChange = useCallback((value: string) => {
    setResultFilter(value);
    setPage(0);
  }, []);

  if (isActivityLoading && rows.length === 0) {
    return (
      <section className="flex min-h-0 flex-1 flex-col rounded-[10px] bg-white p-4 shadow-sm">
        <p className="text-[16px] text-gray-500">Cargando actividad...</p>
      </section>
    );
  }

  if (isActivityError && rows.length === 0) {
    return (
      <section className="flex min-h-0 flex-1 flex-col rounded-[10px] bg-white p-4 shadow-sm">
        <p className="text-[16px] text-red-500">
          No se pudo cargar la actividad.
        </p>
      </section>
    );
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-[10px] bg-white p-4 shadow-sm">
      <div className="mb-3 shrink-0">
        <h2
          className="text-[22px] font-semibold"
          style={{ color: "var(--color-blue)" }}
        >
          Actividad
        </h2>
        <p
          className="text-[16px]"
          style={{ color: "var(--color-gray)" }}
        >
          Consulta los eventos realizados dentro del sistema.
        </p>
      </div>

      <AdminActivityToolbar
        searchTerm={searchTerm}
        actionFilter={actionFilter}
        moduleFilter={moduleFilter}
        resultFilter={resultFilter}
        openFilterId={openFilterId}
        onSearchChange={handleSearchChange}
        onActionChange={handleActionChange}
        onModuleChange={handleModuleChange}
        onResultChange={handleResultChange}
        onOpenFilterChange={setOpenFilterId}
      />

      {isActivityFetching && rows.length > 0 && (
        <p
          className="mb-3 text-[14px]"
          style={{ color: "var(--color-gray)" }}
        >
          Actualizando actividad...
        </p>
      )}

      <div className="min-h-0 flex-1 overflow-auto pr-2">
        <RankingTable
          columns={columns}
          data={rows}
          compact
          rowHeight="sm"
          emptyMessage="No hay registros de actividad."
        />
        <AdminPagination
          hasNextPage={Boolean(hasNextActivityPage)}
          hasPreviousPage={hasPreviousActivityPage}
          isLoading={isActivityFetching}
          onNextPage={handleNextActivityPage}
          onPreviousPage={handlePreviousActivityPage}
        />
      </div>
    </section>
  );
}
