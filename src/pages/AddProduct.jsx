import { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const { setProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  // Controlled form state
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    thumbnail: "",
  });

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
      const res = await axios.post("https://dummyjson.com/products/add", form);
      alert("Product added successfully (API is dummy, local update only)");
      // Update local state
      setProducts(prev => [...prev, { ...res.data, id: Date.now() }]);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto" }}>
      <h2 style={{ textAlign: "center" }}>Add Product</h2>
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
          style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#2ecc71", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;