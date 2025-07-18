import React from "react";
import ProductButton from "./Buttons/ProductButton";

const Products = ({ product, handleShow, index, showAll }) => {
  return (
    <div
      key={product.id}
      className="shadow-lg h-auto rounded p-4 flex flex-col justify-between hover:scale-[1.02] duration-500"
    >
      <div className="flex flex-col gap-4">
        <img className="w-40 h-40" src={product.image} alt="" />
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl flex-1 line-clamp-2 hover:line-clamp-none">
            {product.title}
          </h2>
          <p className="text-xl font-bold text-green-600 ps-3">$ {product.price}</p>
        </div>
        <ProductDescription
          handleShow={handleShow}
          showAll={showAll}
          index={index}
          product={product}
        />
      </div>
      <div className="flex items-center gap-4 mt-10">
        <ProductButton />
      </div>
    </div>
  );
};

const ProductDescription = ({ handleShow, index, showAll, product }) => (
  <p
    onClick={() => handleShow(product.id)}
    className={`text-sm text-slate-600 cursor-pointer ${
      product.id == index && showAll ? "" : "line-clamp-3"
    }`}
  >
    {product.description}
  </p>
);

export default Products;
