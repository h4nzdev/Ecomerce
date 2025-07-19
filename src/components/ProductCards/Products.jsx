import React from "react";
import ProductButton from "./Buttons/ProductButton";
import ProductImage from "./ProductImage";
import ProductHeader from "./ProductHeader";
import { useCart } from "../../context/CartContext";
import Swal from "sweetalert2";

const Products = ({ product, handleShow, index, showAll }) => {
  const { cartItems, addToCart } = useCart();

  const handleCart = (id, title, price, image) => {
    const newCart = {
      id: id,
      title: title,
      price: price,
      quantity: 1,
      image: image,
    };

    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
      Swal.fire({
        icon: "error",
        title: "This item is already in cart",
        text: `${title} has not been added.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      addToCart(newCart);
      Swal.fire({
        icon: "success",
        title: "Added to Cart!",
        text: `${title} has been added.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };
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
          <p className="text-xl font-bold text-green-600 ps-3">
            $ {product.price}
          </p>
        </div>
        <ProductDescription
          handleShow={handleShow}
          showAll={showAll}
          index={index}
          product={product}
        />
      </div>
      <div className="flex items-center justify-center p-1 rounded-xl gap-1 mt-2 border min-w-30 max-w-35">
        <p className="text-slate-500">{product.category}</p>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <ProductButton
          handleCart={handleCart}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
        />
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
