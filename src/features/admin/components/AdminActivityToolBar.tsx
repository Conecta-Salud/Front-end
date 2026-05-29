import Filter from "../../../components/ui/Filter/Filter";
import SearchBar from "../../../components/ui/SearchBar/SearchBar";

type AdminActivityToolbarProps = {
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
};

const actionOptions = [
  { name: "Inicio de sesión", value: "LOGIN" },
  { name: "Comparación de estados", value: "COMPARE_STATES" },
  { name: "Comparación de municipios", value: "COMPARE_MUNICIPALITIES" },
];

const moduleOptions = [
  { name: "Autenticación", value: "auth" },
  { name: "Comparación", value: "comparison" },
  { name: "Dashboard", value: "dashboard" },
  { name: "Administración", value: "admin" },
];

const resultOptions = [
  { name: "Exitoso", value: "success" },
  { name: "Error", value: "error" },
  { name: "Fallido", value: "failure" },
];

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
    <div className="mb-3 flex shrink-0 flex-wrap items-center gap-3">
      <SearchBar
        searchTerm={searchTerm}
        placeholder="Buscar por correo, usuario o detalle..."
        onSearch={onSearchChange}
        className="w-full max-w-[360px]"
      />

      <Filter
        id="activity-action"
        title="Acción"
        options={actionOptions}
        values={actionFilter}
        isOpen={openFilterId === "activity-action"}
        onOpenChange={onOpenFilterChange}
        onChange={onActionChange}
        className="w-fit max-sm:w-full"
      />

      <Filter
        id="activity-module"
        title="Módulo"
        options={moduleOptions}
        values={moduleFilter}
        isOpen={openFilterId === "activity-module"}
        onOpenChange={onOpenFilterChange}
        onChange={onModuleChange}
        className="w-fit max-sm:w-full"
      />

      <Filter
        id="activity-result"
        title="Estado"
        options={resultOptions}
        values={resultFilter}
        isOpen={openFilterId === "activity-result"}
        onOpenChange={onOpenFilterChange}
        onChange={onResultChange}
        className="w-fit max-sm:w-full"
      />
    </div>
  );
}
