import { useState } from "react";
import { Check } from "lucide-react";
import filterIcon from "../../assets/icons/Filtro_logo.svg";

interface Option {
  label: string;
  value: string;
}

interface FilterProps {
  title: string;
  options: Option[];
  values: string;
  onChange: (value: string) => void;
}

export default function Filter({
  title,
  options,
  values,
  onChange,
}: FilterProps) {
  const [open, setOpen] = useState(false);

  const selectedValue = values || "";

  const selectedLabel =
    options.find((o) => o.value === selectedValue)?.label || "";

  const toggleValue = (val: string) => {
    if (val === selectedValue) {
      onChange("");
    } else {
      onChange(val);
    }
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* BOTÓN */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 h-11 rounded-xl border-2 shadow-sm"
        style={{
          borderColor: "#14B8A6",
          backgroundColor: "#fff",
          minWidth: "200px",
        }}
      >
        <img src={filterIcon} alt="filter" className="w-4 h-4" />

        <span className="text-sm truncate">
          {selectedValue ? `${title} | ${selectedLabel}` : title}
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-2 w-full rounded-xl shadow-lg z-50 border-2 border-gray-200 bg-white">
          <div className="p-2 max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = selectedValue === option.value;

              return (
                <div
                  key={option.value}
                  onClick={() => toggleValue(option.value)}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md hover:bg-gray-100"
                >
                  <div
                    className="w-4 h-4 flex items-center justify-center rounded border"
                    style={{
                      borderColor: "#14B8A6",
                      backgroundColor: isSelected ? "#14B8A6" : "transparent",
                    }}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>

                  <span className="text-sm">{option.label}</span>
                </div>
              );
            })}

            {selectedValue && (
              <div
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="mt-2 text-center text-sm cursor-pointer py-2 rounded-md hover:bg-gray-100"
                style={{ color: "#14B8A6" }}
              >
                Limpiar
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
