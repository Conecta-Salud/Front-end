import { useMutation } from "@tanstack/react-query";
import { changeFirebasePassword } from "../../../services/auth/authService";

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export function useChangePasswordMutation() {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: ChangePasswordPayload) =>
      changeFirebasePassword(currentPassword, newPassword),
  });
}
