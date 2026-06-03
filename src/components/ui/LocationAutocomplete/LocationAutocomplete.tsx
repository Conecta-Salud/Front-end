import { useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import type {
  LocationSearchResult,
  LocationSearchType,
} from "../../../features/locations/types/locationSearch.types";
import { useLocationSearchQuery } from "../../../features/locations/queries/locationSearch.queries";
import { useDebouncedValue } from "../../../features/locations/hooks/useDebouncedValue";
import { formatLocationDisplayText } from "../../../features/locations/utils/locationDisplay.utils";

type LocationAutocompleteProps = {
  value?: LocationSearchResult | null;
  placeholder?: string;
  limit?: number;
  allowedTypes?: LocationSearchType[];
  disabled?: boolean;
  error?: string | null;
  className?: string;
  onChange: (location: LocationSearchResult | null) => void;
};

const typeLabels: Record<LocationSearchType, string> = {
  state: "Estado",
  municipality: "Municipio",
};

export default function LocationAutocomplete({
  value = null,
  placeholder = "Buscar estado o municipio...",
  limit = 10,
  allowedTypes,
  disabled = false,
  error,
  className = "",
  onChange,
}: LocationAutocompleteProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebouncedValue(search, 350);

  const query = useLocationSearchQuery({
    query: debouncedSearch,
    limit,
    enabled: isOpen && !disabled,
  });

  const filteredResults = useMemo(() => {
    const results = query.data ?? [];

    if (!allowedTypes?.length) return results;

    return results.filter((item) => allowedTypes.includes(item.type));
  }, [query.data, allowedTypes]);

  const inputValue = isOpen
    ? search
    : formatLocationDisplayText(value?.displayName);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch(value?.displayName ?? "");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [value]);

  const handleSelect = (location: LocationSearchResult) => {
    onChange(location);
    setSearch(formatLocationDisplayText(location.displayName));
    setIsOpen(false);
  };

  const handleClearSelection = () => {
    onChange(null);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={["relative ", className].join(" ")}>
      <SearchBar
        searchTerm={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => {
          if (disabled) return;
          setSearch(value?.displayName ?? "");
          setIsOpen(true);
        }}
        onSearch={(term) => {
          setSearch(term);
          setIsOpen(true);

          if (value) {
            onChange(null);
          }
        }}
        className={[
          error ? "border-red-500" : "",
          "h-11",
        ].join(" ")}
        rightElement={
          value ? (
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-[25px] font-bold"
              style={{ color: "var(--color-blue)" }}
              aria-label="Limpiar ubicación"
            >
              ×
            </button>
          ) : undefined
        }
      />

      {isOpen && search.trim().length >= 2 && (
        <div className="absolute left-0 right-0 z-[9999] mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="max-h-[280px] overflow-y-auto p-2">
            {query.isLoading && (
              <div className="px-3 py-3 text-[14px] text-gray-500">
                Buscando ubicaciones...
              </div>
            )}

            {query.isError && (
              <div className="px-3 py-3 text-[14px] text-red-500">
                No se pudo buscar la ubicación.
              </div>
            )}

            {!query.isLoading &&
              !query.isError &&
              filteredResults.length === 0 && (
                <div className="px-3 py-3 text-[14px] text-gray-500">
                  Sin resultados.
                </div>
              )}

            {!query.isLoading &&
              !query.isError &&
              filteredResults.map((location) => (
                <button
                  key={`${location.type}-${location.id}`}
                  type="button"
                  onClick={() => handleSelect(location)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition hover:bg-gray-100"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-black">
                      {formatLocationDisplayText(location.displayName)}
                    </p>

                    <p className="mt-1 text-[12px] text-gray-500">
                      {typeLabels[location.type]}
                    </p>
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}