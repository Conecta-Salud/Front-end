import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm?: string;
  placeholder?: string;
  onSearch: (term: string) => void;
}

export default function SearchBar({
  searchTerm,
  placeholder,
  onSearch,
}: SearchBarProps) {
  return (
    <div
      className="flex items-center gap-2 px-4 h-11 rounded-xl border"
      style={{
        borderColor: "#14B8A6",
        backgroundColor: "#fff",
        minWidth: "280px",
      }}
    >
      <Search className="w-5 h-5 text-[#14B8A6]" />

      <input
        type="text"
        value={searchTerm}
        placeholder={placeholder || "Ingrese el estado o municipio..."}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full outline-none bg-transparent text-sm"
        style={{
          color: "#111",
        }}
      />
    </div>
  );
}
