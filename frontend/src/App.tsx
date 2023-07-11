import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 flex flex-col min-h-screen items-center vh-full">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="mt-4">Todos os direitos reservados.</footer>
    </div>
  );
}

export default App;
