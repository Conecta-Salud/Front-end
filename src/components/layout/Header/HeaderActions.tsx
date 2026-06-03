import { useState } from "react";
import Filter from "../../ui/Filter/Filter";
import type { HealthMapIndicator } from "../../../features/health-map/types/healthMap.types";
import type { LocationSearchResult } from "../../../features/locations/types/locationSearch.types";
import LocationAutocomplete from "../../ui/LocationAutocomplete/LocationAutocomplete";

type HeaderOption<TValue extends string = string> = {
  name: string;
  value: TValue;
};

type HeaderActionsProps = {
  showCategoryFilter?: boolean;
  showYearFilter?: boolean;
  showSearchBar?: boolean;

  category?: HealthMapIndicator;
  year?: string;
  selectedLocation?: LocationSearchResult | null;
  yearOptions?: HeaderOption[];
  categoryOptions?: HeaderOption<HealthMapIndicator>[];

  onCategoryChange?: (value: HealthMapIndicator) => void;
  onYearChange?: (value: string) => void;
  onLocationChange?: (location: LocationSearchResult | null) => void;
};

type HeaderDropdownId = "category" | "year";

const defaultCategoryOptions: HeaderOption<HealthMapIndicator>[] = [
  { name: "Cobertura Médica", value: "medical_coverage" },
  { name: "Infraestructura Hospitalaria", value: "hospital_beds" },
  {
    name: "Vulnerabilidad Poblacional",
    value: "healthcare_access_deficiency",
  },
];

const isHealthMapIndicator = (value: string): value is HealthMapIndicator => {
  return defaultCategoryOptions.some((option) => option.value === value);
};


export default function HeaderActions({
  showCategoryFilter = false,
  showYearFilter = false,
  showSearchBar = false,

  category = "medical_coverage",
  year = "",
  selectedLocation = null,
  yearOptions,
  categoryOptions,

  onCategoryChange,
  onYearChange,
  onLocationChange,
}: HeaderActionsProps) {
  const [openDropdown, setOpenDropdown] = useState<HeaderDropdownId | null>(
    null
  );

  const handleCategoryChange = (value: string) => {
    if (!isHealthMapIndicator(value)) return;
    onCategoryChange?.(value);
  };

  const safeCategoryOptions =
    categoryOptions?.length ? categoryOptions : defaultCategoryOptions;

  const safeYearOptions =
    yearOptions?.length || !year
      ? yearOptions ?? []
      : [{ name: year, value: year }];
  
  return (
    <div className="flex w-full flex-wrap items-center justify-end gap-3">
      {showCategoryFilter && (
        <Filter
          id="category"
          title="Categoría"
          values={category}
          isOpen={openDropdown === "category"}
          onOpenChange={(id) => setOpenDropdown(id as HeaderDropdownId | null)}
          onChange={handleCategoryChange}
          allowClear={false}
          className="w-fit max-sm:w-full"
          options={safeCategoryOptions}
        />
      )}

      {showYearFilter && (
        <Filter
          id="year"
          title="Año"
          values={year}
          isOpen={openDropdown === "year"}
          onOpenChange={(id) => setOpenDropdown(id as HeaderDropdownId | null)}
          onChange={(value) => onYearChange?.(value)}
          allowClear={false}
          className="w-fit max-sm:w-full"
          options={safeYearOptions}
        />
      )}

      {showSearchBar && (
        <LocationAutocomplete
          value={selectedLocation}
          onChange={(location) => onLocationChange?.(location)}
          placeholder="Ingrese el estado o municipio..."
          limit={8}
          className="w-[300px] max-lg:w-[260px] max-sm:w-full"
        />
      )}
    </div>
  );
}
