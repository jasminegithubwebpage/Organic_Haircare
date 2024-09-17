import React from "react";

function ProductCard({ name, source, info, price }) {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <img
        src={source}
        alt={name}
        className="w-full h-60 object-cover rounded"
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-600">{info}</p>
        <p className="text-lg font-bold">{price}</p>
        <button className="mt-4 bg-brownishgold text-white px-4 py-2 rounded hover:bg-m500">
          Add to cart
        </button>
      </div>
    </div>
  );
}

function ProductSection({ title, products }) {
  return (
    <div className="container-md mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}

export default ProductSection;
