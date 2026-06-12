import React from "react";
import type { SidebarNavItemProps } from "./Sidebar.types";

const SidebarItem: React.FC<SidebarNavItemProps> = ({
  id,
  label,
  icon,
  selected = false,
  onPress,
}) => {
  return (
    <button
      type="button"
      onClick={() => onPress?.(id)}
      className={[
        "w-full flex flex-col items-center justify-center gap-[7px] px-3 py-[30px] transition-all duration-200",
        selected ? "bg-white" : "bg-transparent",
      ].join(" ")}
    >
      <img
        src={selected ? icon.selected : icon.default}
        alt={label}
        className="w-10 h-10 object-contain"
      />

      <span
        className={[
          "text-center leading-tight text-[13px]",
          selected ? "font-semibold" : "font-normal",
          selected ? "bg-clip-text text-transparent" : "text-white",
        ].join(" ")}
        style={
          selected
            ? { backgroundImage: "var(--gradient-primary-green)" }
            : undefined
        }
      >
        {label}
      </span>
    </button>
  );
};

export default SidebarItem;
