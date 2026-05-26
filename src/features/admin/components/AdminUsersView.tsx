import { useMemo, useState, useEffect } from "react";

import RankingTable from "../../../components/ui/RankingTable/RankingTable";
import {
  useAdminUsersQuery,
  useDeactivateAdminUserMutation,
  useReactivateAdminUserMutation,
} from "../queries/adminUsers.queries";
import {
  adaptAdminUsersToRows,
  getAdminUsersColumns,
} from "../utils/adminUsersTable.adapter";
import AdminUsersToolbar from "./AdminUsersToolBar";
import type {
  AdminUser,
  AdminUserRole,
  AdminUserStatusAction,
} from "../types/adminUsers.types";
import UserStatusConfirmModal from "./UserStatusConfirmModal";
export default function AdminUsersView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);
  const usersQueryParams = useMemo(
    () => ({
      search: debouncedSearchTerm || undefined,
      role: roleFilter ? (roleFilter as AdminUserRole) : undefined,
      active:
        activeFilter === "active"
          ? true
          : activeFilter === "inactive"
          ? false
          : undefined,
      departmentId: departmentFilter ? Number(departmentFilter) : undefined,
      page: 0,
      size: 50,
    }),
    [debouncedSearchTerm, roleFilter, activeFilter, departmentFilter]
  );
  const usersQuery = useAdminUsersQuery(usersQueryParams);
  const deactivateUserMutation = useDeactivateAdminUserMutation();
  const reactivateUserMutation = useReactivateAdminUserMutation();
  const [statusActionUser, setStatusActionUser] = useState<AdminUser | null>(
    null
  );
  const [statusAction, setStatusAction] =
    useState<AdminUserStatusAction | null>(null);
  const [userToEdit, setUserToEdit] = useState<AdminUser | null>(null);

  const rows = useMemo(
    () => adaptAdminUsersToRows(usersQuery.data?.items ?? []),
    [usersQuery.data]
  );

  const departmentOptions = useMemo(() => {
    const departments = new Map<number, string>();

    usersQuery.data?.items.forEach((user) => {
      departments.set(user.departmentId, user.departmentName);
    });

    return Array.from(departments.entries()).map(([id, name]) => ({
      name,
      value: String(id),
    }));
  }, [usersQuery.data]);
  const openStatusAction = (user: AdminUser, action: AdminUserStatusAction) => {
    setStatusActionUser(user);
    setStatusAction(action);
    deactivateUserMutation.reset();
    reactivateUserMutation.reset();
  };

  const columns = useMemo(
    () =>
      getAdminUsersColumns({
        onEdit: setUserToEdit,
        onDeactivate: (user) => openStatusAction(user, "deactivate"),
        onReactivate: (user) => openStatusAction(user, "reactivate"),
      }),
    []
  );

  const handleConfirmStatusAction = async (
    user: AdminUser,
    action: AdminUserStatusAction
  ) => {
    try {
      if (action === "deactivate") {
        await deactivateUserMutation.mutateAsync(user.id);
      } else {
        await reactivateUserMutation.mutateAsync(user.id);
      }

      setStatusActionUser(null);
      setStatusAction(null);
    } catch {
      // El modal muestra el error con isError.
    }
  };

  const isStatusActionPending =
    deactivateUserMutation.isPending || reactivateUserMutation.isPending;

  const isStatusActionError =
    deactivateUserMutation.isError || reactivateUserMutation.isError;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  if (usersQuery.isLoading && !usersQuery.data) {
    return (
      <section className="rounded-[10px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-gray-500">Cargando usuarios...</p>
      </section>
    );
  }

  if (usersQuery.isError) {
    return (
      <section className="rounded-[10px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-red-500">
          No se pudieron cargar los usuarios.
        </p>
      </section>
    );
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-[10px] bg-white p-4 shadow-sm">
      <div className="mb-3 shrink-0">
        <h2 className="text-[22px] font-semibold text-black">Usuarios</h2>
        <p className="text-[16px] text-gray-500">
          Consulta y administra los usuarios registrados.
        </p>
      </div>
      <AdminUsersToolbar
        searchTerm={searchTerm}
        roleFilter={roleFilter}
        activeFilter={activeFilter}
        departmentFilter={departmentFilter}
        departmentOptions={departmentOptions}
        openFilterId={openFilterId}
        onSearchChange={setSearchTerm}
        onRoleChange={setRoleFilter}
        onActiveChange={setActiveFilter}
        onDepartmentChange={setDepartmentFilter}
        onOpenFilterChange={setOpenFilterId}
        onCreateUser={() => {
          // Aquí luego abrimos UserCreateModal.
        }}
      />
      {usersQuery.isFetching && (
        <p className="mb-3 text-[14px] text-gray-500">
          Actualizando usuarios...
        </p>
      )}
      <div className="min-h-0 flex-1 overflow-auto pr-2">
        <RankingTable
          columns={columns}
          data={rows}
          compact
          rowHeight="sm"
          emptyMessage="No hay usuarios registrados."
        />
      </div>
      <UserStatusConfirmModal
        user={statusActionUser}
        action={statusAction}
        isOpen={Boolean(statusActionUser && statusAction)}
        isPending={isStatusActionPending}
        isError={isStatusActionError}
        onClose={() => {
          if (!isStatusActionPending) {
            setStatusActionUser(null);
            setStatusAction(null);
            deactivateUserMutation.reset();
            reactivateUserMutation.reset();
          }
        }}
        onConfirm={handleConfirmStatusAction}
      />
    </section>
  );
}
