import { useState } from "react";
import filterIcon from "../../assets/icons/filterIcon.svg";
import separatorIcon from "../../assets/icons/separatorIcon.svg";
import SelectedLabelComp from "./SelectedLabel";

interface Option {
  name: string;
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
    options.find((o) => o.value === selectedValue)?.name || "";

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
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-[10px] h-11 rounded-xl border-2 shadow-sm"
        style={{
          borderColor: "#14B8A6",
          backgroundColor: "#fff",
        }}
      >
        <img src={filterIcon} alt="filter" className="w-[21px] h-[13px]" />

        <span className="flex items-center gap-2 text-sm truncate">
          {selectedValue ? (
            <>
              {title}
                <img
                  src={separatorIcon}
                  alt="separator"
                  className="w-[2px] h-5 object-contain"
                />
              
              <SelectedLabelComp label={selectedLabel} />
            </>
          ) : (
            title
          )}
        </span>
      </button>
      
      {/* DROPDOWN */}
      {open && (
        <div className="absolute mt-2 w-full rounded-xl shadow-lg z-50 border-2 border-gray-200 bg-white">
          <div className="p-2 max-h-60 overflow-y-auto">
            {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => toggleValue(option.value)}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md hover:bg-gray-100"
                >
                  {option.name}
                </div>
            ))}

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
