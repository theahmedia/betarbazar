import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Assume JWT token is stored here
                const response = await axios.get('/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data.user);
                setOrders(response.data.orders);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load profile');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>

            {/* Profile Section */}
            {user && (
                <div className="mb-8 p-4 border border-gray-300 rounded shadow">
                    <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
                </div>
            )}

            {/* Orders Section */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Order History</h2>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
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
        </div>
    );
};

export default UserProfile;
