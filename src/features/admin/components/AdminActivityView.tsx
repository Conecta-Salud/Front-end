import { useCallback, useMemo, useRef, useState } from "react";

import RankingTable from "../../../components/ui/RankingTable/RankingTable";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { ADMIN_PAGE_SIZE } from "../constants/adminDisplay.constants";
import { useAdminActivityLogsInfiniteQuery } from "../queries/adminActivity.queries";
import type { AdminActivityLog } from "../types/adminActivity.types";
import { flattenAdminPages } from "../utils/adminPagination.utils";
import {
  adaptAdminActivityToRows,
  getAdminActivityColumns,
} from "../utils/adminActivityTable.adapter";
import { useInfiniteScrollLoad } from "../utils/useInfiniteScrollLoad";
import AdminActivityToolbar from "./AdminActivityToolBar";
import AdminLoadMoreFooter from "./AdminLoadMoreFooter";

export default function AdminActivityView() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm.trim(), 350);
  const [actionFilter, setActionFilter] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [resultFilter, setResultFilter] = useState("");
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);
  const tableScrollRef = useRef<HTMLDivElement | null>(null);

  const activityQueryParams = useMemo(
    () => ({
      query: debouncedSearchTerm || undefined,
      action: actionFilter || undefined,
      module: moduleFilter || undefined,
      result: resultFilter || undefined,
      size: ADMIN_PAGE_SIZE,
    }),
    [debouncedSearchTerm, actionFilter, moduleFilter, resultFilter]
  );

  const {
    data: activityData,
    fetchNextPage: fetchNextActivityPage,
    hasNextPage: hasNextActivityPage,
    isError: isActivityError,
    isFetching: isActivityFetching,
    isFetchingNextPage: isFetchingNextActivityPage,
    isLoading: isActivityLoading,
  } = useAdminActivityLogsInfiniteQuery(activityQueryParams);

  const loadedLogs = useMemo(
    () => flattenAdminPages<AdminActivityLog>(activityData?.pages),
    [activityData?.pages]
  );

  const rows = useMemo(
    () => adaptAdminActivityToRows(loadedLogs),
    [loadedLogs]
  );

  const columns = useMemo(() => getAdminActivityColumns(), []);

  const handleLoadMoreActivity = useCallback(() => {
    if (!hasNextActivityPage || isFetchingNextActivityPage) return;

    void fetchNextActivityPage();
  }, [
    fetchNextActivityPage,
    hasNextActivityPage,
    isFetchingNextActivityPage,
  ]);

  const loadMoreSentinelRef = useInfiniteScrollLoad({
    rootRef: tableScrollRef,
    enabled: Boolean(hasNextActivityPage),
    isLoading: isFetchingNextActivityPage,
    onLoadMore: handleLoadMoreActivity,
  });

  const isRefreshingActivity =
    isActivityFetching && !isFetchingNextActivityPage;

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
        <h2 className="text-[22px] font-semibold text-black">Actividad</h2>
        <p className="text-[16px] text-gray-500">
          Consulta los eventos realizados dentro del sistema.
        </p>
      </div>

      <AdminActivityToolbar
        searchTerm={searchTerm}
        actionFilter={actionFilter}
        moduleFilter={moduleFilter}
        resultFilter={resultFilter}
        openFilterId={openFilterId}
        onSearchChange={setSearchTerm}
        onActionChange={setActionFilter}
        onModuleChange={setModuleFilter}
        onResultChange={setResultFilter}
        onOpenFilterChange={setOpenFilterId}
      />

      {isRefreshingActivity && rows.length > 0 && (
        <p className="mb-3 text-[14px] text-gray-500">
          Actualizando actividad...
        </p>
      )}

      <div ref={tableScrollRef} className="min-h-0 flex-1 overflow-auto pr-2">
        <RankingTable
          columns={columns}
          data={rows}
          compact
          rowHeight="sm"
          emptyMessage="No hay registros de actividad."
        />
        {hasNextActivityPage && (
          <div ref={loadMoreSentinelRef} className="h-2" aria-hidden="true" />
        )}
        <AdminLoadMoreFooter
          hasNextPage={Boolean(hasNextActivityPage)}
          isFetchingNextPage={isFetchingNextActivityPage}
          loadedCount={rows.length}
          loadingLabel="Cargando mas actividad..."
          loadMoreLabel="Cargar mas actividad"
          completedLabel="Toda la actividad visible esta cargada."
          errorLabel="No se pudo cargar la siguiente pagina de actividad."
          isError={isActivityError}
          onLoadMore={handleLoadMoreActivity}
        />
      </div>
    </section>
  );
}
