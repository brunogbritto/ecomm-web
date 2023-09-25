import { Form, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useContext, useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";

export default function PaymentMethodPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "Paypal"
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3 step4={false}></CheckoutSteps>
      <h1 className="text-2xl font-semibold mt-4 mr-[250px]">Payment Method</h1>
      <Form onSubmit={submitHandler} className="mt-4 space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="radio"
            id="paypal"
            value="PayPal"
            checked={paymentMethodName === "PayPal"}
            onChange={(e) => setPaymentMethodName(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="paypal">PayPal</label>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="radio"
            id="stripe"
            value="Stripe"
            checked={paymentMethodName === "Stripe"}
            onChange={(e) => setPaymentMethodName(e.target.value)}
            className="mr-2"
          />
          <label htmlFor="stripe">Stripe</label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Continue to place order
        </button>
      </Form>
    </div>
  );
}
