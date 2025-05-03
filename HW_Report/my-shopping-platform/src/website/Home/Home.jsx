import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderSlider from "../../components/HeadSlider";
import Navbar from "../../components/Navbar";
import { useEffect, useState, useContext} from "react"; 
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

  useEffect(() => {
    fetch("http://localhost:8001/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("載入商品失敗", err));
  }, []);
  
  const testAjax = async () => {
    try {
      const res = await fetch("http://localhost:8001/api/ajax-test/");
      const data = await res.json();
      setAjaxMessage(data.message);
    } catch (err) {
      setAjaxMessage("fail on testAjax");
      console.error(err);
    }
  };

  return (
    <>
      <div className="inset-0 bg-gray-100 box-border overflow-x-hidden">
        <Navbar />

        <HeaderSlider />

        {/* AJAX 測試區塊 */}
        <section className="container mx-auto px-4 py-4">
          <button
            onClick={testAjax}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            test AJAX
          </button>
          {ajaxMessage && (
            <p className="mt-2 text-green-700 font-semibold">{ajaxMessage}</p>
          )}
        </section>

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
                <button className="mt-2 w-full sm:w-auto bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600" onClick={() => addToCart(product)} >加入購物車</button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
