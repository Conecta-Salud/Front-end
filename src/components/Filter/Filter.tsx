import { useRef, useEffect } from "react";
import filterIcon from "../../assets/icons/filterIcon.svg";
import separatorIcon from "../../assets/icons/separatorIcon.svg";
import SelectedLabelComp from "./SelectedLabel";

interface Option {
  name: string;
  value: string;
}

interface FilterProps {
  id: string;
  title: string;
  options: Option[];
  values: string;
  isOpen: boolean;
  onOpenChange: (id: string | null) => void;
  onChange: (value: string) => void;
  className?: string;
  allowClear?: boolean;
}

export default function Filter({
  id,
  title,
  options,
  values,
  isOpen,
  onOpenChange,
  onChange,
  className = "",
  allowClear = true,
}: FilterProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  
  const selectedValue = values || "";

  const selectedLabel =
    options.find((o) => o.value === selectedValue)?.name || "";

  const toggleValue = (val: string) => {
    if (val === selectedValue && allowClear) {
      onChange("");
    } else {
      onChange(val);
    }

    onOpenChange(null);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onOpenChange(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div ref={containerRef} className={["relative", className].join(" ")}>
      {/* BOTÓN */}
      <button
        type="button"
        onClick={() => onOpenChange(isOpen ? null : id)}
        className="flex w-full items-center gap-2 px-[10px] h-11 rounded-xl border-2 shadow-sm bg-white"
        style={{
          borderColor: "#14B8A6",
        }}
      >
        <img src={filterIcon} alt="filter" className="w-[21px] h-[13px] shrink-0" />

        <span className="flex min-w-0 items-center gap-2 text-sm truncate">
          {selectedValue ? (
            <>
              <span className="shrink-0">{title}</span>

                <img
                  src={separatorIcon}
                  alt="separator"
                  className="w-[2px] h-5 object-contain shrink-0"
                />
              
              <SelectedLabelComp label={selectedLabel} />
            </>
          ) : (
            <span className="truncate">{title}</span>
          )}
        </span>
      </button>
      
      {/* DROPDOWN */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-max min-w-full max-w-[320px] rounded-xl shadow-lg z-50 border-2 border-gray-200 bg-white">
          <div className="p-2 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => toggleValue(option.value)}
                className="whitespace-nowrap px-3 py-2 cursor-pointer rounded-md hover:bg-gray-100 text-sm"
              >
                {option.name}
              </div>
            ))}

            {allowClear && selectedValue && (
              <div
                onClick={() => {
                  onChange("");
                  onOpenChange(null);
                }}
                className="mt-2 text-center text-sm cursor-pointer py-2 rounded-md hover:bg-gray-100"
                style={{ color: "#14B8A6" }}
              >
                Clear
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
