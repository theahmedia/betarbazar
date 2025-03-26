import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderHistoryAndTracking = () => {
    const [orders, setOrders] = useState([]);
    const [latestOrder, setLatestOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/orders/history', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const ordersData = response.data;
                setOrders(ordersData);

                // Set the latest order for tracking
                if (ordersData.length > 0) {
                    setLatestOrder(ordersData[0]); // Assuming the first order is the latest
                }
            } catch (err) {
                console.error('Error fetching orders:', err.response?.data?.message || err.message);
            }
        };

        fetchOrders();
    }, []);

    if (!orders) return <p>Loading...</p>;

    return (
        <div className="mt-40 lg:mt-32 max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Order History & Tracking</h1>

            {latestOrder ? (
                <div className="mb-8 p-4 border rounded shadow">
                    <h2 className="text-xl font-bold mb-4">Latest Order Tracking</h2>
                    <p>
                        <strong>Order ID:</strong> {latestOrder._id}
                    </p>
                    <p>
                        <strong>Status:</strong> {latestOrder.status}
                    </p>
                    <p>
                        <strong>Delivery Man:</strong> {latestOrder.deliveryDetails?.deliveryMan?.name || 'N/A'}
                    </p>
                    <p>
                        <strong>Delivery Man Phone:</strong>{' '}
                        {latestOrder.deliveryDetails?.deliveryMan?.phone || 'N/A'}
                    </p>
                    <p>
                        <strong>Current Location:</strong>{' '}
                        {latestOrder.deliveryDetails?.currentLocation || 'N/A'}
                    </p>
                    <p>
                        <strong>Estimated Delivery:</strong>{' '}
                        {latestOrder.deliveryDetails?.estimatedDelivery
                            ? new Date(latestOrder.deliveryDetails.estimatedDelivery).toLocaleString()
                            : 'N/A'}
                    </p>
                    <a
                        href={latestOrder.invoiceUrl}
                        className="text-blue-500 mt-4 inline-block"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Download Invoice
                    </a>
                </div>
            ) : (
                <p>No recent orders found for tracking.</p>
            )}

            <h2 className="text-xl font-bold mb-4">Order History</h2>
            {orders.length === 0 ? (
                <p>No previous orders found.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Order ID</th>
                            <th className="border px-4 py-2">Total Amount</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <td className="border px-4 py-2">{order._id}</td>
                                <td className="border px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                                <td className="border px-4 py-2">{order.status}</td>
                                <td className="border px-4 py-2">
                                    {index === 0 ? (
                                        <span className="text-gray-500">Tracking Latest</span>
                                    ) : (
                                        <Link to={`/track-order/${order._id}`} className="text-blue-500">
                                            Track Order
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderHistoryAndTracking;
