import Filter from "../../../components/ui/Filter/Filter";
import SearchBar from "../../../components/ui/SearchBar/SearchBar";
import {
  ADMIN_ACTIVITY_ACTION_OPTIONS,
  ADMIN_ACTIVITY_MODULE_OPTIONS,
  ADMIN_ACTIVITY_RESULT_OPTIONS,
} from "../constants/adminDisplay.constants";

type AdminActivityToolbarProps = Readonly<{
  searchTerm: string;
  actionFilter: string;
  moduleFilter: string;
  resultFilter: string;
  openFilterId: string | null;
  onSearchChange: (value: string) => void;
  onActionChange: (value: string) => void;
  onModuleChange: (value: string) => void;
  onResultChange: (value: string) => void;
  onOpenFilterChange: (id: string | null) => void;
}>;

export default function AdminActivityToolbar({
  searchTerm,
  actionFilter,
  moduleFilter,
  resultFilter,
  openFilterId,
  onSearchChange,
  onActionChange,
  onModuleChange,
  onResultChange,
  onOpenFilterChange,
}: AdminActivityToolbarProps) {
  return (
    <div className="mb-9 flex shrink-0 flex-wrap items-center gap-3">
      <SearchBar
        searchTerm={searchTerm}
        placeholder="Buscar por correo, usuario o detalle..."
        onSearch={onSearchChange}
        className="w-full max-w-[360px]"
      />

      <Filter
        id="activity-action"
        title="Acción"
        options={ADMIN_ACTIVITY_ACTION_OPTIONS}
        values={actionFilter}
        isOpen={openFilterId === "activity-action"}
        onOpenChange={onOpenFilterChange}
        onChange={onActionChange}
        className="w-fit max-sm:w-full"
      />

      <Filter
        id="activity-module"
        title="Módulo"
        options={ADMIN_ACTIVITY_MODULE_OPTIONS}
        values={moduleFilter}
        isOpen={openFilterId === "activity-module"}
        onOpenChange={onOpenFilterChange}
        onChange={onModuleChange}
        className="w-fit max-sm:w-full"
      />

      <Filter
        id="activity-result"
        title="Estado"
        options={ADMIN_ACTIVITY_RESULT_OPTIONS}
        values={resultFilter}
        isOpen={openFilterId === "activity-result"}
        onOpenChange={onOpenFilterChange}
        onChange={onResultChange}
        className="w-fit max-sm:w-full"
      />
    </div>
  );
}
