import React from "react";
import NavLinks from "./NavLinks";

const Nav = () => {
  return (
    <nav className="w-[90%] p-6 fixed flex items-center justify-between bg-slate-500 rounded text-white z-100">
      <h2 className="text-2xl font-semibold">Shop.AI</h2>
      <div className="min-w-100 max-w-auto">
        <input
          type="text"
          className="w-full bg-white text-black rounded py-2 px-4 outline-none"
          placeholder="Search Products"
        />
      </div>
      <NavLinks />
    </nav> 
  );
};

export default Nav;
