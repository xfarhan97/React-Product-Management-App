import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  // Pre-fill form with existing product
  const existingProduct = products.find((p) => p.id === parseInt(id)) || {};

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (existingProduct) {
      setForm({
        title: existingProduct.title || "",
        price: existingProduct.price || "",
        description: existingProduct.description || "",
        thumbnail: existingProduct.thumbnail || "",
      });
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      alert("Title and Price are required!");
      return;
    }

    try {
      const res = await axios.put(`https://dummyjson.com/products/${id}`, form);
      alert("Product updated successfully (API is dummy, local update only)");
      // Update local state
      setProducts(products.map(p => p.id === parseInt(id) ? { ...p, ...form } : p));
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto" }}>
      <h2 style={{ textAlign: "center" }}>Edit Product</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={handleChange}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#3498db", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;