import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import { CartContext } from "../CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatBoxRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:8001/api/products/${id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("載入商品失敗", err));
  }, [id]);

  // ✅ 自動捲動聊天室內容底部（不影響整頁）
  useEffect(() => {
    const container = chatBoxRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // 模擬 AI 回覆
    setTimeout(() => {
      const aiMessage = {
        role: "ai",
        text: "這是 AI 的回應：" + input,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1000);
  };

  if (!product) return <p className="p-8 text-center">載入中...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

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
          <p className="text-gray-700 mt-4">
            商品描述：{product.description || "（無描述）"}
          </p>
          <p className="text-gray-700 mt-1">剩餘庫存：{product.stock}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
          >
            加入購物車
          </button>
        </div>

        {/* 右：AI 聊天室區塊 */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">AI 助手</h2>

          {/* ✅ 聊天訊息串（固定高度 + 容器內滾動 + 自動捲到底部） */}
          <div
            ref={chatBoxRef}
            className="h-[500px] bg-gray-50 border rounded p-2 overflow-y-auto mb-3"
          >
            {messages.length === 0 ? (
              <p className="text-sm text-gray-500">請輸入問題以開始對話</p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-3 text-sm ${
                    msg.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block rounded px-3 py-1 ${
                      msg.role === "user"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))
            )}
            {loading && (
              <p className="text-sm text-gray-400 italic mb-2">AI 回覆中...</p>
            )}
          </div>

          {/* 輸入框 */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="輸入訊息..."
              disabled={loading}
              className="flex-1 border rounded px-3 py-2 text-sm disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm disabled:opacity-50"
            >
              送出
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
