import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

const API = "https://dummyjson.com/products";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, search, setSearch }}>
      {children}
    </ProductContext.Provider>
  );
};