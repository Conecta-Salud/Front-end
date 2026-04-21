import React from "react";
import SidebarItem from "./SideBarItem";
import SidebarProfileItem from "./SidebarProfileItem";
import type { SidebarNavItemData, SidebarProps } from "./Sidebar.types";
import { sidebarIcons } from "./SideBar.config";

const Sidebar: React.FC<SidebarProps> = ({
  role = "user",
  activeItem,
  onChange,
  profileLabel,
  showProfileLabel = false,
}) => {


  const navItems: SidebarNavItemData[] = [
    {
      id: "dashboard",
      label: "Dashboard Estratégico",
      icon: sidebarIcons.dashboard,
    },
    {
      id: "comparison",
      label: "Módulo de Comparación",
      icon: sidebarIcons.comparison,
    },
  ];

  if (role === "admin" && sidebarIcons.admin) {
    navItems.push({
      id: "admin",
      label: "Panel Administrador",
      icon: sidebarIcons.admin,
    });
  }

  return (
    <aside
    className="w-[100px] h-full overflow-hidden flex flex-col justify-between"
    style={{ background: "var(--gradient-primary-green)" }}>        
      <div className="flex flex-col">
        {navItems.map((item) => (
          <SidebarItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            selected={activeItem === item.id}
            onPress={(id) => onChange?.(id)}
          />
        ))}
      </div>

      <SidebarProfileItem
        avatar={sidebarIcons.profile}
        label={showProfileLabel ? profileLabel : undefined}
        selected={activeItem === "profile"}
        onPress={() => onChange?.("profile")}
      />
    </aside>
  );
};

export default Sidebar;