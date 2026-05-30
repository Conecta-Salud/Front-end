import Button from "../../../components/ui/Button/Button";
import Filter from "../../../components/ui/Filter/Filter";
import SearchBar from "../../../components/ui/SearchBar/SearchBar";
import {
  ADMIN_ACTIVE_OPTIONS,
  ADMIN_ROLE_OPTIONS,
} from "../constants/adminDisplay.constants";

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
    <div className="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-3">
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
          options={ADMIN_ROLE_OPTIONS}
          values={roleFilter}
          isOpen={openFilterId === "role"}
          onOpenChange={onOpenFilterChange}
          onChange={onRoleChange}
          className="w-fit max-sm:w-full"
        />

        <Filter
          id="active"
          title="Estado"
          options={ADMIN_ACTIVE_OPTIONS}
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
