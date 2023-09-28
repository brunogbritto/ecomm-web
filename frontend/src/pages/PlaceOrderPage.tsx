import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { useCreateOrderMutation } from "../hooks/orderHooks";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PlaceOrderPage() {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });
      dispatch({ type: "CART_CLEAR" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Helmet>
        <title>Preview Order | Brechola</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <h1 className="text-2xl font-semibold mt-4 mr-[250px]">Preview Order</h1>
      <div className="flex mt-8">
        {/* Coluna da Esquerda */}
        <div className="w-[500px] pr-4">
          {/* Shipping Information */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Shipping Information</h2>
            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              <strong>Nome: </strong>
              {cart.shippingAddress.fullName} <br />
              <strong>Endereço: </strong>
              {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}{" "}
              <br />
              <div className="mt-1 text-blue-900">
                <Link to="/shipping">Edit</Link>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Payment Information</h2>
            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              <strong>Method:</strong> {cart.paymentMethod}
              <div className="mt-1 text-blue-900">
                <Link to="/payment">Edit</Link>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Ordered Items</h2>
            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              {cart.cartItems.map((item) => (
                <div key={item._id} className="flex mb-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="mr-4 w-[75px] h-[95px]"
                  ></img>
                  <Link to={`/product/${item.slug}`}>{item.name}</Link>
                </div>
              ))}
              <div className="text-blue-900">
                <Link to="/cart">Edit</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna da Direita */}
        <div className="w-[250px]">
          {/* Order Summary */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="bg-white rounded-lg p-4 mt-4 flex">
              <ul className="list-none">
                <li className="flex justify-between items-center">
                  Preço itens:
                </li>
                <li className="flex justify-between items-center">Frete:</li>
                <li className="flex justify-between items-center">Taxa:</li>
                <li className="flex justify-between items-center mt-2">
                  <strong>Total: </strong>
                </li>
              </ul>
              <ul className="list-none">
                <li className="flex justify-between items-center ml-5">
                  ${cart.itemsPrice.toFixed(2)}
                </li>
                <li className="flex justify-between items-center ml-5">
                  ${cart.shippingPrice.toFixed(2)}
                </li>
                <li className="flex justify-between items-center ml-5">
                  ${cart.taxPrice.toFixed(2)}
                </li>
                <li className="flex justify-between items-center ml-5 mt-2">
                  <strong>${cart.totalPrice.toFixed(2)}</strong>
                </li>
              </ul>
            </div>
            <div className="mt-2 pb-5 shadow-md">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                onClick={placeOrderHandler}
              >
                Place your order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
