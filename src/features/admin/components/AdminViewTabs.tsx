import type { AdminTab } from "../types/admin.types";

type AdminViewTabsProps = {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
};

const tabs: Array<{ value: AdminTab; label: string }> = [
  { value: "users", label: "Usuarios" },
  { value: "activity", label: "Actividad" },
  { value: "data", label: "Datos" },
];

export default function AdminViewTabs({
  activeTab,
  onTabChange,
}: AdminViewTabsProps) {
  return (
    <div className="flex shrink-0 flex-wrap gap-3" role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.value)}
            className={[
              "h-[40px] rounded-[6px] px-5 text-[16px] font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#57D8BE] focus:ring-offset-2",
              isActive
                ? "text-white"
                : "border-2 border-[#14B8A6] bg-white text-black hover:bg-gray-50",
            ].join(" ")}
            style={
              isActive
                ? { background: "var(--gradient-primary-green)" }
                : undefined
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
