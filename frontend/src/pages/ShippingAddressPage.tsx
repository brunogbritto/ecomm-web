import React, { useContext, useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../Store";

export default function ShippingAddressPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("/payment");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3={false} step4={false} />

      <h1 className="text-2xl font-semibold mt-4">Shipping Address</h1>

      <Form onSubmit={submitHandler} className="mt-4 space-y-4">
        <div>
          <label htmlFor="fullName" className="block font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div>
          <label htmlFor="address" className="block font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="city" className="block font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="postalCode" className="block font-medium">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="country" className="block font-medium">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Continue to Payment
          </button>
        </div>
      </Form>
    </div>
  );
}
