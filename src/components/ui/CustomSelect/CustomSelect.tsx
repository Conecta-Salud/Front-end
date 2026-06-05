import { useEffect, useRef } from "react";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  id: string;
  label: string;
  value: string;
  options?: Option[];
  placeholder?: string;
  disabled?: boolean;
  isOpen: boolean;
  onOpenChange: (id: string | null) => void;
  onChange: (value: string) => void;
};

export default function CustomSelect({
  id,
  label,
  value,
  options = [],
  placeholder = "Selecciona una opción",
  disabled = false,
  isOpen,
  onOpenChange,
  onChange,
}: CustomSelectProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedInsideButton =
        containerRef.current && containerRef.current.contains(target);

      const clickedInsideDropdown =
        dropdownRef.current && dropdownRef.current.contains(target);

      if (!clickedInsideButton && !clickedInsideDropdown) {
        onOpenChange(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className="h-[65px] w-full rounded-[10px] px-0.75 py-0.75"
        style={{ background: "var(--gradient-primary-green)" }}
      >
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => {
            if (disabled) return;
            onOpenChange(isOpen ? null : id);
          }}
          className={[
            "relative flex h-full w-full flex-col justify-center rounded-[7.5px] bg-white px-2.5 py-2.5 text-left leading-none transition-all duration-200",
            disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
          ].join(" ")}
        >
          <span
            className="text-[14px] font-semibold"
            style={{ color: "var(--color-blue)" }}
          >
            {label}
          </span>

          <span
            className={[
              "mt-1 block w-full h-full truncate pr-10 text-[20px] leading-none",
              selectedOption ? "text-black" : "text-[#98A2B3]",
            ].join(" ")}
          >
            {selectedOption?.label ?? placeholder}
          </span>

          <svg
            className={[
              "absolute right-3 top-1/2 h-[22px] w-[22px] -translate-y-1/2 transition-transform duration-200",
              isOpen ? "rotate-180" : "",
            ].join(" ")}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="var(--color-green-end)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          role="listbox"
          aria-label={label}
          className="
            absolute
            left-0
            right-0
            z-[9999]
            mt-2
            rounded-xl
            border-2
            border-gray-200
            bg-white
            shadow-lg
          "
        >
          <div className="max-h-60 overflow-y-auto p-2">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    onOpenChange(null);
                  }}
                  className={[
                    "w-full cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-left text-sm",
                    "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#57D8BE]",
                    isSelected ? "bg-gray-100 font-semibold" : "",
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
)}
    </div>
  );
}
