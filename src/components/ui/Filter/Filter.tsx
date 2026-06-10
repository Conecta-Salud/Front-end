import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import filterIcon from "../../../assets/icons/filterIcon.svg";
import separatorIcon from "../../../assets/icons/separatorIcon.svg";
import SelectedLabelComp from "./SelectedLabel";

interface Option {
  name: string;
  value: string;
}

type FilterProps = Readonly<{
  id: string;
  title: string;
  options: Option[];
  values: string;
  isOpen: boolean;
  onOpenChange: (id: string | null) => void;
  onChange: (value: string) => void;
  className?: string;
  allowClear?: boolean;
}>;

type DropdownPosition = {
  top: number;
  left: number;
  width: number;
};

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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [dropdownPosition, setDropdownPosition] =
    useState<DropdownPosition | null>(null);

  const selectedValue = values || "";

  const selectedLabel =
    options.find((option) => option.value === selectedValue)?.name || "";

  const toggleValue = (value: string) => {
    if (value === selectedValue && allowClear) {
      onChange("");
    } else {
      onChange(value);
    }

    onOpenChange(null);
  };

  const updateDropdownPosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setDropdownPosition({
      top: rect.bottom + 8,
      left: rect.right,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    updateDropdownPosition();

    const handleResize = () => {
      updateDropdownPosition();
    };

    const handleScroll = () => {
      updateDropdownPosition();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) return;

      const clickedInsideButton = containerRef.current?.contains(target);
      const clickedInsideDropdown = dropdownRef.current?.contains(target);

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
    <div ref={containerRef} className={["relative", className].join(" ")}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => onOpenChange(isOpen ? null : id)}
        className="flex h-11 w-full items-center gap-2 rounded-xl border-2 bg-white px-[10px] shadow-sm"
        style={{
          borderColor: "var( --color-blue)",
        }}
      >
        <img
          src={filterIcon}
          alt="filter"
          className="w-[21px] h-[13px] shrink-0"
        />

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

      {isOpen &&
        dropdownPosition &&
        createPortal(
          <div
            ref={dropdownRef}
            role="listbox"
            aria-label={title}
            className="fixed rounded-xl shadow-lg border-2 border-gray-200 bg-white"
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              minWidth: dropdownPosition.width,
              maxWidth: 320,
              transform: "translateX(-100%)",
              zIndex: 9999,
            }}
          >
            <div className="p-2 max-h-60 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === selectedValue}
                  onClick={() => toggleValue(option.value)}
                  className="w-full cursor-pointer whitespace-nowrap rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#57D8BE]"
                >
                  {option.name}
                </button>
              ))}

              {allowClear && selectedValue && (
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    onOpenChange(null);
                  }}
                  className="mt-2 w-full cursor-pointer rounded-md py-2 text-center text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#57D8BE]"
                  style={{ color: "#14B8A6" }}
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
