import { useState } from "react";

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

  const handleChange = (
    field: "currentPassword" | "newPassword",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    await changePasswordMutation.mutateAsync({
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-[640px] rounded-[28px] bg-white p-6 shadow-lg">
        <h2
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

        {changePasswordMutation.isError && (
          <p className="mt-4 text-[14px] font-medium text-red-500">
            No se pudo cambiar la contraseña. Revisa tu contraseña actual.
          </p>
        )}

        {changePasswordMutation.isSuccess && (
          <p className="mt-4 text-[14px] font-medium text-green-600">
            Contraseña cambiada correctamente.
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <Button
            label="Cancelar"
            tone="red"
            height="40"
            onClick={onClose}
            disabled={changePasswordMutation.isPending}
          />

          <Button
            label={
              changePasswordMutation.isPending ? "Guardando..." : "Guardar"
            }
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
