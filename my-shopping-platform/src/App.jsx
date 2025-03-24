import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./website/Home/Home";
import Product from "./website/Home/Product";
import Cart from "./website/Home/Cart";
import Login from "./website/Login";
import Register from "./website/Register";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
