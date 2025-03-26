import React, { useState } from 'react';
import { IoCloseCircleOutline, IoDownloadOutline } from 'react-icons/io5';
import { TbEdit } from "react-icons/tb";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Logo from "../../assets/tr/BetarBazarlogo.png";
import DefultImg from "../../assets/profileimg/errorProfile.webp"

const UserProfileDash = ({ userId }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState(new Date());
  const [selectedToDate, setSelectedToDate] = useState(new Date());

  
  const currentDate = new Date().toLocaleDateString();

  const orders = [
    { id: 'ORD-001', date: '05 Jan 2025', items: [{ name: 'Product A', amount: 2, price: 50, discount: 5 }, { name: 'Product B', amount: 1, price: 30, discount: 3 }], total: 125 },
    { id: 'ORD-002', date: '12 Jan 2025', items: [{ name: 'Product C', amount: 3, price: 90, discount: 0 }], total: 270 },
    { id: 'ORD-003', date: '18 Jan 2025', items: [{ name: 'Product D', amount: '5 Kg', price: 150 }], total: 150 },
    { id: 'ORD-004', date: '02 Feb 2025', items: [{ name: 'Product E', amount: '2 Kg', price: 60 }], total: 60 },
    { id: 'ORD-005', date: '15 Feb 2025', items: [{ name: 'Product F', amount: '1 Kg', price: 40 }], total: 40 },
    { id: 'ORD-006', date: '20 Feb 2025', items: [{ name: 'Product G', amount: '3 Kg', price: 120 }], total: 120 },
    { id: 'ORD-007', date: '25 Feb 2025', items: [{ name: 'Product H', amount: '4 Kg', price: 200 }], total: 200 },
    { id: 'ORD-008', date: '01 Mar 2025', items: [{ name: 'Product I', amount: '2 Kg', price: 70 }], total: 70 },
    { id: 'ORD-009', date: '10 Mar 2025', items: [{ name: 'Product J', amount: '1 Kg', price: 35 }], total: 35 },
    { id: 'ORD-010', date: '15 Mar 2025', items: [{ name: 'Product K', amount: '5 Kg', price: 175 }], total: 175 },
    // Add more orders as needed
  ];

  const handleViewInvoice = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-lg flex flex-col items-center relative mt-20 mx-auto border-red-400 py-6 bg-white shadow-md rounded-lg">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 p-2 mb-6">
          <img
            className="w-24 h-24 rounded-full border-2 border-gray-300"
            src= { DefultImg } // Replace with user's profile picture
            alt="Profile"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
            <p className="text-gray-600 text-sm">Software Engineer</p>
            <p className="text-gray-600 text-sm">Account Level: <span className='text-custom-orange'>Premium</span></p>
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-4 px-10">
          <div className="flex text-gray-700">
            <span className="font-semibold">Email:</span>
            <span>johndoe@example.com</span>
          </div>
          <div className="flex text-gray-700">
            <span className="font-semibold">Phone:</span>
            <span>+1 234 567 890</span>
          </div>
          <div className="flex text-gray-700">
            <span className="font-semibold">Location:</span>
            <span>New York, USA</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 absolute right-0 top-0 flex justify-between px-2">
          <button className="px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <TbEdit className='text-base' />
          </button>
        </div>
      </div>

      {/* Purchase History */}
      <div className="mt-10">
        <h4 className="text-xl font-bold mb-4">Purchase History</h4>
        <div className="sm:flex justify-center items-center w-full p-2 bg-gray-100 rounded-lg mb-4">
          <div className="inline-block p-2">
            <label className="mr-2">From Date: </label>
            <DatePicker
              className="p-2 text-custom-black font-semibold w-28 h-10 rounded-lg"
              selected={selectedFromDate}
              onChange={date => setSelectedFromDate(date)}
              dateFormat="dd-MM-yyyy" // Format the date as day-month-year
            />
          </div>
          <div className="inline-block p-2">
            <label className="mr-2">To Date: </label>
            <DatePicker
              className="p-2 text-custom-black font-semibold w-28 h-10 rounded-lg"
              selected={selectedToDate}
              onChange={date => setSelectedToDate(date)}
              dateFormat="dd-MM-yyyy" // Format the date as day-month-year
            />
          </div>
          <button className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-gray-600">{order.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleViewInvoice(order)}
                >
                  View Invoice
                </button>
                <button>
                  <IoDownloadOutline className="text-green-500 hover:text-green-600 text-2xl" />
                </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 p-2 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
          <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full h-auto max-h-screen overflow-y-scroll no-scrollbar" onClick={(e) => e.stopPropagation()}>
            <img src={ Logo } className='w-40 h-auto absolute right-0 left-0 top-0 bottom-0 m-auto z-10 opacity-5' alt="" />
            <button className="absolute top-2 right-2 text-gray-600" onClick={closeModal}>
              <IoCloseCircleOutline className="text-2xl" />
            </button>
            <div className="relative z-20">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Invoice</h3>
                  <p className="text-gray-700">BILL TO:</p>
                  <p className="text-gray-700">John Doe</p>
                  <p className="text-gray-700">New York, USA</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-700">INVOICE NO #{selectedOrder.id}</p>
                  <p className="text-gray-700">DATE: {selectedOrder.date}</p>
                </div>
              </div>
              <table className="w-full mt-4 border border-gray-300">
                <thead>
                  <tr>
                    <th className="text-left border border-gray-300 text-custom-orange p-2">#</th>
                    <th className="text-left border border-gray-300 text-custom-orange p-2">Product Name</th>
                    <th className="text-left border border-gray-300 text-custom-orange p-2">Quantity</th>
                    <th className="text-left border border-gray-300 text-custom-orange p-2">Price</th>
                    <th className="text-left border border-gray-300 text-custom-orange p-2">Discount</th>
                    <th className="text-left border border-gray-300 text-custom-orange p-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{index + 1}</td>
                      <td className="border border-gray-300 p-2">{item.name}</td>
                      <td className="border border-gray-300 p-2">{item.amount}</td>
                      <td className="border border-gray-300 p-2">{item.price}</td>
                      <td className="border border-gray-300 p-2">{item.discount || 0}</td>
                      <td className="border border-gray-300 p-2">{(item.price - (item.discount || 0)) * item.amount}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="border-none p-2"></td>
                    <td className="border-none p-2"></td>
                    <td className="border-none p-2"></td>
                    <td className="border-none p-2"></td>
                    <td className="border border-gray-300 text-custom-orange p-2">Total:</td>
                    <td className="border border-gray-300 text-custom-orange p-2">{selectedOrder.total} ৳</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-right font-bold mt-4"> </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDash;
