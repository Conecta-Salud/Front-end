import React from "react";
import type { SidebarProfileItemProps } from "./Sidebar.types";

const SidebarProfileItem: React.FC<SidebarProfileItemProps> = ({
  selected = false,
  avatar,
  label,
  onPress,
}) => {
  return (
    <button
      type="button"
      onClick={onPress}
      className={[
        "w-full flex flex-col items-center justify-center gap-[7px] px-3 py-[30px] transition-all duration-200",
        selected ? "bg-white" : "bg-transparent",
      ].join(" ")}
    >
      <img
        src={selected ? avatar.selected : avatar.default}
        alt={label ?? "Perfil"}
        className="w-11 h-11 object-contain"
      />

      {label ? (
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
      ) : null}
    </button>
  );
};

export default SidebarProfileItem;
