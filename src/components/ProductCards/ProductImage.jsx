import React from "react";

const ProductImage = ({ image, title }) => (
  <img className="w-40 h-40" src={image} alt={title} />
);

export default ProductImage;
