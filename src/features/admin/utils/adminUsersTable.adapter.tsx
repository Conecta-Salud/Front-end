import type { RankingColumn } from "../../../components/ui/RankingTable/RankingTable.types";
import UserActionsMenu from "../components/UserActionsMenu";
import { ADMIN_ROLE_LABELS } from "../constants/adminDisplay.constants";
import type { AdminUser, AdminUserTableRow } from "../types/adminUsers.types";

export function adaptAdminUsersToRows(users: AdminUser[]): AdminUserTableRow[] {
  return users.map((user) => ({
    id: user.id,
    fullName:
      user.fullName?.trim() ||
      [user.firstName, user.lastName].filter(Boolean).join(" ").trim(),
    email: user.email,
    departmentName: user.departmentName,
    role: user.role,
    active: user.active,
    originalUser: user,
  }));
}

export function getAdminUsersColumns({
  onDeactivate,
  onReactivate,
  onChangePassword,
  onEdit,
}: {
  onDeactivate: (user: AdminUser) => void;
  onReactivate: (user: AdminUser) => void;
  onChangePassword: (user: AdminUser) => void;
  onEdit: (user: AdminUser) => void;
}): RankingColumn<AdminUserTableRow>[] {
  return [
    {
      header: "Nombre",
      key: "fullName",
      truncate: true,
      maxWidth: "max-w-[180px]",
      width: "22%",
      render: (row) => row.fullName,
    },
    {
      header: "Correo",
      key: "email",
      truncate: true,
      maxWidth: "max-w-[220px]",
      width: "26%",
    },
    {
      header: "Dependencia",
      key: "departmentName",
      truncate: true,
      maxWidth: "max-w-[210px]",
      width: "24%",
    },
    {
      header: "Rol",
      key: "role",
      align: "center",
      width: "12%",
      render: (row) => ADMIN_ROLE_LABELS[row.role],
    },
    {
      header: "Estado",
      key: "active",
      align: "center",
      width: "10%",
      render: (row) => (row.active ? "Activo" : "Inactivo"),
    },
    {
      header: "Acciones",
      key: "actions",
      align: "center",
      width: "6%",
      render: (row) => (
        <UserActionsMenu
          user={row.originalUser}
          onEdit={onEdit}
          onDeactivate={onDeactivate}
          onReactivate={onReactivate}
          onChangePassword={onChangePassword}
        />
      ),
    },
  ];
}
