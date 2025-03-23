import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Product() {
  const products = [
    { id: 1, name: "吉伊卡哇", price: 99, img: "/img/items/chiikawa.jpg" },
    { id: 2, name: "小八", price: 999, img: "/img/items/hachiware.jpg" },
    { id: 3, name: "烏薩奇", price: 9999, img: "/img/items/usagi.jpg" },
    { id: 4, name: "獅薩", price: 999, img: "/img/items/sisa.jpg" },
  ];

  return (
    <>
      <div className="inset-0 bg-gray-100">
        <Navbar />
        {/* 商品區域 */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-700">熱門商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
                <img
                  src={product.img}
                  alt="商品"
                  className="w-full h-45 object-cover rounded-md"
                />
                <h3 className="mt-2 text-lg font-semibold text-black">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">加入購物車</button>
              </div>
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
