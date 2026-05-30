import { Outlet } from "react-router-dom";

import { useCurrentUserQuery } from "../features/auth/queries/useCurrentUserQuery";
import AppLayout from "../layouts/AppLayout";

export default function ProtectedLayout() {
  const { data: user } = useCurrentUserQuery();
  const role = user?.role ?? "strategic";

  return (
    <AppLayout role={role}>
      <Outlet />
    </AppLayout>
  );
}
