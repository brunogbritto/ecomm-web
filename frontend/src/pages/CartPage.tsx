import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function CartPage() {
  const navigate = useNavigate();
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const updateCartHandler = async (item: CartItem, quantity: number) => {
    if (item.countInStock < quantity) {
      toast.warn("Desculpe. O produto está fora de estoque.");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  return (
    <div>
      <Helmet>
        <title>Carrinho de compras</title>
      </Helmet>

      <div className="container flex flex-col items-start md:w-[800px] mx-auto">
        <h1 className="font-semibold text-3xl mt-7 mb-4">
          Carrinho de compras
        </h1>
        <div className="w-full bg-white rounded-md shadow-md">
          <div className="flex md:flex-row items-center justify-between bg-gray-100 px-4 py-3">
            <div className="w-5/5 md:w-1/5 sm:space-x-2 md:space-x-4"></div>
            <div className="w-5/5 md:w-1/5 sm:space-x-2 md:space-x-4">
              Produto
            </div>
            <div className="w-5/5 md:w-1/5 sm:space-x-2 md:space-x-4">Qtd.</div>
            <div className="w-5/5 md:w-1/5 sm:space-x-2 md:space-x-4">
              Preço
            </div>
            <div className="w-5/5 md:w-1/5 sm:space-x-2 md:space-x-4"></div>
          </div>
          {cartItems.length === 0 ? (
            <MessageBox variant="info">
              O carrinho está vazio. <Link to="/">Veja mais produtos</Link>
            </MessageBox>
          ) : (
            cartItems.map((item: CartItem) => (
              <div
                key={item._id}
                className="flex items-center sm:space-x-2 md:space-x-4 px-4 py-3 mr-[80px] border-b border-gray-200"
              >
                <div className="w-1/5 sm:space-x-2 md:space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-18" />
                </div>
                <div className="w-1/5 text-1xl sm:space-x-2 md:space-x-2 hover:text-slate-800">
                  <Link to={`/product/${item.slug}`}>{item.name}</Link>
                </div>
                <div className="w-1/5 flex items-center sm:space-x-2 md:space-x-2">
                  <button
                    onClick={() => updateCartHandler(item, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    <FontAwesomeIcon icon={faMinusCircle} />
                  </button>{" "}
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateCartHandler(item, item.quantity + 1)}
                    disabled={item.quantity === 1}
                  >
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </button>{" "}
                </div>
                <div className="w-1/5 sm:space-x-2 md:space-x-2]">
                  {item.price}
                </div>
                <div className="w-5/5 pl-2 sm:space-x-2 md:space-x-2">
                  <button>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="w-full bg-white rounded-md shadow-md mt-4 p-4">
          <p>
            Total: R$ {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}{" "}
            ({cartItems.reduce((a, c) => a + c.quantity, 0)}
            {""} itens)
          </p>
        </div>
      </div>
    </div>
  );
}
