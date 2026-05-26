import type { RankingColumn } from "../../../components/ui/RankingTable/RankingTable.types";
import UserActionsMenu from "../components/UserActionsMenu";
import type { AdminUser, AdminUserTableRow } from "../types/adminUsers.types";

const roleLabels = {
  admin: "Administrador",
  strategic: "Estratégico",
};

export function adaptAdminUsersToRows(users: AdminUser[]): AdminUserTableRow[] {
  return users.map((user) => ({
    id: user.id,
    fullName:
      user.fullName ||
      [user.firstName, user.lastName].filter(Boolean).join(" ").trim(),
    email: user.email,
    departmentName: user.departmentName,
    role: user.role,
    active: user.active,
    originalUser: user,
  }));
}

export function getAdminUsersColumns({
  onEdit,
  onDeactivate,
  onReactivate,
}: {
  onEdit: (user: AdminUser) => void;
  onDeactivate: (user: AdminUser) => void;
  onReactivate: (user: AdminUser) => void;
}): RankingColumn<AdminUserTableRow>[] {
  return [
    {
      header: "Nombre",
      key: "fullName",
      truncate: true,
      maxWidth: "max-w-[220px]",
    },
    {
      header: "Correo",
      key: "email",
      truncate: true,
      maxWidth: "max-w-[240px]",
    },
    {
      header: "Dependencia",
      key: "departmentName",
      truncate: true,
      maxWidth: "max-w-[220px]",
    },
    {
      header: "Rol",
      key: "role",
      align: "center",
      render: (row) => roleLabels[row.role],
    },
    {
      header: "Estado",
      key: "active",
      align: "center",
      render: (row) => (row.active ? "Activo" : "Inactivo"),
    },
    {
      header: "Acciones",
      key: "actions",
      align: "center",
      render: (row) => (
        <UserActionsMenu
          user={row.originalUser}
          onEdit={onEdit}
          onDeactivate={onDeactivate}
          onReactivate={onReactivate}
        />
      ),
    },
  ];
}
