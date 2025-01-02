// import React, { useState } from 'react'
// import Logo from "../assets/tr/BetarBazarlogo.png";
// import { FiUser, FiShoppingCart } from "react-icons/fi";


// const Nav2 = () => {
//   // State to simulate user login status (you'll replace this with actual authentication logic)
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <>
//       <div className="navbar bg-base-100">
//         <div className="navbar-start">
//           {/* <div className="dropdown">
//             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16" />
//               </svg>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//               <li><a>Item 1</a></li>
//               <li>
//                 <a>Parent</a>
//                 <ul className="p-2">
//                   <li><a>Submenu 1</a></li>
//                   <li><a>Submenu 2</a></li>
//                 </ul>
//               </li>
//               <li><a>Item 3</a></li>
//             </ul>
//           </div> */}
//           <div className="flex-shrink-0">
//               <img className="w-10 h-6 xl:w-14 xl:h-10 sm:w-7 sm:h-5 cursor-pointer" src={Logo} alt="Logo" />
//           </div>
//         </div>
//         <div className="navbar-center lg:flex">
//           <ul className="menu menu-horizontal px-1">
//             <li><div><FiUser />Login</div></li>
//             <li><div><FiUser /> Registration</div></li>
//             <li><div><FiUser />Market Price</div></li>
//           </ul>
//         </div>
//         <div className="navbar-end">
//           <button className="flex items-center space-x-1 px-2 py-2 rounded-lg md:px-4 md:py-2 hover:bg-gray-100">
//               <FiShoppingCart className="w-5 h-5" />
//               <span className="bg-custom-orange text-white rounded-full px-2 py-0.5 text-xs">
//                   0
//               </span>
//           </button>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Nav2


// // import React, { useState, useEffect, useRef } from 'react';
// // import { Link } from 'react-router-dom';
// // import Logo from "../assets/tr/BetarBazarlogo.png";
// // import { FiUser, FiShoppingCart} from 'react-icons/fi';
// // import Login from "./LoginPage.jsx";


// // const Navigation = () => {
// //     const [isMenuOpen, setIsMenuOpen] = useState(false);
// //     const [isServicesOpen, setIsServicesOpen] = useState(false);
// //     const menuRef = useRef(null);

// //     // Handle click outside
// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (menuRef.current && !menuRef.current.contains(event.target)) {
// //                 setIsMenuOpen(false);
// //                 setIsServicesOpen(false);
// //             }
// //         };

// //         document.addEventListener('mousedown', handleClickOutside);
// //         return () => document.removeEventListener('mousedown', handleClickOutside);
// //     }, []);

// //     // Handle menu item click
// //     const handleMenuClick = () => {
// //         setIsMenuOpen(false);
// //         setIsServicesOpen(false);
// //     };

// //     return (
// //         <nav className="bg-white op-0 left-0 z-50 shadow-[0_4px_12px_rgba(0,255,0,0.1)]">
// //             <div className="max-w-screen-2xl mx-auto px-4">
// //                 <div className="flex items-center justify-between h-16">
// //                        {/* Logo */}
// //                     <Link to="/">
// //                         <div className="flex-shrink-0">
// //                             <img className="w-10 h-6 xl:w-14 xl:h-10 sm:w-7 sm:h-5 cursor-pointer" src={Logo} alt="Logo" />
// //                         </div>
// //                     </Link>   
// //                     <div className='flex font-normal flex-row space-x-4 items-center justify-center text-base sm:text-sm md:text-xs lg:text-lg'>
// //                         <Link to={Login} className="hover:text-green-600 transition-colors">Login</Link>
// //                         <Link to="/contact" className="hover:text-green-600 transition-colors">Register</Link>
// //                         <Link to="/contact" className="hover:text-green-600 transition-colors">Market Price</Link>
// //                     </div>

// //                     <div className="flex items-center space-x-4">
// //                         <button className="flex items-center space-x-1 px-2 py-2 rounded-lg md:px-4 md:py-2 hover:bg-gray-100">
// //                             <FiShoppingCart className="w-5 h-5" />
// //                             <span className="bg-custom-orange text-white rounded-full px-2 py-0.5 text-xs">
// //                                 0
// //                             </span>
// //                         </button>
// //                     </div>
// //                 </div>
// //             </div>

            
// //         </nav>
// //     )
// // }

// // export default Navigation



// import React from "react";
// import { Badge, IconButton } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import HomeIcon from "@mui/icons-material/Home";
// import InfoIcon from "@mui/icons-material/Info";
// import ContactMailIcon from "@mui/icons-material/ContactMail";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-md w-full">
//       <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <Link to="/">
//               <h1 className="text-2xl font-bold text-blue-600">MyLogo</h1>
//             </Link>
//           </div>

//           {/* Nav Menu */}
//           <div className="flex-1 flex justify-center items-center space-x-6">
//             <Link to="/" className="flex items-center text-gray-700 hover:text-blue-600">
//               <HomeIcon className="mr-1" /> Home
//             </Link>
//             <Link to="/about" className="flex items-center text-gray-700 hover:text-blue-600">
//               <InfoIcon className="mr-1" /> About
//             </Link>
//             <Link to="/contact" className="flex items-center text-gray-700 hover:text-blue-600">
//               <ContactMailIcon className="mr-1" /> Contact
//             </Link>
//           </div>

//           {/* Cart Icon */}
//           <div className="flex items-center space-x-4">
//             <IconButton color="primary" aria-label="cart">
//               <Badge badgeContent={4} color="secondary">
//                 <ShoppingCartIcon />
//               </Badge>
//             </IconButton>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { ShoppingCart, AccountCircle, PriceCheck } from "@mui/icons-material";
import { Badge } from "@mui/material";
import Logo from "../assets/tr/BetarBazarlogo.png";
import Login from './LoginPage';
import Register from './Registration';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <nav className="bg-slate-100 p-4 flex justify-between items-center text-black">
      {/* Logo */}
      <Link to="/">
          <div className="flex-shrink-0">
              <img className="w-10 h-6 xl:w-14 xl:h-10 sm:w-7 sm:h-5 cursor-pointer" src={Logo} alt="Logo" />
          </div>
      </Link>   

      {/* Center Navigation */}
      <div className="flex gap-4">
        <Link to={Login} className="flex items-center gap-2 cursor-pointer">
          <AccountCircle /> Login
        </Link>
        <Link to="/Register" className="flex items-center gap-2 cursor-pointer">
          <AccountCircle /> Register
        </Link>
        <Link to="/market-price" className="flex items-center gap-2 cursor-pointer">
          <PriceCheck /> Market Price
        </Link>
      </div>

      {/* Cart */}
      <div className="relative">
        <Badge badgeContent={cartCount} color="error">
          <ShoppingCart className="cursor-pointer" />
        </Badge>
      </div>
    </nav>
  );
};

export default Navbar;
