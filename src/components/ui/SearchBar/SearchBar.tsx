import searchIcon from "../../../assets/icons/searchIcon.svg";

interface SearchBarProps {
  searchTerm?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  rightElement?: React.ReactNode;
  onSearch: (term: string) => void;
  onSubmit?: (term: string) => void;
  onFocus?: () => void;
}

export default function SearchBar({
  searchTerm = "",
  placeholder = "Ingrese el estado o municipio...",
  disabled = false,
  className = "",
  inputClassName = "",
  rightElement,
  onSearch,
  onSubmit,
  onFocus,
}: SearchBarProps) {
  return (
    <div
      className={[
        "relative flex h-11 items-center gap-2 rounded-xl border-2 bg-white px-4 shadow-sm",
        disabled ? "cursor-not-allowed opacity-60" : "",
        className,
      ].join(" ")}
      style={{
        borderColor: "var(--color-blue)",
      }}
    >
      <img
        src={searchIcon}
        alt=""
        aria-hidden="true"
        className="h-5 w-5 shrink-0"
      />

      <input
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={onFocus}
        onChange={(event) => onSearch(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSubmit?.(searchTerm.trim());
          }
        }}
        className={[
          "w-full min-w-0 bg-transparent text-sm outline-none disabled:cursor-not-allowed",
          rightElement ? "pr-8" : "",
          inputClassName,
        ].join(" ")}
        style={{ color: "#111" }}
      />

      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  );
}