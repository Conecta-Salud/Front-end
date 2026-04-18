import { Button } from "@heroui/react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Filter from "./components/Filter/Filter";
import logo from "./assets/ConectaSalud.png";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold underline">Hello, World!</h1>
      <Button variant="primary"> My Buttonn </Button>

      <Button variant="secondary">Edit</Button> 

      <CustomInputField
        name="email"
        label="Correo"
        type="email"
        placeholder="correo@ejemplo.com"
        value={form.email}
        onChange={(value) => handleChange("email", value)}
      />

      <CustomInputField
        name="password"
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        type="password"
        value={form.password}
        onChange={(value) => handleChange("password", value)}
      />
        
        </div>
    <div className="min-h-screen flex flex-col">
      <Header subtitle="Panel Usuario Estratégico" logo={logo} />

      <main className="p-6 flex flex-col gap-6">
        <div className="flex items-center gap-4 flex-wrap">
          <Filter
            title="Categoría"
            values={category}
            onChange={setCategory}
            options={[
              { label: "Cobertura Médica", value: "medica" },
              { label: "Hospitales", value: "hospitales" },
              { label: "Clínicas", value: "clinicas" },
            ]}
          />

          <Filter
            title="Año"
            values={year}
            onChange={setYear}
            options={[
              { label: "2022", value: "2022" },
              { label: "2023", value: "2023" },
              { label: "2024", value: "2024" },
              { label: "2025", value: "2025" },
              { label: "2026", value: "2026" },
            ]}
          />
          <SearchBar
            searchTerm={search}
            onSearch={setSearch}
            placeholder="Ingrese el estado o municipio..."
          />
        </div>
        <div className="text-sm text-gray-600">
          <p>
            <strong>Search:</strong> {search}
          </p>
          <p>
            <strong>Categoría:</strong> {category}
          </p>
          <p>
            <strong>Año:</strong> {year}
          </p>
        </div>
        <Button variant="primary">My Button</Button>
        <Button variant="secondary">Edit</Button>
      </main>
    </div>
  );
}

export default App;
