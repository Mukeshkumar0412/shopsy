import React, { useState, useEffect } from "react";
import "./whishlist.css"

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistItems(storedWishlist);
  }, []);

  const removeFromWishlist = (index) => {
    const updatedWishlist = wishlistItems.filter((_, i) => i !== index);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const moveToCart = (item, index) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
    removeFromWishlist(index);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold pb-16">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="mt-4">
          {wishlistItems.map((item, index) => (
            <li key={index} className="flex flex-col md:flex-row items-center justify-between border-b p-4 gap-4">
              <div className="w-full md:w-[100px] flex-shrink-0 flex justify-center">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[80px] md:w-[100px] object-contain transition-transform duration-300 hover:scale-110 drop-shadow-md"
                />
              </div>
              <span className="text-center md:text-left flex-1">{item.title} - ${item.price}</span>
              <span className="text-center">⭐ {item.rating}</span>
              <div className="flex flex-col md:flex-row gap-2">
                <button
                  onClick={() => moveToCart(item, index)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition w-full md:w-auto"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition w-full md:w-auto"
                >
                  Remove
                </button>
              </div>
            </li>

          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
