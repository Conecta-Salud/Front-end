import { useState } from "react";
import Filter from "../../ui/Filter/Filter";
import SearchBar from "../../ui/SearchBar/SearchBar";
import type { HealthMapIndicator } from "../../../features/health-map/types/healthMap.types";

type HeaderActionsProps = {
  showCategoryFilter?: boolean;
  showYearFilter?: boolean;
  showSearchBar?: boolean;

  category?: HealthMapIndicator;
  year?: string;
  search?: string;

  onCategoryChange?: (value: HealthMapIndicator) => void;
  onYearChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
};

type HeaderDropdownId = "category" | "year";

const indicatorOptions: { name: string; value: HealthMapIndicator }[] = [
  { name: "Medical coverage", value: "medical_coverage" },
  { name: "Hospital beds", value: "hospital_beds" },
  {
    name: "Healthcare access deficiency",
    value: "healthcare_access_deficiency",
  },
];

const yearOptions = [
  { name: "2024", value: "2024" },
  { name: "2025", value: "2025" },
  { name: "2026", value: "2026" },
];

const isHealthMapIndicator = (value: string): value is HealthMapIndicator => {
  return indicatorOptions.some((option) => option.value === value);
};


export default function HeaderActions({
  showCategoryFilter = false,
  showYearFilter = false,
  showSearchBar = false,

  category = "medical_coverage",
  year = "2024",
  search = "",

  onCategoryChange,
  onYearChange,
  onSearchChange,
}: HeaderActionsProps) {
  const [openDropdown, setOpenDropdown] = useState<HeaderDropdownId | null>(
    null
  );

  const handleCategoryChange = (value: string) => {
    if (!isHealthMapIndicator(value)) return;
    onCategoryChange?.(value);
  };
  
  return (
    <div className="flex w-full flex-wrap items-center justify-end gap-3">
      {showCategoryFilter && (
        <Filter
          id="category"
          title="Indicator"
          values={category}
          isOpen={openDropdown === "category"}
          onOpenChange={(id) => setOpenDropdown(id as HeaderDropdownId | null)}
          onChange={handleCategoryChange}
          allowClear={false}
          className="w-fit max-sm:w-full"
          options={indicatorOptions}
        />
      )}

      {showYearFilter && (
        <Filter
          id="year"
          title="Year"
          values={year}
          isOpen={openDropdown === "year"}
          onOpenChange={(id) => setOpenDropdown(id as HeaderDropdownId | null)}
          onChange={(value) => onYearChange?.(value)}
          allowClear={false}
          className="w-fit max-sm:w-full"
          options={yearOptions}
        />
      )}

      {showSearchBar && (
        <SearchBar
          searchTerm={search}
          onSearch={(value) => onSearchChange?.(value)}
          placeholder="Search state or municipality..."
          className="w-[300px] max-lg:w-[260px] max-sm:w-full"
        />
      )}
    </div>
  );
}