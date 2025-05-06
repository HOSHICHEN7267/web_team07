import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderSlider from "../../components/HeadSlider";
import Navbar from "../../components/Navbar";
import { useEffect, useState, useContext, useRef} from "react"; 
import { CartContext } from "../CartContext";




// export default function Home() {
//   const products = [
//     { id: 1, name: "吉伊卡哇", price: 99, img: "/img/items/chiikawa.jpg" },
//     { id: 2, name: "小八", price: 999, img: "/img/items/hachiware.jpg" },
//     { id: 3, name: "烏薩奇", price: 9999, img: "/img/items/usagi.jpg" },
//     { id: 4, name: "獅薩", price: 999, img: "/img/items/sisa.jpg" },
//   ];
export default function Home() {
  const [products, setProducts] = useState([]); // 改用 state 來裝後端資料
  const { addToCart } = useContext(CartContext); 
  const [ajaxMessage, setAjaxMessage] = useState("");
  const [wsMessage, setWsMessage] = useState("");
  const socketRef = useRef(null);
  const [addedProductId, setAddedProductId] = useState(null); // 目前顯示成功訊息的商品 ID


  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8001/ws/chat/');

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setWsMessage(data.message);
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => socketRef.current.close();
  }, []);

  // const sendWebSocketMessage = () => {
  //   if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
  //     socketRef.current.send(JSON.stringify({ message: "message from frontend" }));
  //   } else {
  //     console.warn("WebSocket 尚未連線");
  //   }
  // };

  useEffect(() => {
    fetch("http://localhost:8001/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("載入商品失敗", err));
  }, []);
  
  // const testAjax = async () => {
  //   try {
  //     const res = await fetch("http://localhost:8001/api/ajax-test/");
  //     const data = await res.json();
  //     setAjaxMessage("已被加入購物車");
  //   } catch (err) {
  //     setAjaxMessage("fail on testAjax");
  //     console.error(err);
  //   }
  // };

  const handleAddToCart = async (product) => {
    addToCart(product);
  
    // AJAX 請求
    try {
      const res = await fetch("http://localhost:8001/api/ajax-test/");
      const data = await res.json();
  
      setAjaxMessage(data.message);
      setAddedProductId(product.id); // 只標記這個商品被加入
  
      // 自動清除訊息
      setTimeout(() => {
        setAddedProductId(null);
      }, 5000);
    } catch (err) {
      console.error("加入購物車失敗", err);
      setAjaxMessage("加入購物車失敗");
    }
  
    // WebSocket 訊息
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          message: `使用者將 ${product.name} 加入購物車`,
        })
      );
      alert(`${product.name} 已加入購物車！`); // 👈 跳出視窗
    } else {
      console.warn("WebSocket 尚未連線");
    }
  };

  return (
    <>
      <div className="inset-0 bg-gray-100 box-border overflow-x-hidden">
        <Navbar />

        <HeaderSlider />

        {/* AJAX 測試區塊 */}
        {/* <section className="container mx-auto px-4 py-4">
          <button
            onClick={testAjax}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            test AJAX
          </button>
          {ajaxMessage && (
            <p className="mt-2 text-green-700 font-semibold">{ajaxMessage}</p>
          )}
        </section> */}

        {/* WebSocket 測試區塊 */}
        {/* <section className="container mx-auto px-4 py-4">
          <button
            onClick={sendWebSocketMessage}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            test WebSocket
          </button>
          {wsMessage && (
            <p className="mt-2 text-purple-700 font-semibold">{wsMessage}</p>
          )}
        </section> */}

        {/* 商品區域 */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">熱門商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
                <img
                  src={product.img}
                  alt="商品"
                  className="w-full h-auto object-cover rounded-md max-w-full"
                />
                <h3 className="mt-2 text-lg sm:text-xl font-semibold text-black">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                {/* <button className="mt-2 w-full sm:w-auto bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" onClick={testAjax} >加入購物車</button>
                {ajaxMessage && (
                  <p className="mt-2 text-green-700 font-semibold">{product.name}{ajaxMessage}</p>
                )} */}
                <button
                  className="mt-2 w-full sm:w-auto bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => handleAddToCart(product)}
                >
                  加入購物車
                </button>

                {addedProductId === product.id && (
                  <p className="mt-2 text-green-700 font-semibold">
                    ✅ {product.name} 已加入購物車！
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
