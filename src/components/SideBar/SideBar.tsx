import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SidebarItem from "./SideBarItem";
import SidebarProfileItem from "./SidebarProfileItem";
import type { SidebarItemId, SidebarNavItemData, SidebarProps } from "./Sidebar.types";
import { sidebarIcons } from "./SideBar.config";

const Sidebar: React.FC<SidebarProps> = ({
  role = "estrategico",
  profileLabel,
  showProfileLabel = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();


  const getActiveItem = (): SidebarItemId => {
    const pathname = location.pathname;

    if (pathname === "/") return "dashboard";
    if (pathname.startsWith("/comparison")) return "comparison";
    if (pathname.startsWith("/admin")) return "admin";
    if (pathname.startsWith("/profile")) return "profile";

    return "dashboard";
  };

  const activeItem = getActiveItem();

  const handleNavigation = (id: SidebarItemId) => {
    switch (id) {
      case "dashboard":
        navigate("/");
        break;
      case "comparison":
        navigate("/comparison");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "profile":
        navigate("/profile");
        break;
      default:
        navigate("/");
    }
  };

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

  if (role === "administrador" && sidebarIcons.admin) {
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
            onPress={(id) => handleNavigation(id)}
          />
        ))}
      </div>

      <SidebarProfileItem
        avatar={sidebarIcons.profile}
        label={showProfileLabel ? profileLabel : undefined}
        selected={activeItem === "profile"}
        onPress={() => handleNavigation("profile")}
      />
    </aside>
  );
};

export default Sidebar;