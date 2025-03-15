import React from "react";
import Payment from "../components/payment/payment";


const Checkout = () => {
  const totalAmount = 50.0; // Replace with dynamic cart total

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Checkout</h1>
      <div className="flex justify-center mt-5">
        <Payment amount={totalAmount} />
      </div>
    </div>
  );
};

export default Checkout;
