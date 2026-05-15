import { useEffect, useRef, useState } from "react";
import type { ComparisonLevel } from "../types/comparisonSummary.types";
import LocationInput, {
  type LocationOption,
} from "../../../components/ui/LocationInput/LocationInput";

type ComparisonSelectorProps = {
  level: ComparisonLevel;
  firstLocation: LocationOption | null;
  secondLocation: LocationOption | null;
  options: LocationOption[];
  isLoadingOptions?: boolean;
  error?: string | null;
  onLevelChange: (level: ComparisonLevel) => void;
  onFirstLocationChange: (location: LocationOption | null) => void;
  onSecondLocationChange: (location: LocationOption | null) => void;
};

const levelOptions: Array<{
  value: ComparisonLevel;
  label: string;
}> = [
  {
    value: "state",
    label: "Estados",
  },
  {
    value: "municipality",
    label: "Municipios",
  },
];

export default function ComparisonSelector({
  level,
  firstLocation,
  secondLocation,
  options,
  isLoadingOptions = false,
  error,
  onLevelChange,
  onFirstLocationChange,
  onSecondLocationChange,
}: ComparisonSelectorProps) {

  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);
  const levelDropdownRef = useRef<HTMLDivElement>(null);

  const selectedLevelLabel =
  levelOptions.find((option) => option.value === level)?.label ?? "Selecciona";

  const firstOptions = options.filter(
    (option) => option.code !== secondLocation?.code
  );

  const secondOptions = options.filter(
    (option) => option.code !== firstLocation?.code
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        levelDropdownRef.current &&
        !levelDropdownRef.current.contains(event.target as Node)
      ) {
        setLevelDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
  <section className="rounded-[10px] bg-white p-5 shadow-sm">
    <div className="grid grid-cols-12 items-end gap-4">
      {/* Primer territorio */}
      <div className="col-span-12 md:col-span-5">
        <label className="mb-2 block text-[14px] font-semibold text-black">
          Primer territorio
        </label>

        <LocationInput
          value={firstLocation}
          options={firstOptions}
          restrictedLevel={level}
          placeholder={
            isLoadingOptions
              ? "Cargando ubicaciones..."
              : level === "state"
              ? "Selecciona un estado..."
              : "Selecciona un municipio..."
          }
          disabled={isLoadingOptions}
          onChange={onFirstLocationChange}
        />
      </div>

      {/* Nivel territorial */}
      <div className="col-span-12 md:col-span-2">
          <div ref={levelDropdownRef} className="relative w-full">
            <button
              type="button"
              onClick={() => setLevelDropdownOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={levelDropdownOpen}
              className="
                relative
                flex
                h-[68px]
                w-full
                flex-col
                items-center
                justify-center
                rounded-[15px]
                border-[3px]
                bg-[#F1F1F1]
                px-5
                pr-11
                shadow-md
                outline-none
                cursor-pointer
                transition-all
                hover:bg-white
              "
              style={{
                borderColor: "var(--color-green-start)",
              }}
            >
              <span
                className="text-[12px] font-medium leading-none">
                Comparar por
              </span>

              <span className="mt-1 text-[20px] font-semibold leading-non"
                style={{
                  color: "var(--color-green-start)",
                }}
              >
                {selectedLevelLabel}
              </span>

              <span
                className={[
                  "absolute right-4 top-1/2 -translate-y-1/2 text-[14px] transition-transform duration-200",
                  levelDropdownOpen ? "rotate-180" : "rotate-0",
                ].join(" ")}
                style={{
                  color: "var(--color-primary-green-solid)",
                }}
              >
                ▼
              </span>
            </button>

            {levelDropdownOpen && (
              <div className="absolute left-0 right-0 z-50 mt-2 rounded-[15px] border border-gray-200 bg-white shadow-lg">
                <div className="max-h-[260px] overflow-y-auto p-2">
                  {levelOptions.map((option) => {
                    const isSelected = option.value === level;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          onLevelChange(option.value);
                          setLevelDropdownOpen(false);
                        }}
                        className={[
                          "w-full rounded-[10px] px-4 py-3 text-left hover:bg-gray-100",
                          isSelected ? "bg-gray-100" : "",
                        ].join(" ")}
                      >
                        <span className="block text-[16px] font-semibold text-black">
                          {option.label}
                        </span>

                        <span className="block text-[14px] text-gray-500">
                          {option.value === "state"
                            ? "Comparar estados"
                            : "Comparar municipios"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
      </div>

      {/* Segundo territorio */}
      <div className="col-span-12 md:col-span-5">
        <label className="mb-2 block text-[14px] font-semibold text-black">
          Segundo territorio
        </label>

        <LocationInput
          value={secondLocation}
          options={secondOptions}
          restrictedLevel={level}
          placeholder={
            isLoadingOptions
              ? "Cargando ubicaciones..."
              : level === "state"
              ? "Selecciona otro estado..."
              : "Selecciona otro municipio..."
          }
          disabled={isLoadingOptions}
          error={error ?? undefined}
          onChange={onSecondLocationChange}
        />
      </div>
    </div>
  </section>
);
}