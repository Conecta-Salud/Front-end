import { useEffect } from "react";

import Button from "../../../components/ui/Button/Button";
import type {
  AdminUser,
  AdminUserStatusAction,
} from "../types/adminUsers.types";

type UserStatusConfirmModalProps = {
  user: AdminUser | null;
  action: AdminUserStatusAction | null;
  isOpen: boolean;
  isPending?: boolean;
  isError?: boolean;
  onClose: () => void;
  onConfirm: (user: AdminUser, action: AdminUserStatusAction) => void;
};

const actionConfig = {
  deactivate: {
    title: "Desactivar usuario",
    confirmLabel: "Desactivar",
    pendingLabel: "Desactivando...",
    description:
      "El usuario no podrá acceder al sistema mientras esté inactivo.",
    error: "No se pudo desactivar el usuario. Intenta nuevamente.",
    tone: "red" as const,
  },
  reactivate: {
    title: "Reactivar usuario",
    confirmLabel: "Reactivar",
    pendingLabel: "Reactivando...",
    description: "El usuario podrá acceder nuevamente al sistema.",
    error: "No se pudo reactivar el usuario. Intenta nuevamente.",
    tone: "green" as const,
  },
};

export default function UserStatusConfirmModal({
  user,
  action,
  isOpen,
  isPending = false,
  isError = false,
  onClose,
  onConfirm,
}: UserStatusConfirmModalProps) {
  useEffect(() => {
    if (!isOpen || isPending) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isPending, onClose]);

  if (!isOpen || !user || !action) return null;

  const config = actionConfig[action];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-status-title"
      aria-describedby="user-status-description"
      onMouseDown={isPending ? undefined : onClose}
    >
      <div
        className="w-full max-w-[520px] rounded-[10px] bg-white p-6 shadow-lg"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2
          id="user-status-title"
          className="mb-3 text-[24px] font-bold"
          style={{
            backgroundImage: "var(--gradient-primary-green)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {config.title}
        </h2>

        <p id="user-status-description" className="text-[16px] text-black">
          ¿Seguro que deseas{" "}
          {action === "deactivate" ? "desactivar" : "reactivar"} a{" "}
          <span className="font-semibold">{user.fullName || user.email}</span>?{" "}
          {config.description}
        </p>

        {isError && (
          <p className="mt-4 text-[14px] font-medium text-red-500">
            {config.error}
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <Button
            label="Cancelar"
            tone="green"
            height="40"
            onClick={onClose}
            disabled={isPending}
          />

          <Button
            label={isPending ? config.pendingLabel : config.confirmLabel}
            tone={config.tone}
            height="40"
            onClick={() => onConfirm(user, action)}
            disabled={isPending}
          />
        </div>
      </div>
    </div>
  );
}
