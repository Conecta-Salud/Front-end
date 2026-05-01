import searchIcon from "../../assets/icons/searchIcon.svg";

interface SearchBarProps {
  searchTerm?: string;
  placeholder?: string;
  onSearch: (term: string) => void;
  className?: string;
}

export default function SearchBar({
  searchTerm = "",
  placeholder = "Ingrese el estado o municipio...",
  onSearch,
  className = "",
}: SearchBarProps) {
  
  return (
    <div
      className={[
        "flex items-center gap-2 px-4 h-11 rounded-xl border-2 shadow-sm bg-white",
        className,
      ].join(" ")}
      style={{
        borderColor: "#14B8A6",
      }}
    >
      {/* ICONO */}
      <img src={searchIcon} alt="search" className="w-5 h-5 shrink-0" />

      {/* INPUT */}
      <input
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full min-w-0 outline-none bg-transparent text-sm"
        style={{ color: "#111" }}
      />
    </div>
  );
}
