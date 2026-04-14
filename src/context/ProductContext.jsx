import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

const API = "https://dummyjson.com/products";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);   // ✅ NEW
  const [error, setError] = useState(null);       // ✅ NEW

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data.products);
    } catch (err) {
      console.error("API ERROR:", err);
      setError("Failed to load products ❌");     // ✅ NEW
    } finally {
      setLoading(false);                         // ✅ NEW
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, error, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};