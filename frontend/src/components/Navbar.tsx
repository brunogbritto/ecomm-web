import { useContext } from "react";
import { Store } from "../Store";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  return (
    <nav className="bg-gray-800 dark:bg-slate-200 w-screen">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-white dark:text-slate-900 font-semibold text-lg"
            >
              BRECHOLA
            </Link>
          </div>
          <div className="flex relative">
            <ThemeSwitcher />
            <Link
              to="/cart"
              className="text-gray-300 dark:text-slate-900 hover:text-white px-3 py-2 relative"
            >
              Carrinho
              {cart.cartItems.length > 0 && (
                <div className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500 pr-1 rounded-full w-6 h-5 text-white flex items-center justify-center text-xs">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </div>
              )}
            </Link>
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
