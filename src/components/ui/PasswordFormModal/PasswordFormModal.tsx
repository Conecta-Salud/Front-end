import { useEffect, useState, type ReactNode } from "react";

import Button from "../Button/Button";
import CustomInputField from "../CustomInputField/CustomInputField";

type PasswordFormModalProps = {
  isOpen: boolean;
  title: string;
  description?: ReactNode;
  requireCurrentPassword?: boolean;
  isSaving?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (payload: {
    currentPassword?: string;
    newPassword: string;
  }) => void;
};

function PasswordFormModal({
  isOpen,
  title,
  description,
  requireCurrentPassword = false,
  isSaving = false,
  isError = false,
  errorMessage = "No se pudo cambiar la contraseña. Intenta nuevamente.",
  onClose,
  onSubmit,
}: PasswordFormModalProps) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const resetModal = () => {
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setValidationError(null);
  };

  const handleClose = () => {
    if (isSaving) return;

    resetModal();
    onClose();
  };

  const handleChange = (
    field: "currentPassword" | "newPassword" | "confirmPassword",
    value: string
  ) => {
    setValidationError(null);

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (requireCurrentPassword && !form.currentPassword) {
      setValidationError("Ingresa tu contraseña actual.");
      return;
    }

    if (!form.newPassword || !form.confirmPassword) {
      setValidationError("Completa la nueva contraseña y su confirmación.");
      return;
    }

    if (form.newPassword.length < 8) {
      setValidationError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const hasUppercase = /[A-Z]/.test(form.newPassword);
    const hasLowercase = /[a-z]/.test(form.newPassword);
    const hasNumber = /\d/.test(form.newPassword);

    if (!hasUppercase || !hasLowercase || !hasNumber) {
      setValidationError(
        "La contraseña debe incluir mayúscula, minúscula y número."
      );
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setValidationError("Las contraseñas no coinciden.");
      return;
    }

    onSubmit({
      currentPassword: requireCurrentPassword
        ? form.currentPassword
        : undefined,
      newPassword: form.newPassword,
    });
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
      aria-labelledby="password-form-title"
      onMouseDown={handleClose}
    >
      <div
        className="w-full max-w-[640px] rounded-[10px] bg-white p-6 shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2
          id="password-form-title"
          className="mb-2 text-[24px]"
          style={{
            color: "var(--color-green-end)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          {title}
        </h2>

        {description && (
          <div className="mb-6 text-[16px] text-gray-500">{description}</div>
        )}

        <div className="flex flex-col gap-5">
          {requireCurrentPassword && (
            <CustomInputField
              name="currentPassword"
              label="Contraseña actual"
              type="password"
              value={form.currentPassword}
              onChange={(value) => handleChange("currentPassword", value)}
            />
          )}

          <CustomInputField
            name="newPassword"
            label="Nueva contraseña"
            type="password"
            value={form.newPassword}
            onChange={(value) => handleChange("newPassword", value)}
          />

          <CustomInputField
            name="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            value={form.confirmPassword}
            onChange={(value) => handleChange("confirmPassword", value)}
          />
        </div>

        {validationError && (
          <p className="mt-4 text-[14px] font-medium text-red-500">
            {validationError}
          </p>
        )}

        {isError && (
          <p className="mt-4 text-[14px] font-medium text-red-500">
            {errorMessage}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <Button
            label="Cancelar"
            tone="red"
            height="40"
            onClick={handleClose}
            disabled={isSaving}
          />

          <Button
            label={isSaving ? "Guardando..." : "Guardar"}
            tone="green"
            height="40"
            onClick={handleSubmit}
            disabled={isSaving}
          />
        </div>
      </div>
    </div>
  );
}

export default PasswordFormModal;
