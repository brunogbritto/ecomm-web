import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { CartItem } from "../types/Cart";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";

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
            <div className="w-5/5 md:w-1/5">Foto</div>
            <div className="w-5/5 md:w-1/5">Nome</div>
            <div className="w-5/5 md:w-1/5">Qtd.</div>
            <div className="w-5/5 md:w-1/5">Preço</div>
            <div className="w-5/5 md:w-1/5">Remover</div>
          </div>
          {cartItems.length === 0 ? (
            <MessageBox variant="info">
              O carrinho está vazio. <Link to="/">Veja mais produtos</Link>
            </MessageBox>
          ) : (
            cartItems.map((item: CartItem) => (
              <div
                key={item._id}
                className="flex items-center justify-between space-between sm:space-between px-4 py-3 border-b border-gray-200"
              >
                <div className="w-1/5">
                  <img src={item.image} alt={item.name} className="w-16 h-18" />
                </div>
                <div className="w-1/5 text-1xl">{item.name}</div>
                <div className="w-1/5 flex items-center">
                  {/* Botões de adicionar e remover quantidade */}
                </div>
                <div className="w-1/5 mr-auto">{item.price}</div>
                <div className="w-5/5">
                  <button></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
