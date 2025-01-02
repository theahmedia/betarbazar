import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope  } from "react-icons/fa";
import Logo from "../assets/tr/BetarBazarlogo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-custom-black py-6">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Logo, Contact, Social Media */}
          <div className="w-full lg:w-1/4">
            <div>
              <img src={Logo} alt="logo/" className="w-16 h-12 mb-2" />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-md font-normal">Got Question? Call us 9 AM - 10 PM</p>
              <p onClick={() => window.location.href = 'tel:+8801758111870'} className="cursor-pointer text-lg font-bold hover:text-blue-600">01758 111 870</p>
              <p className="text-md font-semibold mb-1">Follow Us</p>
            </div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/betarbazar" target="_blank" title="Facebook" className="hover:text-blue-600">
                <FaFacebook className="w-6 h-6 cursor-pointer" />
              </a>
              <a href="https://www.instagram.com/betarbazar" target="_blank" title="Instagram" className="hover:text-pink-600">
                <FaInstagram className="w-6 h-6 cursor-pointer" />
              </a>
              <a href="https://www.youtube.com/@betarbazar" target="_blank" title="Youtube" className="hover:text-red-600">
                <FaYoutube className="w-6 h-6 cursor-pointer" />
              </a>
              <a 
              href="mailto:info@betarbazar.com" 
              title="Email us"
              className="hover:text-blue-600"
              >
                <FaEnvelope className="w-6 h-6 cursor-pointer hover:text-blue-600" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row gap-8 lg:w-3/4">
            <div className="flex-1">
              <h3 className="font-bold text-md py-4">Company</h3>
              <ul>
                <li className="mb-2 text-sm hover:text-custom-black">About Us</li>
                <li className="mb-2 text-sm hover:text-custom-black">Contact Us</li>
                <li className="mb-2 text-sm hover:text-custom-black">Privacy Policy</li>
                <li className="mb-2 text-sm hover:text-custom-black">Terms & Condition</li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-md py-4">My Account</h3>
              <ul>
                <li className="mb-2 text-sm hover:text-custom-black">Orders</li>
                <li className="mb-2 text-sm hover:text-custom-black">My Profile</li>
                <li className="mb-2 text-sm hover:text-custom-black">Order History</li>
                <li className="mb-2 text-sm hover:text-custom-black">Track My Order</li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-md py-4">Customer Service</h3>
              <ul>
                <li className="mb-2 text-sm hover:text-custom-black">Payment Methods</li>
                <li className="mb-2 text-sm hover:text-custom-black">Help & Support</li>
                <li className="mb-2 text-sm hover:text-custom-black">Exclusive Offers</li>
                <li className="mb-2 text-sm hover:text-custom-black">Cancellation, Return & Refund</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
