import { ShoppingBag, ShoppingCart, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavLinks = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex items-center md:gap-6 gap-1">
      <Link
        to="/"
        className="hover:text-blue-300 transition-colors flex gap-1 items-center"
      >
        Products
        <ShoppingBag className="w-6 h-6" />
      </Link>
      <Link
        to="/account"
        className="hover:text-blue-300 transition-colors flex gap-1 items-center"
      >
        <p>{user.username}</p>
        <User className="w-6 h-6" />
      </Link>
      <Link
        to="/cart"
        className="hover:text-blue-300 transition-colors flex gap-1 items-center"
      >
        <p>Cart</p>
        <ShoppingCart className="w-6 h-6" />
      </Link>
      <button
        onClick={handleLogout}
        className="hover:text-blue-300 transition-colors cursor-pointer p-1 
        bg-gradient-to-bl from-slate-800 via-slate-600 to-slate-900 rounded px-4"
      >
        Logout
      </button>
    </div>
  );
};

export default NavLinks;
