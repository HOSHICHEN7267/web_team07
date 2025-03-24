import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-700">購物平台</Link>
        <div>
            <Link to="/" className="text-gray-700 hover:text-blue-500 mx-2">首頁</Link>
            <Link to="/product" className="text-gray-700 hover:text-blue-500 mx-2">商品</Link>
            <Link to="/cart" className="text-gray-700 hover:text-blue-500 mx-2">購物車</Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-500 mx-2">登入</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;