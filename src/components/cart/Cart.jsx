import React, { useState, useEffect } from "react";
import "./cart.css"

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold pb-16">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="mt-4">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item flex justify-between items-center border-b p-6">
              <div className="h-[100px] flex-shrink-0">
                <img
                  src={item.img}
                  alt={item.title}
                  className="max-w-[80px] block mx-auto hover:scale-110 transition duration-300"
                />
              </div>
              <span className="flex-1 text-center">{item.title} - ${item.price}</span>
              <span className="flex-1 text-center">⭐ {item.rating}</span>
              <button
                onClick={() => removeItem(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                aria-label={`Remove ${item.title}`}
              >
                Remove
              </button>
            </li>

          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
