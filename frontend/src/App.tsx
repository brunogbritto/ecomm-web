import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 flex flex-col min-h-screen items-center vh-full">
      <ToastContainer position="bottom-center" limit={1} />
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
