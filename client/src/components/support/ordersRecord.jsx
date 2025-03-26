import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderRecord = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token'); // Assume JWT token is stored here
                const response = await axios.get('/api/orders/user-orders', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="mt-40 max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

            {orders.length === 0 ? (
                <p>You have not placed any orders yet.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Order ID</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Total Amount</th>
                            <th className="border border-gray-300 px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="border border-gray-300 px-4 py-2">{order._id}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderRecord;
