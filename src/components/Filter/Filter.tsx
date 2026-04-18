import React, { useState } from "react";
import { ListFilter, Check } from "lucide-react";

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
  const selectedValues = values ? values.split(",") : [];

  const toggleValue = (val: string) => {
    let newValues = [...selectedValues];

    if (newValues.includes(val)) {
      newValues = newValues.filter((v) => v !== val);
    } else {
      newValues.push(val);
    }

    onChange(newValues.join(","));
  };

  return (
    <div className="relative">
      {/* BOTÓN */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 h-11 rounded-xl border shadow-sm"
        style={{
          borderColor: "#14B8A6",
          backgroundColor: "#fff",
          minWidth: "180px",
        }}
      >
        <ListFilter className="w-4 h-4 text-[#14B8A6]" />

        <span className="text-sm truncate">
          {selectedValues.length > 0
            ? `${title} | ${selectedValues.length}`
            : title}
        </span>
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="absolute mt-2 w-full rounded-xl shadow-lg z-50"
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
          }}
        >
          <div className="p-2 max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = selectedValues.includes(option.value);

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

            {selectedValues.length > 0 && (
              <div
                onClick={() => onChange("")}
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
