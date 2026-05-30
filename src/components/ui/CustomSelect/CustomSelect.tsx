import { useEffect, useRef, useState } from "react";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  label: string;
  value: string;
  options?: Option[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export default function CustomSelect({
  label,
  value,
  options = [],
  placeholder = "Selecciona una opción",
  disabled = false,
  onChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
          }
        }}
        className={[
          "relative flex h-[72px] w-full items-end justify-between rounded-[16px] bg-white px-5 pb-3 pt-2 text-left transition-all duration-200",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        ].join(" ")}
        style={{
          border: "2px solid var(--color-green-end)",
        }}
      >
        <span
          className="absolute left-5 top-2 text-[14px]"
          style={{
            color: "var(--color-green-end)",
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--font-weight-bold)",
          }}
        >
          {label}
        </span>

        <span
          className={
            selectedOption
              ? "text-[15px] text-black"
              : "text-[15px] text-[#98A2B3]"
          }
          style={{
            fontFamily: "var(--font-primary)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          {selectedOption?.label ?? placeholder}
        </span>

        <svg
          className={[
            "h-5 w-5 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
          viewBox="0 0 24 24"
          fill="none"
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

      {isOpen && (
        <div
          className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-[16px] bg-white shadow-lg"
          style={{
            border: "1px solid rgba(110, 231, 183, 0.35)",
          }}
        >
          <div
            className="max-h-[220px] overflow-y-auto py-1"
            role="listbox"
            aria-label={label}
          >
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
                    setIsOpen(false);
                  }}
                  className={[
                    "w-full px-5 py-3 text-left transition-colors duration-150",
                    isSelected ? "bg-[#F3FFFA]" : "hover:bg-[#F8FFFC]",
                  ].join(" ")}
                  style={{
                    color: "#111111",
                    fontSize: "15px",
                    fontFamily: "var(--font-primary)",
                    fontWeight: "var(--font-weight-regular)",
                  }}
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
