'use client';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import CommentForm from '../../components/CommentForm';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const productImages = {
    'เสื้อฟุตบอล CPE Home': '/img/CPE_home.jpg',
    'เสื้อฟุตบอล CPE Away': '/img/CPE_away.jpg',
  };

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching or parsing JSON:', err));
  }, []);

  const handleCommentAdded = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error re-fetching products:', err));
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            productImage={productImages[product.name] || '/img/default.jpg'}
          >
            {/* แสดงคอมเมนต์ */}
            <h3 className="text-md font-semibold mb-2">Admin: สนใจติดต่อสั่งซื้อได้ทางเพจ IG cpe_fc_kmutt</h3>
            <h4 className="text-md font-semibold mb-2">Comments:</h4>
            {product.comments && product.comments.length > 0 ? (
              product.comments.map(comment => (
                <div
                  key={comment.id}
                  className="bg-gray-200 p-2 rounded mb-2 text-sm"
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                />
              ))
            ) : (
              <p className="text-gray-500 italic text-sm mb-2">No comments yet.</p>
            )}

            {/* ฟอร์มเพิ่มคอมเมนต์ */}
            <CommentForm productId={product.id} onCommentAdded={handleCommentAdded} />
          </ProductCard>
        ))}
      </div>
    </div>
  );
}