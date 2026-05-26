import { MoreVertical, Pencil, UserCheck, UserX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { AdminUser } from "../types/adminUsers.types";

type UserActionsMenuProps = {
  user: AdminUser;
  onEdit: (user: AdminUser) => void;
  onDeactivate: (user: AdminUser) => void;
  onReactivate: (user: AdminUser) => void;
};
export default function UserActionsMenu({
  user,
  onEdit,
  onDeactivate,
  onReactivate,
}: UserActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative flex justify-center">
      <button
        type="button"
        aria-label="Abrir acciones de usuario"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 z-50 w-[170px] rounded-[10px] border border-gray-200 bg-white p-2 text-left shadow-lg">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onEdit(user);
            }}
            className="flex w-full items-center gap-2 rounded-[6px] px-3 py-2 text-[14px] transition hover:bg-gray-100"
          >
            <Pencil size={16} />
            Actualizar
          </button>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);

              if (user.active) {
                onDeactivate(user);
                return;
              }

              onReactivate(user);
            }}
            className={[
              "flex w-full items-center gap-2 rounded-[6px] px-3 py-2 text-[14px] transition",
              user.active
                ? "text-red-500 hover:bg-red-50"
                : "text-[#0F8F78] hover:bg-[#E8F8F4]",
            ].join(" ")}
          >
            {user.active ? <UserX size={16} /> : <UserCheck size={16} />}
            {user.active ? "Desactivar" : "Reactivar"}
          </button>
        </div>
      )}
    </div>
  );
}
