import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useEffect, useState, useContext} from "react"; 
import { CartContext } from "../CartContext";


// export default function Product() {
//   const products = [
//     { id: 1, name: "吉伊卡哇", price: 99, img: "/img/items/chiikawa.jpg" },
//     { id: 2, name: "小八", price: 999, img: "/img/items/hachiware.jpg" },
//     { id: 3, name: "烏薩奇", price: 9999, img: "/img/items/usagi.jpg" },
//     { id: 4, name: "獅薩", price: 999, img: "/img/items/sisa.jpg" },
//   ];

export default function Product() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:8001/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("載入商品失敗", err));
  }, []);

  return (
    <>
      <div className="inset-0 bg-gray-100">
        <Navbar />
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-700">熱門商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
                <Link to={`/product/${product.id}`} className="block hover:opacity-90">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-45 object-cover rounded-md"
                  />
                  <h3 className="mt-2 text-lg font-semibold text-black">{product.name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                </Link>
                <button
                  className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => addToCart(product)}
                >
                  加入購物車
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}