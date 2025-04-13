import { Link } from "react-router-dom";
import React, { useState } from "react";

const Navbar = () => {
  // 管理漢堡選單的顯示狀態
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sellerMessage, setSellerMessage] = useState("");

  const becomeSeller = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debugging line
    if (!token) {
      alert("請先登入");
      return;
    }

    const res = await fetch("http://localhost:8001/api/become-seller/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("✅ 你現在是賣家了！");
    } else {
      alert("❌ 升級失敗，請稍後再試");
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-700">購物平台</Link>
        
        {/* 小螢幕上的漢堡選單按鈕 */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* 較大螢幕的導航項目 */}
        <div className="hidden lg:flex">
          <Link to="/" className="text-gray-700 hover:text-blue-500 mx-2">首頁</Link>
          <Link to="/product" className="text-gray-700 hover:text-blue-500 mx-2">商品</Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-500 mx-2">購物車</Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-500 mx-2">登入</Link>

          {/* 成為賣家按鈕 */}
          <button
            onClick={becomeSeller}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md"
          >
            成為賣家
          </button>
        </div>
      </div>

      {/* 小螢幕顯示的選單，當 isMenuOpen 為 true 時顯示 */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center py-4 bg-gray-100">
          <Link to="/" className="text-gray-700 hover:text-blue-500 py-2">首頁</Link>
          <Link to="/product" className="text-gray-700 hover:text-blue-500 py-2">商品</Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-500 py-2">購物車</Link>
          <Link to="/login" className="text-gray-700 hover:text-blue-500 py-2">登入</Link>

          <button
            onClick={becomeSeller}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 mt-2 rounded-md"
          >
            成為賣家
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
