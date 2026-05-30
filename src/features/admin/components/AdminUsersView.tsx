import { useCallback, useMemo, useRef, useState } from "react";

import RankingTable from "../../../components/ui/RankingTable/RankingTable";
import PasswordFormModal from "../../../components/ui/PasswordFormModal/PasswordFormModal";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { useDepartmentsCatalogQuery } from "../../catalogs/queries/catalog.queries";
import { ADMIN_PAGE_SIZE } from "../constants/adminDisplay.constants";
import {
  useAdminUsersInfiniteQuery,
  useDeactivateAdminUserMutation,
  useReactivateAdminUserMutation,
  useChangeAdminUserPasswordMutation,
  useAdminUserDetailQuery,
  useCreateAdminUserMutation,
  useUpdateAdminUserMutation,
} from "../queries/adminUsers.queries";
import type {
  AdminUser,
  AdminUserRole,
  AdminUserStatusAction,
} from "../types/adminUsers.types";
import { flattenAdminPages } from "../utils/adminPagination.utils";
import {
  adaptAdminUsersToRows,
  getAdminUsersColumns,
} from "../utils/adminUsersTable.adapter";
import { useInfiniteScrollLoad } from "../utils/useInfiniteScrollLoad";
import AdminLoadMoreFooter from "./AdminLoadMoreFooter";
import AdminUsersToolbar from "./AdminUsersToolBar";
import UserFormModal from "./UserFormModal";
import UserStatusConfirmModal from "./UserStatusConfirmModal";

