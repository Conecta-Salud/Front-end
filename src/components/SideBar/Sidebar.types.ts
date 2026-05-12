export type SidebarItemId = "dashboard" | "comparison" | "admin" | "profile";
export type SidebarNavItemId = "dashboard" | "comparison" | "admin";
export type UserRole = "strategic" | "admin";

export type SidebarStatefulIcon = {
  default: string;
  selected: string;
};

export type SidebarNavItemData = {
  id: "dashboard" | "comparison" | "admin";
  label: string;
  icon: SidebarStatefulIcon;
};

export type SidebarNavItemProps = {
  id: "dashboard" | "comparison" | "admin";
  label: string;
  icon: SidebarStatefulIcon;
  selected?: boolean;
  onPress?: (id: SidebarNavItemId) => void;
};

export type SidebarProfileItemProps = {
  selected?: boolean;
  avatar: SidebarStatefulIcon;
  label?: string;
  onPress?: () => void;
};

export type SidebarProps = {
  role?: UserRole;
  profileLabel?: string;
  showProfileLabel?: boolean;
};