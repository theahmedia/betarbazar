import React, { useState } from "react";
import { BsBagFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const FloatingCartList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: "Apple/kg", price: 50 },
    { id: 2, name: "Banana/4pcs", price: 20 },
    { id: 3, name: "Mango/kg", price: 100 },
    { id: 4, name: "Orange/kg", price: 60 },
    { id: 5, name: "Grapes/kg", price: 80 },
    { id: 6, name: "Watermelon/Pcs", price: 150 },
  ]);

  const deliveryCharge = 30;

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const increaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + (cart.length ? deliveryCharge : 0);

  return (
    <div className="shadow-lg">
      {/* Floating Cart Button */}
      <button
        className="fixed top-[220px] right-0 bg-custom-orange bg-opacity-50 hover:bg-opacity-100 transition duration-300 text-white p-2 rounded-md shadow-lg flex flex-col items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <BsBagFill className="text-2xl text-opacity-5 hover:text-opacity-100 transition duration-300" />
          <h4 className="text-lg font-semibold text-opacity-50 hover:text-opacity-100 transition duration-300">Bag</h4>
        </div>
        <p className="bg-black text-white px-2 py-1 rounded-md mt-2">{cart.length} Items</p>
        <p className="bg-white text-black px-2 py-1 mt-1 rounded-md w-full text-center"> 
          ৳ {totalPrice.toFixed(2)}
        </p>

      </button>

      {/* Cart List */}
      {isOpen && (
        <div className="fixed top-[220px] right-[95px] bg-white shadow-lg rounded-ful w-64 p-3 border border-gray-300">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg text-center font-semibold">Cart Items</h3>
            <button className="text-red-500" onClick={() => setIsOpen(false)}>
              <IoClose />
            </button>
          </div>
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b">
                <span>{item.name}</span>
                <div className="flex items-center">
                  <button className="px-2 bg-gray-200 rounded-md" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span className="px-3">{item.quantity}</span>
                  <button className="px-2 bg-gray-200 rounded-md" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-3">No items in cart</p>
          )}
          {cart.length > 0 && (
            <button
              className="mt-3 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
              onClick={() => alert("Proceeding to checkout...")}
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingCartList;
