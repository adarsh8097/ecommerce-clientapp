// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '' });

    useEffect(() => {
        axios.get('/api/products/')
            .then(response => {setProducts(response.data)
                console.log("Product-data",response.data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const applyFilters = () => {
        axios.get('/api/products/filter', { params: filters })
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error filtering products:', error));
    };

    const addToCart = (productId) => {
        axios.post('/api/cart/add', { productId, quantity: 1 })
            .then(response => console.log('Added to cart:', response.data))
            .catch(error => console.error('Error adding to cart:', error));
    };

    return (
        <div>
            <h1>Products</h1>
            <div style={{backgroundColor:"red"}}>
                <input
                    type="text"
                    placeholder="Category"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                />
                <button onClick={applyFilters}>Apply Filters</button>
            </div>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.name} - ${product.price}
                        <button onClick={() => addToCart(product._id)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
