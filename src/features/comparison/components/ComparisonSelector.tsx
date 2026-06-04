import { useEffect, useMemo, useRef, useState } from "react";
import type { ComparisonLevel } from "../types/comparisonSummary.types";
import LocationInput, {
  type LocationOption,
} from "../../../components/ui/LocationInput/LocationInput";

type ComparisonSelectorProps = {
  level: ComparisonLevel;
  firstLocation: LocationOption | null;
  secondLocation: LocationOption | null;
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
  error,
  onLevelChange,
  onFirstLocationChange,
  onSecondLocationChange,
}: ComparisonSelectorProps) {
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);
  const levelDropdownRef = useRef<HTMLDivElement>(null);

  const selectedLevelLabel = useMemo(
    () =>
      levelOptions.find((option) => option.value === level)?.label ??
      "Selecciona",
    [level]
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
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-12 md:col-span-5">
          <LocationInput
            value={firstLocation}
            restrictedLevel={level}
            useRemoteSearch
            searchLimit={10}
            placeholder={
              level === "state"
                ? "Selecciona un estado..."
                : "Selecciona un municipio..."
            }
            onChange={onFirstLocationChange}
          />
        </div>

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
                h-[76px]
                w-full
                flex-col
                items-center
                justify-center
                rounded-[15px]
                px-6
                pr-12
                shadow-md
                outline-none
                cursor-pointer
                transition-all
                hover:scale-[1.01]
                hover:shadow-lg
                active:scale-[0.98]
                focus:shadow-[0_0_0_4px_rgba(20,184,166,0.22)]
              "
              style={{
                background: "var(--gradient-primary-green)",
              }}
            >
              <span className="text-[14px] font-medium leading-none text-white/90">
                Comparar por
              </span>

              <span className="mt-2 text-[28px] font-bold leading-none text-white">
                {selectedLevelLabel}
              </span>

              <span
                className={[
                  "absolute right-5 top-1/2 -translate-y-1/2 text-[18px] text-white transition-transform duration-200",
                  levelDropdownOpen ? "rotate-180" : "rotate-0",
                ].join(" ")}
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
                          if (!isSelected) {
                            onLevelChange(option.value);
                          }

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

        <div className="col-span-12 md:col-span-5">
          <LocationInput
            value={secondLocation}
            restrictedLevel={level}
            useRemoteSearch
            searchLimit={10}
            placeholder={
              level === "state"
                ? "Selecciona otro estado..."
                : "Selecciona otro municipio..."
            }
            error={error ?? undefined}
            onChange={onSecondLocationChange}
          />
        </div>
      </div>
    </section>
  );
}
