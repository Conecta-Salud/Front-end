import { Button,  } from '@heroui/react';
import { useState } from 'react';

import CustomInputField from './components/CustomInputField/CustomInputField';

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
  );
}

export default App;