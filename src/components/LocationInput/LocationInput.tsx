import React, { useEffect, useRef, useState } from 'react';
import pinIcon from '../../assets/icons/pin.svg';
import cancelarIcon from '../../assets/icons/cancelar.svg';

export type LocationLevel = "state" | "municipality";

export type LocationOption = {
  id: string;
  name: string;
  level: LocationLevel;
  stateName?: string;
  stateCode?: string;
};

type LocationInputProps = {
  value?: LocationOption | null;
  options: LocationOption[];
  placeholder?: string;
  restrictedLevel?: LocationLevel;
  disabled?: boolean;
  error?: string;
  onClear?: () => void;
  onChange: (value: LocationOption | null) => void;
};

const getDisplayLabel = (option: LocationOption): string => {
  if (option.level === 'municipality' && option.stateName) {
    return `${option.name} (${option.stateName})`;
  }

  return option.name;
};

const LocationInput: React.FC<LocationInputProps> = ({ 
  value = null,
  options,
  placeholder = 'Selecciona una ubicación',
  restrictedLevel,
  disabled = false,
  error,
  onChange,
  onClear,
}) => {

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  
  const normalizedSearch = search.toLowerCase().trim();

  const filteredOptions = options.filter((option) => {
    const matchesLevel = restrictedLevel
      ? option.level === restrictedLevel
      : true;

    const matchesSearch = normalizedSearch
      ? getDisplayLabel(option).toLowerCase().includes(normalizedSearch)
      : true;

    return matchesLevel && matchesSearch;
  });

  const handleSelect = (option: LocationOption) => {
    onChange(option);
    setSearch(getDisplayLabel(option));
    setOpen(false);
  };

  const handleClear = () => {
    if (disabled) return;

    onChange(null);
    setSearch("");
    setOpen(false);
    onClear?.();
  };

  useEffect(() => {
    setSearch(value ? getDisplayLabel(value) : "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);

        if (value) {
          setSearch(getDisplayLabel(value));
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value]);


  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`
          relative flex h-[60px] w-full items-center overflow-hidden
          rounded-[15px] border-2 bg-[#F1F1F1] shadow-md transition-all
          ${disabled ? "cursor-not-allowed opacity-60" : ""}
          ${error ? "border-red-500" : "border-[var(--color-green-start)]"}
        `}
      >
        <div className="pointer-events-none absolute left-[10px] flex items-center">
          <img
            src={pinIcon}
            alt=""
            aria-hidden="true"
            className="h-[24px] w-auto object-contain"
          />
        </div>

        <input
          type="text"
          value={search}
          placeholder={placeholder}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);

            if (value) {
              onChange(null);
            }
          }}
          onFocus={() => {
            if (!disabled) setOpen(true);
          }}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          className="
            h-full w-full bg-transparent
            pl-[50px] pr-[60px] text-[20px] font-bold
            outline-none disabled:cursor-not-allowed
          "
        />

        {(value || search) && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpiar ubicación"
            className="
              absolute right-[10px] flex items-center justify-center
              border-none bg-transparent p-0 transition-opacity hover:opacity-80
            "
          >
            <img
              src={cancelarIcon}
              alt=""
              aria-hidden="true"
              className="h-[42px] w-[42px] object-contain"
            />
          </button>
        )}
      </div>

      {open && !disabled && (
        <div className="absolute left-0 right-0 z-50 mt-2 rounded-[15px] border border-gray-200 bg-white shadow-lg">
          <div className="max-h-[260px] overflow-y-auto p-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full rounded-[10px] px-4 py-3 text-left hover:bg-gray-100"
                >
                  <span className="block text-[16px] font-semibold text-black">
                    {option.name}
                  </span>

                  {option.level === "municipality" && option.stateName && (
                    <span className="block text-[14px] text-gray-500">
                      {option.stateName}
                    </span>
                  )}

                  {option.level === "state" && (
                    <span className="block text-[14px] text-gray-500">
                      Estado
                    </span>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-[14px] text-gray-500">
                No se encontraron resultados.
              </div>
            )}
          </div>
        </div>
      )}

      {error && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
};

export default LocationInput;