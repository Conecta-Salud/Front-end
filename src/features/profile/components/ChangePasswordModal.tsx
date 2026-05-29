import PasswordFormModal from "../../../components/ui/PasswordFormModal/PasswordFormModal";
import { useChangePasswordMutation } from "../mutations/useChangePasswordMutation";

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const changePasswordMutation = useChangePasswordMutation();

  const handleClose = () => {
    if (changePasswordMutation.isPending) return;

    changePasswordMutation.reset();
    onClose();
  };

  const handleSubmit = async ({
    currentPassword,
    newPassword,
  }: {
    currentPassword?: string;
    newPassword: string;
  }) => {
    if (!currentPassword) return;

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
      });

      changePasswordMutation.reset();
      onClose();
    } catch {
      // El mensaje visual lo maneja isError.
    }
  };

  return (
    <PasswordFormModal
      isOpen={isOpen}
      title="Cambiar contraseña"
      requireCurrentPassword
      isSaving={changePasswordMutation.isPending}
      isError={changePasswordMutation.isError}
      errorMessage="No se pudo cambiar la contraseña. Revisa tu contraseña actual."
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
}

export default ChangePasswordModal;
