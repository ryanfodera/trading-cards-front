import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Header from "./components/Header";

// pages
import Home from "./pages/Home";
import ViewProduct from "./pages/ViewProduct";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/products/:id" element={<ViewProduct />} />
      </Routes>
    </Router>
  );
}

