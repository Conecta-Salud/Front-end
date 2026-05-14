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
  const firstOptions = options.filter(
    (option) => option.code !== secondLocation?.code
  );

  const secondOptions = options.filter(
    (option) => option.code !== firstLocation?.code
  );

  return (
    <section className="rounded-[10px] bg-white p-5 shadow-sm">
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-12 md:col-span-2">
          <label className="mb-2 block text-[14px] font-semibold text-black">
            Nivel territorial
          </label>

          <select
            value={level}
            onChange={(event) =>
              onLevelChange(event.target.value as ComparisonLevel)
            }
            className="h-[60px] w-full rounded-[15px] border-2 border-[var(--color-green-start)] bg-[#F1F1F1] px-4 text-[16px] font-bold outline-none shadow-md"
          >
            {levelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

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