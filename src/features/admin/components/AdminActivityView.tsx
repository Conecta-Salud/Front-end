import { useEffect, useMemo, useState } from "react";

import RankingTable from "../../../components/ui/RankingTable/RankingTable";
import { useAdminActivityLogsQuery } from "../queries/adminActivity.queries";
import {
  adaptAdminActivityToRows,
  getAdminActivityColumns,
} from "../utils/adminActivityTable.adapter";
import AdminActivityToolbar from "./AdminActivityToolBar";

export default function AdminActivityView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [resultFilter, setResultFilter] = useState("");
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const activityQueryParams = useMemo(
    () => ({
      query: debouncedSearchTerm || undefined,
      action: actionFilter || undefined,
      module: moduleFilter || undefined,
      result: resultFilter || undefined,
      page: 0,
      size: 50,
    }),
    [debouncedSearchTerm, actionFilter, moduleFilter, resultFilter]
  );

  const activityQuery = useAdminActivityLogsQuery(activityQueryParams);

  const rows = useMemo(
    () => adaptAdminActivityToRows(activityQuery.data?.items ?? []),
    [activityQuery.data]
  );

  const columns = useMemo(() => getAdminActivityColumns(), []);

  if (activityQuery.isLoading && !activityQuery.data) {
    return (
      <section className="flex min-h-0 flex-1 flex-col rounded-[10px] bg-white p-4 shadow-sm">
        <p className="text-[16px] text-gray-500">Cargando actividad...</p>
      </section>
    );
  }

  if (activityQuery.isError) {
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

      {activityQuery.isFetching && (
        <p className="mb-3 text-[14px] text-gray-500">
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
      </div>
    </section>
  );
}
