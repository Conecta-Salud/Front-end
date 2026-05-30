import { useEffect, useMemo, useState } from "react";

import Button from "../../../components/ui/Button/Button";
import CustomInputField from "../../../components/ui/CustomInputField/CustomInputField";
import CustomSelect from "../../../components/ui/CustomSelect/CustomSelect";

import type {
  AdminUserDetail,
  AdminUserRole,
  CreateAdminUserPayload,
  UpdateAdminUserPayload,
} from "../types/adminUsers.types";

type UserFormModalProps = {
  mode: "create" | "edit";
  isOpen: boolean;
  user?: AdminUserDetail | null;
  departments: Array<{ id: number; name: string }>;
  isLoadingUser?: boolean;
  isSaving?: boolean;
  isError?: boolean;
  onClose: () => void;
  onCreate: (payload: CreateAdminUserPayload) => void;
  onUpdate: (userId: string, payload: UpdateAdminUserPayload) => void;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  departmentId: string;
  role: AdminUserRole;
};

const INITIAL_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  departmentId: "",
  role: "strategic",
};

export default function UserFormModal({
  mode,
  isOpen,
  user,
  departments,
  isLoadingUser = false,
  isSaving = false,
  isError = false,
  onClose,
  onCreate,
  onUpdate,
}: UserFormModalProps) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  const [validationError, setValidationError] = useState<string | null>(null);

  const isEditMode = mode === "edit";

  const modalTitle = useMemo(
    () => (isEditMode ? "Actualizar usuario" : "Crear usuario"),
    [isEditMode]
  );

  useEffect(() => {
    if (!isOpen) {
      setForm(INITIAL_FORM);
      setValidationError(null);
      return;
    }

    if (isEditMode && user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: "",
        confirmPassword: "",
        departmentId: String(user.departmentId),
        role: user.role,
      });
    }

    if (!isEditMode) {
      setForm(INITIAL_FORM);
    }
  }, [isOpen, isEditMode, user]);

  const handleChange = (field: keyof FormState, value: string) => {
    setValidationError(null);

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!form.firstName.trim()) {
      return "Ingresa el nombre del usuario.";
    }

    if (!form.lastName.trim()) {
      return "Ingresa el apellido del usuario.";
    }

    if (!form.email.trim()) {
      return "Ingresa el correo electrónico.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      return "Ingresa un correo electrónico válido.";
    }

    if (!form.departmentId) {
      return "Selecciona un departamento.";
    }

    if (!isEditMode) {
      if (!form.password) {
        return "Ingresa una contraseña.";
      }

      if (form.password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres.";
      }

      const hasUppercase = /[A-Z]/.test(form.password);

      const hasLowercase = /[a-z]/.test(form.password);

      const hasNumber = /\d/.test(form.password);

      if (!hasUppercase || !hasLowercase || !hasNumber) {
        return "La contraseña debe incluir mayúscula, minúscula y número.";
      }

      if (form.password !== form.confirmPassword) {
        return "Las contraseñas no coinciden.";
      }
    }

    return null;
  };

  const handleSubmit = () => {
    const error = validateForm();

    if (error) {
      setValidationError(error);
      return;
    }

    if (isEditMode && user) {
      onUpdate(user.id, {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        departmentId: Number(form.departmentId),
        role: form.role,
      });

      return;
    }

    onCreate({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
      departmentId: Number(form.departmentId),
      role: form.role,
    });
  };

  const handleClose = () => {
    if (isSaving) return;

    setValidationError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-form-modal-title"
      onMouseDown={handleClose}
    >
      <div
        className="w-full max-w-[720px] rounded-[10px] bg-white p-6 shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2
          id="user-form-modal-title"
          className="mb-2 text-[24px]"
          style={{
            color: "var(--color-green-end)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          {modalTitle}
        </h2>

        <p className="mb-6 text-[16px] text-gray-500">
          {isEditMode
            ? "Actualiza la información del usuario seleccionado."
            : "Completa la información para registrar un nuevo usuario."}
        </p>

        {isEditMode && isLoadingUser ? (
          <div className="py-10 text-center text-[15px] text-gray-500">
            Cargando información del usuario...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <CustomInputField
              name="firstName"
              label="Nombre"
              value={form.firstName}
              onChange={(value) => handleChange("firstName", value)}
            />

            <CustomInputField
              name="lastName"
              label="Apellido"
              value={form.lastName}
              onChange={(value) => handleChange("lastName", value)}
            />

            <div className="md:col-span-2">
              <CustomInputField
                name="email"
                label="Correo electrónico"
                type="email"
                value={form.email}
                onChange={(value) => handleChange("email", value)}
              />
            </div>

            {!isEditMode && (
              <>
                <CustomInputField
                  name="password"
                  label="Contraseña"
                  type="password"
                  value={form.password}
                  onChange={(value) => handleChange("password", value)}
                />

                <CustomInputField
                  name="confirmPassword"
                  label="Confirmar contraseña"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(value) => handleChange("confirmPassword", value)}
                />
              </>
            )}

            <CustomSelect
              label="Departamento"
              value={form.departmentId}
              options={departments.map((department) => ({
                label: department.name,
                value: String(department.id),
              }))}
              placeholder="Selecciona un departamento"
              onChange={(value) => handleChange("departmentId", value)}
            />

            <CustomSelect
              label="Rol"
              value={form.role}
              options={[
                {
                  label: "Strategic",
                  value: "strategic",
                },
                {
                  label: "Admin",
                  value: "admin",
                },
              ]}
              onChange={(value) => handleChange("role", value as AdminUserRole)}
            />
          </div>
        )}

        {validationError && (
          <p className="mt-5 text-[14px] font-medium text-red-500">
            {validationError}
          </p>
        )}

        {isError && (
          <p className="mt-5 text-[14px] font-medium text-red-500">
            No se pudo guardar el usuario. Intenta nuevamente.
          </p>
        )}

        <div className="mt-8 flex justify-end gap-3">
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
            disabled={isSaving || (isEditMode && isLoadingUser)}
          />
        </div>
      </div>
    </div>
  );
}
