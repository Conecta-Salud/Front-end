import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutFirebase } from "../../../services/auth/authService";

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutFirebase,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}