import { Button, Label } from '@heroui/react';
import { Input } from '@heroui/react';

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello, World!</h1>
      <Button variant="primary"> My Buttonn </Button>

      <Button variant="secondary">Edit</Button> 

        <div className="flex flex-col gap-1">
        <Label htmlFor="input-type-password">Password</Label>
        <Input id="input-type-password" placeholder="••••••••" type="password" />
      </div>  
        
        </div>
  );
}

export default App;