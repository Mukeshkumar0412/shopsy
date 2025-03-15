import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY"); // Get from Stripe Dashboard

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const response = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product }),
    });

    const session = await response.json();
    window.location.href = session.id; // Redirect to Stripe Checkout
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-md shadow-lg max-w-md mx-auto mt-16">
      <h2 className="text-2xl font-bold text-center">Payment</h2>
      <p className="text-center text-gray-600">Complete your purchase securely.</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">{product?.title}</h3>
        <p className="text-gray-600">Price: <span className="font-bold">${product?.price}</span></p>
        <img src={product?.img} alt={product?.title} className="h-40 rounded-md mx-auto mt-4" />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Pay Now
      </button>
    </form>
  );
};

const Payment = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));
    if (buyNowItem) {
      setProduct(buyNowItem);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Elements stripe={stripePromise}>
      {product ? <CheckoutForm product={product} /> : <p>Loading...</p>}
    </Elements>
  );
};

export default Payment;
