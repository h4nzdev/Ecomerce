import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCards/ProductCard";
import Loading from "../components/Loading";
import Nav from "../components/Nav/Nav";
import CategoryFilter from "../components/Category/CategoryFilter";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(null);
  const [showAll, setShowAll] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  useEffect(() => {
    if (products.length) {
      if (selectedCategory) {
        setFilteredProducts(
          products.filter((product) => product.category === selectedCategory)
        );
      } else {
        setFilteredProducts(products);
      }
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="w-full min-h-screen max-h-auto flex items-center flex-col p-6">
      <Nav />
      <div className="flex items-center flex-col pt-34">
        <CategoryFilter
          selected={selectedCategory}
          onFilterChange={handleCategoryChange}
        />

        {error && (
          <div className="text-5xl font-semibold animate-pulse">{error}</div>
        )}
        {loading ? (
          <Loading />
        ) : (
          <ProductCard
            products={filteredProducts}
            handleShow={handleShow}
            index={index}
            showAll={showAll}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
