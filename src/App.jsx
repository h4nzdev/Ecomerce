import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCards/ProductCard";
import Loading from "./components/Loading";

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(null);
  const [showAll, setShowAll] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://fakestoreapi.com/products/");
      setProducts(response.data);
    } catch (error) {
      setError("Failed to load the products!");
    } finally {
      setLoading(false);
    }
  };

  const handleShow = (id) => {
    setIndex(id);
    setShowAll(!showAll);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);

  return (
    <main className="w-full min-h-screen max-h-auto flex items-center justify-center flex-col">
      {error && (
        <div className="text-5xl font-semibold animate-pulse">{error}</div>
      )}
      {loading ? (
        <Loading />
      ) : (
        <ProductCard
          products={products}
          handleShow={handleShow}
          index={index}
          showAll={showAll}
        />
      )}
    </main>
  );
};

export default App;
