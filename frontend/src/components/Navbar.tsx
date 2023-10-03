import { useContext, useState } from "react";
import { Store } from "../Store";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const {
    state: { cart, userInfo },
    dispatch,
  } = useContext(Store);

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethods");
    window.location.href = "/signin";
  };

  // Estado para controlar a visibilidade do dropdown
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

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
            {userInfo ? (
              <div className="relative group">
                <div
                  className="text-gray-300 dark:text-slate-900 hover:text-white px-3 py-2 cursor-pointer flex items-center"
                  onClick={toggleDropdown}
                >
                  {userInfo.name}
                  <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
                </div>
                {isDropdownVisible && (
                  <div className="absolute right-0 mt-2 bg-gray-800 text-slate-200 dark:text-gray-800 dark:bg-slate-200 rounded-md shadow-lg">
                    <Link
                      to="/orderhistory"
                      className="block px-4 py-2 text-slate-300 dark:text-slate-900 hover:text-slate-100 dark:hover:bg-slate-100"
                    >
                      Order History
                    </Link>
                    <Link
                      to="#signout"
                      className="block px-4 py-2 text-slate-300 dark:text-slate-900 hover:text-slate-100 dark:hover:bg-slate-100"
                      onClick={signoutHandler}
                    >
                      Logout
                    </Link>
                    {/* Outras opções do dropdown podem ser adicionadas aqui */}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="text-gray-300 dark:text-slate-900 hover:text-white px-3 py-2"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
