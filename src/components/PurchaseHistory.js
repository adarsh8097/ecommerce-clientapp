// src/components/PurchaseHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PurchaseHistory() {
    const [orders, setOrders] = useState([]);
    const [dates, setDates] = useState({ startDate: '', endDate: '' });

    const fetchOrders = () => {
        axios.get('/api/orders', { params: dates })
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
    };

    return (
        <div>
            <h1>Purchase History</h1>
            <div>
                <input
                    type="date"
                    value={dates.startDate}
                    onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
                />
                <input
                    type="date"
                    value={dates.endDate}
                    onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
                />
                <button onClick={fetchOrders}>Fetch Orders</button>
            </div>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        {order.products.map(item => (
                            <div key={item.productId}>
                                {item.productId} - Quantity: {item.quantity}
                            </div>
                        ))}
                        <div>Purchased on: {new Date(order.purchaseDate).toLocaleDateString()}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PurchaseHistory;
