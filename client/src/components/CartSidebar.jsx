import React from 'react';
import { IoMdClose } from "react-icons/io";

const CartSidebar = ({ isOpen, toggleCart, cartItems }) => {
  return (
    <div className={`fixed right-0 top-0 h-1/2 w-64 bg-white shadow-lg z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-bold">Cart</h2>
          <button onClick={toggleCart} className="p-2 bg-custom-orange text-white rounded">
              <IoMdClose />
          </button>
      </div>
      <div className="p-4">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center">
        <button type="submit" className="px-4 py-2 bg-custom-orange text-white rounded">
            Proceed
        </button>
      </div>
    </div>
  );
};

export default CartSidebar; 