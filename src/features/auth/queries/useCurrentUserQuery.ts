import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/auth/currentUser.api";
import { useAuthStore } from "../../../stores/authStore";
import { queryKeys } from "../../../lib/queryKeys";
import { getE2ECurrentUser, isE2EAuthBypassEnabled } from "../../../config/e2e";

export function useCurrentUserQuery() {
  const status = useAuthStore((state) => state.status);
  const e2eAuthBypassEnabled = isE2EAuthBypassEnabled();

  return useQuery({
    queryKey: e2eAuthBypassEnabled
      ? [...queryKeys.auth.currentUser(), "e2e"]
      : queryKeys.auth.currentUser(),
    queryFn: ({ signal }) =>
      e2eAuthBypassEnabled
        ? Promise.resolve(getE2ECurrentUser())
        : getCurrentUser(signal),
    enabled: e2eAuthBypassEnabled || status === "authenticated",
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });
}
