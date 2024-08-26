
// src/App.js or any other component
import React, { useEffect, useState } from 'react';

const Card = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3001/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map(product => (
                    <li key={product.product_id}>
                        {product.product_name} - ${product.product_price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Card;
