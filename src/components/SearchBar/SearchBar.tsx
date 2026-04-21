import searchIcon from "../../assets/icons/searchIcon.svg";

interface SearchBarProps {
  searchTerm?: string;
  placeholder?: string;
  onSearch: (term: string) => void;
}

export default function SearchBar({
  searchTerm = "",
  placeholder = "Ingrese el estado o municipio...",
  onSearch,
}: SearchBarProps) {
  return (
    <div
      className="flex items-center gap-2 px-4 h-11 rounded-xl border-2 shadow-sm"
      style={{
        borderColor: "#14B8A6",
        backgroundColor: "#fff",
        minWidth: "280px",
      }}
    >
      {/* ICONO */}
      <img src={searchIcon} alt="search" className="w-5 h-5" />

      {/* INPUT */}
      <input
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full outline-none bg-transparent text-sm"
        style={{ color: "#111" }}
      />
    </div>
  );
}
