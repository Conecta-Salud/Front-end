import { Button } from "@heroui/react";
import Header from "./components/Header/Header";
import logo from "./assets/ConectaSalud.png";

function App() {
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

      <main className="p-4 flex flex-col gap-4">
        <h1>Hello, World!</h1>

        <Button variant="primary">My Button</Button>
        <Button variant="secondary">Edit</Button>
      </main>
    </div>
  );
}

export default App;
