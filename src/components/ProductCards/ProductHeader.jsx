import React from "react";

const ProductHeader = ({ title, price }) => (
  <div className="flex justify-between">
    <h2 className="font-semibold text-xl flex-1 line-clamp-2 hover:line-clamp-none">
      {title}
    </h2>
    <p className="text-xl font-bold text-green-600 ps-3">$ {price}</p>
  </div>
);

export default ProductHeader;
