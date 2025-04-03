import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };  
  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`${API_URL}/orders/${id}/status`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${API_URL}/api/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-center font-bold mb-4">Order Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
  <tr className="bg-gray-100">
    <th className="border p-2">Order ID</th>
    <th className="border p-2">User</th>
    <th className="border p-2">Total</th>
    <th className="border p-2">Status</th>
    <th className="border p-2">Actions</th>
    <th className="border p-2">Invoice</th> {/* New Column for Invoice */}
  </tr>
</thead>
<tbody>
  {orders.map((order) => (
    <tr key={order._id} className="text-center border">
      <td className="border p-2">{order._id}</td>
      <td className="border p-2">{order.userId?.name || "Guest"}</td>
      <td className="border p-2">${order.totalAmount}</td>
      <td className="border p-2">
        <select
          className="p-1 border"
          value={order.status}
          onChange={(e) => handleStatusChange(order._id, e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </td>
      <td className="border p-2">
        <button
          className="bg-red-500 text-white px-3 py-1"
          onClick={() => handleDeleteOrder(order._id)}
        >
          Delete
        </button>
      </td>
      <td className="border p-2">
        <a
          href={`${API_URL}/orders/invoice/${order._id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-3 py-1"
        >
          Download Invoice
        </a>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
};

export default AdminOrders;
