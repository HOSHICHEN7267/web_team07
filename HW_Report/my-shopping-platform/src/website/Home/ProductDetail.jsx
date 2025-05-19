import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { id } = useParams(); // 從 URL 抓出商品 ID
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 根據你的 API URL 調整這裡
    fetch(`/api/products/${id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("載入商品失敗", err));
  }, [id]);

  if (!product) return <div>載入中...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>價格：${product.price}</p>
      <p>{product.description}</p>
      <button>加入購物車</button>
    </div>
  );
};

export default ProductDetail;
