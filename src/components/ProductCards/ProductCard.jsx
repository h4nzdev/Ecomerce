import React from "react";
import Products from "./Products";

const ProductCard = ({ products, handleShow, index, showAll }) => {
  return (
    <div className="w-[90%] h-auto rounded grid md:grid-cols-3 grid-cols-1 gap-4 pt-6">
      {products.map((product) => (
        <Products
          product={product}
          handleShow={handleShow}
          index={index}
          showAll={showAll}
        />
      ))}
    </div>
  );
};

export default ProductCard;
