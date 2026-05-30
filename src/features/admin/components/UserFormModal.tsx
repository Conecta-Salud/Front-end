import { useEffect, useState, type FormEvent } from "react";

import Button from "../../../components/ui/Button/Button";
import CustomInputField from "../../../components/ui/CustomInputField/CustomInputField";
import CustomSelect from "../../../components/ui/CustomSelect/CustomSelect";
import {
  PASSWORD_MAX_LENGTH,
  validateStrongPassword,
} from "../../../lib/passwordValidation";
import { ADMIN_ROLE_OPTIONS } from "../constants/adminDisplay.constants";

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

const getInitialForm = (
  mode: UserFormModalProps["mode"],
  user?: AdminUserDetail | null
): FormState => {
  if (mode === "edit" && user) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      confirmPassword: "",
      departmentId: String(user.departmentId),
      role: user.role,
    };
  }

  return INITIAL_FORM;
};

type UserFormModalContentProps = Omit<UserFormModalProps, "isOpen">;

function UserFormModalContent({
  mode,
  user,
  departments,
  isLoadingUser = false,
  isSaving = false,
  isError = false,
  onClose,
  onCreate,
  onUpdate,
}: UserFormModalContentProps) {

  const [form, setForm] = useState<FormState>(() =>
    getInitialForm(mode, user)
  );

  const [openSelectId, setOpenSelectId] = useState<string | null>(null);
  
  const [validationError, setValidationError] = useState<string | null>(null);

  const isEditMode = mode === "edit";

  const modalTitle = isEditMode ? "Actualizar usuario" : "Crear usuario";

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

  const handleChange = (field: keyof FormState, value: string) => {
    setValidationError(null);

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const normalizedEmail = form.email.trim().toLowerCase();
    const departmentId = Number(form.departmentId);

    if (!form.firstName.trim()) {
      return "Ingresa el nombre del usuario.";
    }

    if (!form.lastName.trim()) {
      return "Ingresa el apellido del usuario.";
    }

    if (!normalizedEmail) {
      return "Ingresa el correo electrónico.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return "Ingresa un correo electrónico válido.";
    }

    if (!Number.isInteger(departmentId) || departmentId <= 0) {
      return "Selecciona un departamento.";
    }

    if (!isEditMode) {
      if (!form.password) {
        return "Ingresa una contraseña.";
      }

      const passwordError = validateStrongPassword(form.password);

      if (passwordError) {
        return passwordError;
      }

      if (form.password !== form.confirmPassword) {
        return "Las contraseñas no coinciden.";
      }
    }

    return null;
  };

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const error = validateForm();
    const normalizedEmail = form.email.trim().toLowerCase();
    const departmentId = Number(form.departmentId);

    if (error) {
      setValidationError(error);
      return;
    }

    if (isEditMode && user) {
      onUpdate(user.id, {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: normalizedEmail,
        departmentId,
        role: form.role,
      });

      return;
    }

    onCreate({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: normalizedEmail,
      password: form.password,
      departmentId,
      role: form.role,
    });
  };

  const handleClose = () => {
    if (isSaving) return;

    onClose();
  };

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
          className="text-[24px] font-semibold"
          style={{
            backgroundImage: "var(--gradient-primary-green)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {modalTitle}
        </h2>

        <p className="mb-6 text-[16px]"
          style={{
            color: "var(--color-text-secundary)",
          }}
        >
          {isEditMode
            ? "Actualiza la información del usuario seleccionado."
            : "Completa la información para registrar un nuevo usuario."}
        </p>

        <form onSubmit={handleSubmit}>
          {isEditMode && isLoadingUser ? (
          <div className="py-10 text-center text-[15px] text-gray-500">
            Cargando información del usuario...
          </div>
        ) : isEditMode && !user ? (
          <div className="py-10 text-center text-[15px] text-red-500">
            No se pudo cargar la informacion del usuario.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <CustomInputField
              name="firstName"
              label="Nombre"
              value={form.firstName}
              autoComplete="given-name"
              maxLength={80}
              disabled={isSaving}
              showIcon={false}
              onChange={(value) => handleChange("firstName", value)}
            />

            <CustomInputField
              name="lastName"
              label="Apellido"
              value={form.lastName}
              autoComplete="family-name"
              maxLength={120}
              disabled={isSaving}
              showIcon={false}
              onChange={(value) => handleChange("lastName", value)}
            />

            <div className="md:col-span-2">
              <CustomInputField
                name="email"
                label="Correo electrónico"
                type="email"
                value={form.email}
                autoComplete="email"
                maxLength={180}
                disabled={isSaving}
                showIcon={false}
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
                  autoComplete="new-password"
                  maxLength={PASSWORD_MAX_LENGTH}
                  disabled={isSaving}
                  onChange={(value) => handleChange("password", value)}
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
              </>
            )}

            <CustomSelect
              id="department"
              label="Departamento"
              value={form.departmentId}
              options={departments.map((department) => ({
                label: department.name,
                value: String(department.id),
              }))}
              placeholder="Selecciona un departamento"
              disabled={isSaving}
              isOpen={openSelectId === "department"}
              onOpenChange={setOpenSelectId}
              onChange={(value) => handleChange("departmentId", value)}
            />

            <CustomSelect
              id="role"
              label="Rol"
              value={form.role}
              options={ADMIN_ROLE_OPTIONS.map((roleOption) => ({
                label: roleOption.name,
                value: roleOption.value,
              }))}
              disabled={isSaving}
              isOpen={openSelectId === "role"}
              onOpenChange={setOpenSelectId}
              onChange={(value) => handleChange("role", value)}
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
              type="submit"
              label={isSaving ? "Guardando..." : "Guardar"}
              tone="green"
              height="40"
              disabled={isSaving || (isEditMode && (isLoadingUser || !user))}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UserFormModal({
  isOpen,
  ...contentProps
}: UserFormModalProps) {
  if (!isOpen) return null;

  const formKey =
    contentProps.mode === "edit"
      ? `edit-${contentProps.user?.id ?? "loading"}`
      : "create";

  return <UserFormModalContent key={formKey} {...contentProps} />;
}
