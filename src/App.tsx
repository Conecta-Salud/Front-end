import { Button } from "@heroui/react";
import Header from "./components/Header/Header";
import logo from "./assets/ConectaSalud.png";

function App() {
  return (
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
