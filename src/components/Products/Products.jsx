import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Img1 from "../../assets/women/women.png";
import Img2 from "../../assets/women/women2.jpg";
import Img3 from "../../assets/women/women3.jpg";
import Img4 from "../../assets/women/women4.jpg";
import Img5 from "../../assets/women/women5.jpg";
import Img6 from "../../assets/women/women6.jpg";
import Img7 from "../../assets/women/women7.jpg";
import Img8 from "../../assets/women/women8.jpg";
import Img9 from "../../assets/women/women9.jpg";
import Img10 from "../../assets/women/jean.avif";
import Img11 from "../../assets/women/mens1.jpeg";
import Img12 from "../../assets/women/mens2.jpeg";
import Img13 from "../../assets/women/mens3.jpeg";
import Img14 from "../../assets/women/mens4.jpeg";
import Img15 from "../../assets/women/mens5.jpeg";
import Img16 from "../../assets/women/mens6.jpeg";
import Img17 from "../../assets/women/mens7.jpeg";

const ProductsData = [
  { id: 1, img: Img1, title: "Women Ethnic", rating: 5.0, price: 25 },
  { id: 2, img: Img2, title: "Women Western", rating: 4.5, price: 30 },
  { id: 3, img: Img3, title: "Goggles", rating: 4.7, price: 15 },
  { id: 4, img: Img4, title: "Printed T-Shirt", rating: 4.4, price: 20 },
  { id: 5, img: Img5, title: "Fashion T-Shirt", rating: 4, price: 18 },
  { id: 6, img: Img6, title: "Sleeves", rating: 4.9, price: 22 },
  { id: 7, img: Img7, title: "White T-Shirt", rating: 5, price: 28 },
  { id: 8, img: Img8, title: "Shirt", rating: 4.5, price: 35 },
  { id: 9, img: Img9, title: "Full Sleeves", rating: 5, price: 40 },
  { id: 10, img: Img10, title: "jean", rating: 4.5, color: "blue",price: "99.99" },
  { id: 11, img: Img11, title: "hoodies", rating: 3.5, color: "brown",price: "69.99" },
  { id: 12, img: Img12, title: "hoodies", rating: 3.5, color: "brown",price: "69.99" },
  { id: 13, img: Img13, title: "Suit", rating: 5, color: "light gold",price: "199.99" },
  { id: 14, img: Img14, title: "jean shirt", rating: 4.5, color: "blue",price: "59.99" },
  { id: 15, img: Img15, title: "T-Shirt", rating: 4, color: "blue",price: "39.99" },
  { id: 16, img: Img16, title: "casual", rating: 3.5, color: "light blue",price: "69.99" },
  { id: 17, img: Img17, title: "casual pant", rating: 5, color: "white",price: "89.99" },
];

const Products = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem("wishlist")) || []);

  const addToCart = (product) => {
    if (!cart.some((item) => item.id === product.id)) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  const handleBuyNow = (product) => {
    addToCart(product); // Ensure the product is in cart
    localStorage.setItem("buyNowItem", JSON.stringify(product)); // Store product for checkout
    navigate("/payment"); // Redirect to payment page
  };
  return (
    <div className="mt-14 mb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-primary">Top Selling Products for you</p>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-xs text-gray-400">Simplicity is the ultimate sophistication</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {ProductsData.map((product) => (
            <div key={product.id} className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition">
              <Link to={`/product/${product.id}`} className="block">
                <img src={product.img} alt={product.title} className="h-[220px] w-full object-cover rounded-md" />
              </Link>
              <div className="mt-2">
                <h3 className="font-semibold text-center">{product.title}</h3>
                <p className="text-sm text-gray-600 text-center">${product.price}</p>
                <div className="flex justify-center items-center gap-1 text-yellow-400">
                  ⭐ <span>{product.rating}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-2 mt-3 flex-wrap">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-primary text-white py-1 px-4 rounded-md flex items-center gap-2 hover:bg-primary-dark transition"
                >
                  <FaShoppingCart />
                </button>
                <button
                  onClick={() => addToWishlist(product)}
                  className="bg-gray-300 text-black py-1 px-4 rounded-md flex items-center gap-2 hover:bg-gray-400 transition"
                >
                  <FaHeart className="text-red-500" /> 
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-green-500 text-white py-1 px-4 rounded-md flex items-center gap-2 hover:bg-green-600 transition"
                >
                  <FaMoneyBillWave /> Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="mt-10 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
