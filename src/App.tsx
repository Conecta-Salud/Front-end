import { Button, Label } from '@heroui/react';
import { Input } from '@heroui/react';
import { useState } from 'react';

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
    <div>
      <h1 className="text-3xl font-bold underline">Hello, World!</h1>
      <Button variant="primary"> My Buttonn </Button>

      <Button variant="secondary">Edit</Button> 

        <div className="flex flex-col gap-1">
        <Label htmlFor="input-type-password">Password</Label>
        <Input id="input-type-password" placeholder="••••••••" type="password" />
      </div>  

      <CustomInputField
        name="email"
        label="Correo"
        type="email"
        placeholder="correo@ejemplo.com"
        value={form.email}
        onChange={(value) => handleChange("email", value)}
        importance
      />
        
        </div>
  );
}

export default App;