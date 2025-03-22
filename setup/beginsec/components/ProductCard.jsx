import React from 'react';

const ProductCard = ({ product, productImage, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col items-center">
      {/* รูปภาพสินค้า */}
      <div className="aspect-square bg-gray-100 rounded overflow-hidden mb-4">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* รายละเอียดสินค้า */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1 text-center">{product.name}</h3>
      <p className="text-gray-600 text-sm text-center mb-4">{product.description}</p>

      {/* เนื้อหาเพิ่มเติมจาก parent เช่น คอมเมนต์ และฟอร์ม */}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ProductCard;