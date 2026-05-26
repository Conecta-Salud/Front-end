import Button from "../../../components/ui/Button/Button";
import Filter from "../../../components/ui/Filter/Filter";
import SearchBar from "../../../components/ui/SearchBar/SearchBar";
import type { AdminUserRole } from "../types/adminUsers.types";

type AdminUsersToolbarProps = {
  searchTerm: string;
  roleFilter: string;
  activeFilter: string;
  departmentFilter: string;
  departmentOptions: Array<{ name: string; value: string }>;
  openFilterId: string | null;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onActiveChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onOpenFilterChange: (id: string | null) => void;
  onCreateUser: () => void;
};

const roleOptions: Array<{ name: string; value: AdminUserRole }> = [
  { name: "Administrador", value: "admin" },
  { name: "Estratégico", value: "strategic" },
];

const activeOptions = [
  { name: "Activo", value: "active" },
  { name: "Inactivo", value: "inactive" },
];

export default function AdminUsersToolbar({
  searchTerm,
  roleFilter,
  activeFilter,
  departmentFilter,
  departmentOptions,
  openFilterId,
  onSearchChange,
  onRoleChange,
  onActiveChange,
  onDepartmentChange,
  onOpenFilterChange,
  onCreateUser,
}: AdminUsersToolbarProps) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <SearchBar
          searchTerm={searchTerm}
          placeholder="Buscar por nombre o correo..."
          onSearch={onSearchChange}
          className="w-full max-w-[360px]"
        />

        <Filter
          id="department"
          title="Dependencia"
          options={departmentOptions}
          values={departmentFilter}
          isOpen={openFilterId === "department"}
          onOpenChange={onOpenFilterChange}
          onChange={onDepartmentChange}
          className="w-fit max-sm:w-full"
        />

        <Filter
          id="role"
          title="Rol"
          options={roleOptions}
          values={roleFilter}
          isOpen={openFilterId === "role"}
          onOpenChange={onOpenFilterChange}
          onChange={onRoleChange}
          className="w-fit max-sm:w-full"
        />

        <Filter
          id="active"
          title="Estado"
          options={activeOptions}
          values={activeFilter}
          isOpen={openFilterId === "active"}
          onOpenChange={onOpenFilterChange}
          onChange={onActiveChange}
          className="w-fit max-sm:w-full"
        />
      </div>

      <Button
        label="Nuevo usuario"
        tone="green"
        height="40"
        buttonType="add"
        onClick={onCreateUser}
      />
    </div>
  );
}
