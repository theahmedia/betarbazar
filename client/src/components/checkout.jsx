import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({ address: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from local storage or API
    const fetchCart = async () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);
    };
    fetchCart();
  }, []);

  const handleOrderSubmit = async () => {
    try {
      const orderData = {
        userId: "USER_ID_HERE", // Replace with the logged-in user's ID
        cartItems,
        shippingInfo,
        paymentMethod,
        totalAmount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, orderData);
      if (response.status === 201) {
        toast.success('Order placed successfully!', { autoClose: 2000 });
        localStorage.removeItem("cart"); // Clear Cart
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Order Failed", error);
    }
  };

  return (
    <div className="container mt-40 mx-auto p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Cart Items */}
      <div className="border p-4 mb-4">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="flex justify-between p-2 border-b">
              <p>{item.name} (x{item.quantity})</p>
              <p>${item.price * item.quantity}</p>
            </div>
          ))
        )}
      </div>

      {/* Shipping Info */}
      <div className="border p-4 mb-4">
        <h3 className="text-lg font-bold mb-2">Shipping Details</h3>
        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full mb-2"
          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="border p-2 w-full"
          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
        />
      </div>

      {/* Payment Method */}
      <div className="border p-4 mb-4">
        <h3 className="text-lg font-bold mb-2">Payment Method</h3>
        <select className="border p-2 w-full" onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="cod">Cash on Delivery</option>
          <option value="card">Credit/Debit Card</option>
        </select>
      </div>

      {/* Order Summary */}
      <div className="border p-4">
        <h3 className="text-lg font-bold mb-2">Order Summary</h3>
        <p>Subtotal: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
        <p>Shipping: $5</p>
        <p className="font-bold">Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 5}</p>
      </div>

      <button className="bg-blue-500 text-white p-2 w-full mt-4" onClick={handleOrderSubmit}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
