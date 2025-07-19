import React from "react";

const ProductButton = ({ handleCart, id, title, price, image }) => {
  return (
    <>
      <button
        onClick={() => handleCart(id, title, price, image)}
        className="w-30 p-2 bg-slate-900 text-white rounded-full cursor-pointer"
      >
        Add to cart
      </button>
      <button className="w-30 p-2 bg-slate-700 text-white rounded-full cursor-pointer">
        Buy
      </button>
    </>
  );
};

export default ProductButton;
