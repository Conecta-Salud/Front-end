import { useMemo, useState } from "react";
import { useUploadBatchDetailQuery } from "../queries/adminUploads.queries";
import type { UploadBatchSummary } from "../types/adminUploads.types";
import {
  getAllowedRolesForSourceType,
  getPresetForSourceType,
} from "./adminUploadsView.helpers";
import UploadBatchCreator from "./UploadBatchCreator";
import UploadBatchHistory from "./UploadBatchHistory";
import UploadBatchStatusCard from "./UploadBatchStatusCard";
import UploadErrorsTable from "./UploadErrorsTable";
import UploadFileStep from "./UploadFileStep";
import UploadProcessStep from "./UploadProcessStep";
import UploadValidationStep from "./UploadValidationStep";

export default function AdminUploadsPanel() {
  const [activeBatch, setActiveBatch] = useState<UploadBatchSummary | null>(
    null
  );
  const activeBatchId = activeBatch?.id ?? null;
  const batchDetailQuery = useUploadBatchDetailQuery(activeBatchId);
  const detail = batchDetailQuery.data;
  const batch = detail?.batch ?? activeBatch;
  const allowedRoles = useMemo(
    () => getAllowedRolesForSourceType(batch?.sourceType),
    [batch?.sourceType]
  );
  const selectedPreset = getPresetForSourceType(batch?.sourceType);

  return (
    <section className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="rounded-[10px] bg-white p-5 shadow-sm">
        <h2 className="text-[22px] font-semibold text-black">
          Cargas administrativas
        </h2>
        <p className="mt-1 text-[15px] text-gray-500">
          Crea batches, sube CSVs oficiales, valida archivos y procesa datos
          desde el panel administrador.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-4">
          <UploadBatchCreator onBatchCreated={setActiveBatch} />

          <UploadBatchStatusCard
            detail={detail}
            batch={activeBatch ?? undefined}
            isLoading={Boolean(activeBatchId) && batchDetailQuery.isLoading}
          />

          {batchDetailQuery.isError && (
            <div className="rounded-[10px] bg-red-50 p-4 text-[14px] text-red-700 shadow-sm">
              No se pudo cargar el detalle del batch seleccionado.
            </div>
          )}

          {batch && selectedPreset && (
            <div className="rounded-[10px] bg-white p-4 shadow-sm">
              <p className="text-[14px] font-semibold text-black">
                Guía del preset activo
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-gray-500">
                {selectedPreset.help.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <UploadFileStep detail={detail} allowedRoles={allowedRoles} />
          <UploadValidationStep detail={detail} />
          <UploadProcessStep detail={detail} />
          <UploadErrorsTable batchId={activeBatchId} />
        </div>

        <aside className="flex min-w-0 flex-col gap-4">
          <UploadBatchHistory
            selectedBatchId={activeBatchId}
            onSelectBatch={setActiveBatch}
          />
        </aside>
      </div>
    </section>
  );
}
