import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import { CartContext } from "../CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:8001/api/products/${id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("載入商品失敗", err));
  }, [id]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...chatMessages, { from: "user", text: userInput }];
    setChatMessages(newMessages);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8001/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userInput,
          product_name: product.name,
          product_description: product.description || "（無描述）",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setChatMessages((prev) => [...prev, { from: "ai", text: data.reply }]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { from: "ai", text: "❌ 回覆失敗：" + (data.error || "未知錯誤") },
        ]);
      }
    } catch (error) {
      setChatMessages((prev) => [
        ...prev,
        { from: "ai", text: "❌ 發送錯誤：" + error.message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };


  if (!product) return <p className="p-8 text-center">載入中...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 gap-6">
        {/* 商品資訊 */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6">
          <img src={product.img} alt={product.name} className="w-full h-80 object-contain rounded" />
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

        {/* AI 聊天室 */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4">AI 助手</h2>

          <div
            ref={messagesContainerRef}
            className="h-[300px] lg:h-[500px] bg-gray-50 border rounded p-3 overflow-y-auto space-y-3"
          >
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`text-sm p-2 rounded break-words max-w-[70%] w-fit ${
                    msg.from === "user" ? "bg-blue-100 text-left" : "bg-gray-200 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="text-sm text-gray-500">AI 回覆中...</div>
              </div>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
              placeholder="輸入你的問題..."
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm"
              disabled={isLoading}
            >
              送出
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
