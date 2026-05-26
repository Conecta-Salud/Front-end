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
  onDeactivate,
  onReactivate,
}: {
  onDeactivate: (user: AdminUser) => void;
  onReactivate: (user: AdminUser) => void;
}): RankingColumn<AdminUserTableRow>[] {
  return [
    {
      header: "Nombre",
      key: "fullName",
      truncate: true,
      maxWidth: "max-w-[180px]",
      width: "22%",
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
      render: (row) => roleLabels[row.role],
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
          onDeactivate={onDeactivate}
          onReactivate={onReactivate}
        />
      ),
    },
  ];
}
