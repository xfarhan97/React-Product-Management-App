import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<ProductList />} />

        {/* OTHER PAGES */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;