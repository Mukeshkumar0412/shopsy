import React from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping, FaHeart, FaCaretDown } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";
import { FiShoppingBag } from "react-icons/fi";
import DarkMode from "./DarkMode";
import { Link, useNavigate } from "react-router-dom"; // Import for navigation

const Navbar = ({ handleOrderPopup }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };
  return (
    <div className="shadow-md bg-white dark:bg-slate-800 dark:text-white duration-200 relative z-40">
      {/* Upper Navbar */}
      <div className="bg-primary/40 py-2">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl flex items-center gap-1">
            <FiShoppingBag size="30" />
            Shopsy
          </Link>

          {/* Search Bar & Buttons */}
          <div className="flex items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                aria-label="Search products"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-lg border border-gray-300 py-1 px-2 text-sm 
                focus:outline-none focus:border-primary dark:border-gray-500 dark:bg-slate-800"
              />
              <IoMdSearch
                className="text-slate-800 dark:text-white absolute top-1/2 -translate-y-1/2 right-3"
                title="Search"
              />
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="text-xl text-primary dark:text-white"
              title="Wishlist"
            >
              <FaHeart />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="text-xl text-primary dark:text-white"
              title="Cart"
            >
              <FaCartShopping />
            </Link>

            {/* Dark Mode */}
            <DarkMode />

            {token ? (
          <button onClick={handleLogout} className="text-red-500">Logout</button>
        ) : (
          <>
            <Link to="/login" className="text-blue-500"><FiLogIn /></Link>
            <Link to="/signup" className="text-blue-500">Sign Up</Link>
          </>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
