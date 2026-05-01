import { useState } from "react";
import Filter from "../Filter/Filter";
import SearchBar from "../SearchBar/SearchBar";

type HeaderActionsProps = {
  showCategoryFilter?: boolean;
  showYearFilter?: boolean;
  showSearchBar?: boolean;

  category?: string;
  year?: string;
  search?: string;

  onCategoryChange?: (value: string) => void;
  onYearChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
};

type HeaderDropdownId = "category" | "year";

export default function HeaderActions({
  showCategoryFilter = false,
  showYearFilter = false,
  showSearchBar = false,

  category = "",
  year = "",
  search = "",

  onCategoryChange,
  onYearChange,
  onSearchChange,
}: HeaderActionsProps) {
  const [openDropdown, setOpenDropdown] = useState<HeaderDropdownId | null>(
    null
  );
  
  return (
    <div className="flex w-full flex-wrap items-center justify-end gap-3">
      {showCategoryFilter && (
        <Filter
          id="category"
          title="Categoría"
          values={category}
          isOpen={openDropdown === "category"}
          onOpenChange={(id) => setOpenDropdown(id as HeaderDropdownId | null)}
          onChange={(value) => onCategoryChange?.(value)}
          className="w-fit max-sm:w-full"
          options={[
            { name: "Cobertura Médica", value: "cobertura_medica" },
            { name: "Infraestructura Hospitalaria", value: "infraestructura" },
            { name: "Vulnerabilidad Poblacional", value: "vulnerabilidad" },
          ]}
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
          className="w-fit max-sm:w-full"
          options={[
            { name: "2024", value: "2024" },
            { name: "2025", value: "2025" },
            { name: "2026", value: "2026" },
          ]}
        />
      )}

      {showSearchBar && (
        <SearchBar
          searchTerm={search}
          onSearch={(value) => onSearchChange?.(value)}
          placeholder="Ingrese el estado o municipio..."
          className="w-[300px] max-lg:w-[260px] max-sm:w-full"
        />
      )}
    </div>
  );
}