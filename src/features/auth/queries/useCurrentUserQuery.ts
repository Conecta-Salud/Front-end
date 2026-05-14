import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/auth/currentUser.api";
import { useAuthStore } from "../../../stores/authStore";
import { queryKeys } from "../../../lib/queryKeys";

export function useCurrentUserQuery() {
  const status = useAuthStore((state) => state.status);

  return useQuery({
    queryKey: queryKeys.auth.currentUser(),
    queryFn: getCurrentUser,
    enabled: status === "authenticated",
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });
}