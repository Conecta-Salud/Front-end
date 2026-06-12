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

type UserFormModalProps = Readonly<{
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
}>;

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

const getRequiredUserErrors = (form: FormState) => {
  const errors: string[] = [];

  if (!form.firstName.trim()) {
    errors.push("Ingresa el nombre del usuario.");
  }

  if (!form.lastName.trim()) {
    errors.push("Ingresa el apellido del usuario.");
  }

  return errors;
};

const getEmailErrors = (email: string) => {
  if (email && EMAIL_REGEX.test(email)) return [];

  return [
    email
      ? "Ingresa un correo electrónico válido."
      : "Ingresa el correo electrónico.",
  ];
};

const getDepartmentErrors = (departmentId: number) => {
  if (Number.isInteger(departmentId) && departmentId > 0) return [];

  return ["Selecciona un departamento."];
};

const getPasswordErrors = (form: FormState) => {
  const errors: string[] = [];

  if (form.password) {
    const passwordError = validateStrongPassword(form.password);

    if (passwordError) {
      errors.push(passwordError);
    }
  } else {
    errors.push("Ingresa una contraseña.");
  }

  if (form.confirmPassword) {
    if (form.password && form.password !== form.confirmPassword) {
      errors.push("Las contraseñas no coinciden.");
    }
  } else {
    errors.push("Confirma la contraseña.");
  }

  return errors;
};

const validateForm = (form: FormState, isEditMode: boolean) => {
  const normalizedEmail = form.email.trim().toLowerCase();
  const departmentId = Number(form.departmentId);

  return [
    ...getRequiredUserErrors(form),
    ...getEmailErrors(normalizedEmail),
    ...getDepartmentErrors(departmentId),
    ...(isEditMode ? [] : getPasswordErrors(form)),
  ];
};

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
  
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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
    setValidationErrors([]);

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const errors = validateForm(form, isEditMode);
    const normalizedEmail = form.email.trim().toLowerCase();
    const departmentId = Number(form.departmentId);

    if (errors.length > 0) {
      setValidationErrors(errors);
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

  let formBody = (
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
  );

  if (isEditMode && isLoadingUser) {
    formBody = (
      <div className="py-10 text-center text-[15px] text-gray-500">
        Cargando información del usuario...
      </div>
    );
  } else if (isEditMode && !user) {
    formBody = (
      <div className="py-10 text-center text-[15px] text-red-500">
        No se pudo cargar la informacion del usuario.
      </div>
    );
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-[9999] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center border-0 bg-black/40 px-6"
      aria-labelledby="user-form-modal-title"
    >
      <div className="w-full max-w-[720px] rounded-[10px] bg-white p-6 shadow-lg">
        <h2
          id="user-form-modal-title"
          className="text-brand-blue text-[24px] font-semibold"
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
          {formBody}

        {validationErrors.length > 0 && (
          <div className="mt-5 text-[14px] font-medium text-red-500">
            <p>Corrige los siguientes campos:</p>
            <ul className="mt-2 list-disc pl-5">
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
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
    </dialog>
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
