import { useEffect, useState } from "react";

import Button from "../../../components/ui/Button/Button";
import CustomInputField from "../../../components/ui/CustomInputField/CustomInputField";
import { useChangePasswordMutation } from "../mutations/useChangePasswordMutation";

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const changePasswordMutation = useChangePasswordMutation();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (
    field: "currentPassword" | "newPassword",
    value: string
  ) => {
    setValidationError(null);

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetModal = () => {
    setForm({
      currentPassword: "",
      newPassword: "",
    });

    setValidationError(null);
    changePasswordMutation.reset();
  };

  const handleClose = () => {
    if (changePasswordMutation.isPending) return;

    resetModal();
    onClose();
  };

  const handleSubmit = async () => {
    if (!form.currentPassword || !form.newPassword) {
      setValidationError("Completa ambos campos para continuar.");
      return;
    }

    if (form.newPassword.length < 8) {
      setValidationError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      resetModal();
      onClose();
    } catch {
      // El mensaje visual lo maneja isError.
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-password-title"
      onMouseDown={handleClose}
    >
      <div
        className="w-full max-w-[640px] rounded-[10px] bg-white p-6 shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2
          id="change-password-title"
          className="mb-6 text-[24px]"
          style={{
            color: "var(--color-green-end)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          Cambiar contraseña
        </h2>

        <div className="flex flex-col gap-5">
          <CustomInputField
            name="currentPassword"
            label="Contraseña actual"
            type="password"
            value={form.currentPassword}
            onChange={(value) => handleChange("currentPassword", value)}
          />

          <CustomInputField
            name="newPassword"
            label="Nueva contraseña"
            type="password"
            value={form.newPassword}
            onChange={(value) => handleChange("newPassword", value)}
          />
        </div>

        {validationError && (
          <p className="mt-4 text-[14px] font-medium text-red-500">
            {validationError}
          </p>
        )}

        {changePasswordMutation.isError && (
          <p className="mt-4 text-[14px] font-medium text-red-500">
            No se pudo cambiar la contraseña. Revisa tu contraseña actual.
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <Button
            label="Cancelar"
            tone="red"
            height="40"
            onClick={handleClose}
            disabled={changePasswordMutation.isPending}
          />

          <Button
            label={changePasswordMutation.isPending ? "Guardando..." : "Guardar"}
            tone="green"
            height="40"
            onClick={handleSubmit}
            disabled={changePasswordMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;