export default function AdminUsersView() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm.trim(), 350);
  const [roleFilter, setRoleFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);
  const [userToChangePassword, setUserToChangePassword] =
    useState<AdminUser | null>(null);
  const [userToEdit, setUserToEdit] = useState<AdminUser | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const tableScrollRef = useRef<HTMLDivElement | null>(null);
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
      size: ADMIN_PAGE_SIZE,
    }),
    [debouncedSearchTerm, roleFilter, activeFilter, departmentFilter]
  );
  const {
    data: usersData,
    fetchNextPage: fetchNextUsersPage,
    hasNextPage: hasNextUsersPage,
    isError: isUsersError,
    isFetching: isUsersFetching,
    isFetchingNextPage: isFetchingNextUsersPage,
    isLoading: isUsersLoading,
  } = useAdminUsersInfiniteQuery(usersQueryParams);
  const deactivateUserMutation = useDeactivateAdminUserMutation();
  const reactivateUserMutation = useReactivateAdminUserMutation();
  const changePasswordMutation = useChangeAdminUserPasswordMutation();
  const resetDeactivateUserMutation = deactivateUserMutation.reset;
  const resetReactivateUserMutation = reactivateUserMutation.reset;
  const userDetailQuery = useAdminUserDetailQuery(userToEdit?.id ?? null);
  const departmentsQuery = useDepartmentsCatalogQuery();
  const createUserMutation = useCreateAdminUserMutation();
  const updateUserMutation = useUpdateAdminUserMutation();
  const [statusActionUser, setStatusActionUser] = useState<AdminUser | null>(
    null
  );
  const [statusAction, setStatusAction] =
    useState<AdminUserStatusAction | null>(null);

  const loadedUsers = useMemo(
    () => flattenAdminPages<AdminUser>(usersData?.pages),
    [usersData?.pages]
  );

  const rows = useMemo(
    () => adaptAdminUsersToRows(loadedUsers),
    [loadedUsers]
  );

  const departmentOptions = useMemo(() => {
    return (departmentsQuery.data ?? []).map((department) => ({
      name: department.name,
      value: String(department.id),
    }));
  }, [departmentsQuery.data]);
  const resetStatusMutations = useCallback(() => {
    resetDeactivateUserMutation();
    resetReactivateUserMutation();
  }, [resetDeactivateUserMutation, resetReactivateUserMutation]);

  const openStatusAction = useCallback(
    (user: AdminUser, action: AdminUserStatusAction) => {
      setStatusActionUser(user);
      setStatusAction(action);
      resetStatusMutations();
    },
    [resetStatusMutations]
  );

  const columns = useMemo(
    () =>
      getAdminUsersColumns({
        onEdit: setUserToEdit,
        onDeactivate: (user) => openStatusAction(user, "deactivate"),
        onReactivate: (user) => openStatusAction(user, "reactivate"),
        onChangePassword: setUserToChangePassword,
      }),
    [openStatusAction]
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

  const handleChangePassword = async ({
    newPassword,
  }: {
    currentPassword?: string;
    newPassword: string;
  }) => {
    if (!userToChangePassword) return;

    try {
      await changePasswordMutation.mutateAsync({
        userId: userToChangePassword.id,
        payload: {
          newPassword,
          revokeSessions: true,
        },
      });

      setUserToChangePassword(null);
      changePasswordMutation.reset();
    } catch {
      // El modal muestra el error con isError.
    }
  };

  const isStatusActionPending =
    deactivateUserMutation.isPending || reactivateUserMutation.isPending;

  const isStatusActionError =
    deactivateUserMutation.isError || reactivateUserMutation.isError;

  const handleLoadMoreUsers = useCallback(() => {
    if (!hasNextUsersPage || isFetchingNextUsersPage) return;

    void fetchNextUsersPage();
  }, [fetchNextUsersPage, hasNextUsersPage, isFetchingNextUsersPage]);

  const loadMoreSentinelRef = useInfiniteScrollLoad({
    rootRef: tableScrollRef,
    enabled: Boolean(hasNextUsersPage),
    isLoading: isFetchingNextUsersPage,
    onLoadMore: handleLoadMoreUsers,
  });

  const isRefreshingUsers = isUsersFetching && !isFetchingNextUsersPage;

  if (isUsersLoading && rows.length === 0) {
    return (
      <section className="rounded-[10px] bg-white p-6 shadow-sm">
        <p className="text-[16px] text-gray-500">Cargando usuarios...</p>
      </section>
    );
  }

  if (isUsersError && rows.length === 0) {
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
        onCreateUser={() => setIsCreateModalOpen(true)}
      />
      {isRefreshingUsers && rows.length > 0 && (
        <p className="mb-3 text-[14px] text-gray-500">
          Actualizando usuarios...
        </p>
      )}
      
      <div ref={tableScrollRef} className="min-h-0 flex-1 overflow-auto pr-2">
        <RankingTable
          columns={columns}
          data={rows}
          compact
          rowHeight="sm"
          emptyMessage="No hay usuarios registrados."
        />
        {hasNextUsersPage && (
          <div ref={loadMoreSentinelRef} className="h-2" aria-hidden="true" />
        )}
        <AdminLoadMoreFooter
          hasNextPage={Boolean(hasNextUsersPage)}
          isFetchingNextPage={isFetchingNextUsersPage}
          loadedCount={rows.length}
          loadingLabel="Cargando mas usuarios..."
          loadMoreLabel="Cargar mas usuarios"
          completedLabel="Todos los usuarios visibles estan cargados."
          errorLabel="No se pudo cargar la siguiente pagina de usuarios."
          isError={isUsersError}
          onLoadMore={handleLoadMoreUsers}
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
            resetStatusMutations();
          }
        }}
        onConfirm={handleConfirmStatusAction}
      />
      <PasswordFormModal
        isOpen={Boolean(userToChangePassword)}
        title="Cambiar contraseña"
        description={
          userToChangePassword ? (
            <>
              Actualiza la contraseña de{" "}
              <span className="font-semibold">
                {userToChangePassword.fullName || userToChangePassword.email}
              </span>
              .
            </>
          ) : undefined
        }
        requireCurrentPassword={false}
        isSaving={changePasswordMutation.isPending}
        isError={changePasswordMutation.isError}
        errorMessage="No se pudo cambiar la contraseña. Intenta nuevamente."
        onClose={() => {
          if (!changePasswordMutation.isPending) {
            setUserToChangePassword(null);
            changePasswordMutation.reset();
          }
        }}
        onSubmit={handleChangePassword}
      />

      <UserFormModal
        mode="create"
        isOpen={isCreateModalOpen}
        departments={departmentsQuery.data ?? []}
        isSaving={createUserMutation.isPending}
        isError={createUserMutation.isError}
        onClose={() => {
          if (!createUserMutation.isPending) {
            setIsCreateModalOpen(false);
            createUserMutation.reset();
          }
        }}
        onCreate={async (payload) => {
          await createUserMutation.mutateAsync(payload);
          setIsCreateModalOpen(false);
        }}
        onUpdate={() => {}}
      />

      <UserFormModal
        mode="edit"
        isOpen={Boolean(userToEdit)}
        user={userDetailQuery.data}
        departments={departmentsQuery.data ?? []}
        isLoadingUser={userDetailQuery.isLoading}
        isSaving={updateUserMutation.isPending}
        isError={updateUserMutation.isError}
        onClose={() => {
          if (!updateUserMutation.isPending) {
            setUserToEdit(null);
            updateUserMutation.reset();
          }
        }}
        onCreate={() => {}}
        onUpdate={async (userId, payload) => {
          await updateUserMutation.mutateAsync({ userId, payload });
          setUserToEdit(null);
        }}
      />
    </section>
  );
}
