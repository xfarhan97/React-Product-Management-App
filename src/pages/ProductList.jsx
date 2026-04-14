import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { products, deleteProduct, loading, error } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ✅ Filter products safely
  const filteredProducts = (products || []).filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Loading state
  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading Products...</h2>;
  }

  // ✅ Error state
  if (error) {
    return <h2 style={{ textAlign: "center", marginTop: "50px", color: "red" }}>{error}</h2>;
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "30px auto", padding: "0 20px" }}>
      
      {/* Heading */}
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Products 🛒
      </h1>

      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        {/* Add Button */}
        <button
          onClick={() => navigate("/add")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2ecc71",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          + Add New Product
        </button>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        {filteredProducts.length === 0 ? (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No products found ❌
          </p>
        ) : (
          filteredProducts.map(product => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff"
              }}
            >
              {/* Image */}
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover"
                }}
              />

              {/* Info */}
              <div style={{ padding: "15px", flexGrow: 1 }}>
                <h3 style={{ margin: "0 0 10px 0" }}>
                  {product.title}
                </h3>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  ${product.price}
                </p>
              </div>

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "10px"
                }}
              >
                {/* Edit */}
                <button
                  onClick={() => navigate(`/edit/${product.id}`)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this product?")) {
                      deleteProduct(product.id);
                    }
                  }}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>

                {/* View */}
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f39c12",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;