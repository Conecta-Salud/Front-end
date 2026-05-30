import { MoreVertical, Pencil, UserCheck, UserX, KeyRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { AdminUser } from "../types/adminUsers.types";

type UserActionsMenuProps = {
  user: AdminUser;
  onEdit: (user: AdminUser) => void;
  onDeactivate: (user: AdminUser) => void;
  onReactivate: (user: AdminUser) => void;
  onChangePassword: (user: AdminUser) => void;
};

type MenuPosition = {
  top: number;
  left: number;
};

export default function UserActionsMenu({
  user,
  onEdit,
  onDeactivate,
  onReactivate,
  onChangePassword,
}: UserActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updateMenuPosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setMenuPosition({
      top: rect.bottom + 8,
      left: rect.right,
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    updateMenuPosition();

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedButton = buttonRef.current?.contains(target);
      const clickedMenu = menuRef.current?.contains(target);

      if (!clickedButton && !clickedMenu) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      updateMenuPosition();
    };

    const handleScroll = () => {
      updateMenuPosition();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  return (
    <div className="relative flex justify-center">
      <button
        ref={buttonRef}
        type="button"
        aria-label="Abrir acciones de usuario"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-gray-200 bg-white shadow-sm transition hover:bg-gray-50"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen &&
        menuPosition &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[9999] w-[170px] rounded-[10px] border border-gray-200 bg-white p-2 text-left shadow-lg"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
              transform: "translateX(-100%)",
            }}
          >
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
                onChangePassword(user);
              }}
              className="flex w-full items-center gap-2 rounded-[6px] px-3 py-2 text-[14px] transition hover:bg-gray-100"
            >
              <KeyRound size={16} />
              Cambiar contraseña
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
          </div>,
          document.body
        )}
    </div>
  );
}
