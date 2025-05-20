import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:8001/api/products/${id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("載入商品失敗", err));
  }, [id]);

  if (!product) return <p className="p-8 text-center">載入中...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* 包在灰色背景中的兩欄白底內容（RWD 支援） */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 gap-6">
        {/* 左：商品資訊 */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-80 object-contain rounded"
          />
          <h1 className="text-3xl font-bold mt-6">{product.name}</h1>
          <p className="text-xl text-green-600 mt-2">NT${product.price}</p>
          <p className="text-gray-700 mt-4">商品描述：{product.description || "（無描述）"}</p>
          <p className="text-gray-700 mt-1">剩餘庫存：{product.stock}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
          >
            加入購物車
          </button>
        </div>

        {/* 右：聊天室占位 */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">AI 助手</h2>
          <div className="h-96 lg:h-[500px] bg-gray-50 border rounded p-2 overflow-y-auto">
            <p className="text-sm text-gray-500">聊天功能尚未實作</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
