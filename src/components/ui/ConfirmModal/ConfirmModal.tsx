import { useEffect } from "react";
import Button from "../Button/Button";

type ConfirmModalProps = Readonly<{
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  tone?: "green" | "red";
  isPending?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}>;

export default function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancelar",
  tone = "red",
  isPending = false,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!isOpen || isPending) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isPending, onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      open
      className="fixed inset-0 z-[9999] m-0 flex h-full max-h-none w-full max-w-none items-center justify-center border-0 bg-black/40 px-6"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <div className="w-full max-w-[520px] rounded-[10px] bg-white p-6 shadow-lg">
        <h2
          id="confirm-modal-title"
          className="text-brand-blue mb-3 text-[24px] font-bold"
        >
          {title}
        </h2>

        <p id="confirm-modal-description" className="text-[16px] text-black">
          {description}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            label={cancelLabel}
            tone="green"
            height="40"
            onClick={onClose}
            disabled={isPending}
          />

          <Button
            label={isPending ? "Cerrando..." : confirmLabel}
            tone={tone}
            height="40"
            onClick={onConfirm}
            disabled={isPending}
          />
        </div>
      </div>
    </dialog>
  );
}
