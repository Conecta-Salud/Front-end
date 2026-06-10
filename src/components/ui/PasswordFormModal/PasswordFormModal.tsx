import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import {
  PASSWORD_MAX_LENGTH,
  validateStrongPassword,
} from "../../../lib/passwordValidation";
import Button from "../Button/Button";
import CustomInputField from "../CustomInputField/CustomInputField";

type PasswordFormModalProps = Readonly<{
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
}>;

type PasswordFormModalContentProps = Omit<PasswordFormModalProps, "isOpen">;

function PasswordFormModalContent({
  title,
  description,
  requireCurrentPassword = false,
  isSaving = false,
  isError = false,
  errorMessage = "No se pudo cambiar la contraseña. Intenta nuevamente.",
  onClose,
  onSubmit,
}: PasswordFormModalContentProps) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (isSaving) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSaving, onClose]);

  const handleClose = () => {
    if (isSaving) return;

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

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (requireCurrentPassword && !form.currentPassword) {
      setValidationError("Ingresa tu contraseña actual.");
      return;
    }

    if (!form.newPassword || !form.confirmPassword) {
      setValidationError("Completa la nueva contraseña y su confirmación.");
      return;
    }

    const passwordError = validateStrongPassword(form.newPassword);

    if (passwordError) {
      setValidationError(passwordError);
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
        <div className="mb-7 flex flex-col gap-2">
          <h2
            id="password-form-title"
            className="text-brand-blue text-[24px] font-semibold leading-none"
          >
            {title}
          </h2>

          {description && (
            <div className="text-[16px] leading-snug text-gray-500">
              {description}
            </div>
          )}
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {requireCurrentPassword && (
            <CustomInputField
              name="currentPassword"
              label="Contraseña actual"
              type="password"
              value={form.currentPassword}
              autoComplete="current-password"
              maxLength={PASSWORD_MAX_LENGTH}
              disabled={isSaving}
              onChange={(value) => handleChange("currentPassword", value)}
            />
          )}

          <CustomInputField
            name="newPassword"
            label="Nueva contraseña"
            type="password"
            value={form.newPassword}
            autoComplete="new-password"
            maxLength={PASSWORD_MAX_LENGTH}
            disabled={isSaving}
            onChange={(value) => handleChange("newPassword", value)}
          />

          <CustomInputField
            name="confirmPassword"
            label="Confirmar contraseña"
            type="password"
            value={form.confirmPassword}
            autoComplete="new-password"
            maxLength={PASSWORD_MAX_LENGTH}
            disabled={isSaving}
            onChange={(value) => handleChange("confirmPassword", value)}
          />

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

          <div className="mt-1 flex justify-end gap-3">
            <Button
              label="Cancelar"
              tone="red"
              height="40"
              onClick={handleClose}
              disabled={isSaving}
            />

            <Button
              type="submit"
              label={isSaving ? "Guardando..." : "Guardar"}
              tone="green"
              height="40"
              disabled={isSaving}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

function PasswordFormModal({ isOpen, ...contentProps }: PasswordFormModalProps) {
  if (!isOpen) return null;

  return <PasswordFormModalContent {...contentProps} />;
}

export default PasswordFormModal;
