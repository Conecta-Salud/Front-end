import { Outlet } from "react-router-dom";

import { useCurrentUserQuery } from "../features/auth/queries/useCurrentUserQuery";
import AppLayout from "../layouts/AppLayout";
import { getE2EUserRole, isE2EAuthBypassEnabled } from "../config/e2e";

export default function ProtectedLayout() {
  const { data: user } = useCurrentUserQuery();
  const role = isE2EAuthBypassEnabled()
    ? getE2EUserRole()
    : user?.role ?? "strategic";

  return (
    <AppLayout role={role}>
      <Outlet />
    </AppLayout>
  );
}
