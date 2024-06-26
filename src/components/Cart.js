// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        axios.get('/api/cart')
            .then(response => setCart(response.data))
            .catch(error => console.error('Error fetching cart:', error));
    }, []);

    const updateQuantity = (productId, quantity) => {
        axios.post('/api/cart/update', { productId, quantity })
            .then(response => setCart(response.data))
            .catch(error => console.error('Error updating cart:', error));
    };

    const purchase = () => {
        axios.post('/api/orders/create')
            .then(response => {
                console.log('Order created:', response.data);
                setCart(null); // Clear the cart
            })
            .catch(error => console.error('Error creating order:', error));
    };

    if (!cart) return <div>Loading...</div>;

    return (
        <div>
            <h1>Cart</h1>
            <ul>
                {cart.products.map(item => (
                    <li key={item.productId}>
                        {item.productId} - Quantity: {item.quantity}
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
                    </li>
                ))}
            </ul>
            <button onClick={purchase}>Purchase</button>
        </div>
    );
}

export default Cart;
