import type { SidebarStatefulIcon } from "./Sidebar.types";

import DashboardDefaultIcon from "../../../assets/icons/sidebar/dashboard_default.svg";
import DashboardSelectedIcon from "../../../assets/icons/sidebar/dashboard_selected.svg";

import ComparisonDefaultIcon from "../../../assets/icons/sidebar/comparison_default.svg";
import ComparisonSelectedIcon from "../../../assets/icons/sidebar/comparison_selected.svg";

import AdminDefaultIcon from "../../../assets/icons/sidebar/admin_default.svg";
import AdminSelectedIcon from "../../../assets/icons/sidebar/admin_selected.svg";

import ProfileDefaultIcon from "../../../assets/icons/sidebar/profile_default.svg";
import ProfileSelectedIcon from "../../../assets/icons/sidebar/profile_selected.svg";

export const sidebarIcons: {
    dashboard: SidebarStatefulIcon;
    comparison: SidebarStatefulIcon;
    admin: SidebarStatefulIcon;
    profile: SidebarStatefulIcon;
  } = {
    dashboard: {
      default: DashboardDefaultIcon,
      selected: DashboardSelectedIcon,
    },
    comparison: {
      default: ComparisonDefaultIcon,
      selected: ComparisonSelectedIcon,
    },
    admin: {
      default: AdminDefaultIcon,
      selected: AdminSelectedIcon,
    },
    profile: {
      default: ProfileDefaultIcon,
      selected: ProfileSelectedIcon,
    },
  };