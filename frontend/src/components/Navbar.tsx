import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 dark:bg-slate-200 w-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="text-white dark:text-slate-900 font-semibold text-lg"
            >
              BRECHOLA
            </a>
          </div>
          <div className="flex">
            <ThemeSwitcher />
            <a
              href="#"
              className="text-gray-300 dark:text-slate-900 hover:text-white px-3 py-2"
            >
              Carrinho
            </a>
            <a
              href="#"
              className="text-gray-300 dark:text-slate-900 hover:text-white px-3 py-2"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
