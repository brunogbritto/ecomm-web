import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
              {/* Shipping address content goes here */}
            </div>
          </div>

          {/* Payment Information */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Payment Information</h2>
            {/* Payment details go here */}
          </div>

          {/* Order Items */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Order Items</h2>
            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              {/* List of ordered items goes here */}
            </div>
          </div>
        </div>

        {/* Coluna da Direita */}
        <div className="w-[200px]">
          {/* Order Summary */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              {/* Order summary content goes here */}
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="mt-8">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
          Place Order
        </button>
      </div>
    </div>
  );
}
