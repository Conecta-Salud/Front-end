import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithFirebase } from "../../../services/auth/authService";
import { getCurrentUser } from "../../../services/auth/currentUser.api";
import { queryKeys } from "../../../lib/queryKeys";

type LoginCredentials = {
  email: string;
  password: string;
};

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: LoginCredentials) => {
      await loginWithFirebase(email, password);

      const currentUser = await queryClient.fetchQuery({
        queryKey: queryKeys.auth.currentUser(),
        queryFn: ({ signal }) => getCurrentUser(signal),
        staleTime: 5 * 60 * 1000,
      });

      return currentUser;
    },
  });
}
