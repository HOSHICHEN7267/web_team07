import { useContext } from "react";
import { CartContext } from "../CartContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Cart() {
  const { cartItems, removeFromCart, getTotal, increaseQuantity, decreaseQuantity, } = useContext(CartContext);

  return (
    <>
      <div className="inset-0 bg-gray-100">
        <Navbar />

        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-700">購物車</h2>

          {cartItems.length === 0 ? (
            <p className="mt-4 text-gray-500">購物車是空的</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {cartItems.map((product) => (
                  <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
                    <img
                      src={product.img}
                      alt="商品"
                      className="w-full h-45 object-cover rounded-md"
                    />
                    <h3 className="mt-2 text-lg font-semibold text-black">{product.name}</h3>
                    <p className="text-gray-600">價格：${product.price}</p>
                      {/* 數量控制按鈕 */}
                    <div className="flex items-center mt-2 space-x-2">
                      <button onClick={() => decreaseQuantity(product.id)}
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400" >
                        −
                      </button>
                      <span className="text-gray-700 font-semibold">{product.quantity}</span>
                      <button onClick={() => increaseQuantity(product.id)}
                        className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400" >
                        ＋
                      </button>
                    </div>
                    <p className="text-gray-800 font-bold">小計：${product.price * product.quantity}</p>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    >
                      移除商品
                    </button>
                  </div>
                ))}
              </div>

              {/* 總金額 */}
              <div className="mt-10 text-right">
                <h3 className="text-xl font-bold text-gray-700">
                  總金額：${getTotal()}
                </h3>
              </div>
            </>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}
