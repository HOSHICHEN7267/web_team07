import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./website/Home/Home";
import Product from "./website/Home/Product";
import ProductDetail from "./website/Home/ProductDetail"; {/* 0519: Add product detail page */}
import Cart from "./website/Home/Cart";
import Login from "./website/Login";
import Register from "./website/Register";
import ForgotPassword from "./website/ForgotPassword";
import ResetPassword from "./website/ResetPassword";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} /> {/* 0519: Add product detail page */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;