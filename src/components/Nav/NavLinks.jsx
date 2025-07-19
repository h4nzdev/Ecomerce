import { ShoppingCart, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="flex items-center md:gap-8 gap-2">
      <Link to="/" className="hover:text-blue-300 transition-colors">
        Products
      </Link>
      <Link to="/account" className="hover:text-blue-300 transition-colors">
        <User className="w-6 h-6" />
      </Link>
      <Link to="/cart" className="hover:text-blue-300 transition-colors">
        <ShoppingCart className="w-6 h-6" />
      </Link>
      <Link to="/login" className="hover:text-blue-300 transition-colors">
        Login
      </Link>
    </div>
  );
};

export default NavLinks;
