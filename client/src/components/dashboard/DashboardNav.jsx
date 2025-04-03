import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GrUserAdmin } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { ImBlog  } from "react-icons/im";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlineAdminPanelSettings, MdOutlineManageHistory } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import {
  FiGrid,
  FiToggleRight,
  FiLayers,
  FiChevronDown,
  FiShoppingCart,
  FiTrash2,
  FiLogOut,
} from 'react-icons/fi';
// import { GoProjectSymlink } from 'react-icons/go';
import { IoAnalyticsOutline } from 'react-icons/io5';
import PropTypes from 'prop-types';

const DashboardNav = ({ onNavClick }) => {
  const [openDropdown, setOpenDropdown] = useState(null); // Store the currently open dropdown
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [
    { icon: FiGrid, text: 'Dashboard', path: '/dashboard' },
    {
      icon: GrUserAdmin,
      text: 'Admin Panel',
      subItems: [
        { icon: MdOutlineAdminPanelSettings, text: 'Admin Authority', path: '/dashboard/Admin' },
        { icon: HiOutlineDocumentReport, text: 'Product Management', path: '/dashboard/createProducts' },
        { icon: HiOutlineDocumentReport, text: 'Supplier Management', path: '/dashboard/supplierCreate' },
        { icon: HiOutlineDocumentReport, text: 'Category Management', path: '/dashboard/CategoryCreate' },
        { icon: HiOutlineDocumentReport, text: 'Brand Management', path: '/dashboard/brandCreate' },
        { icon: HiOutlineDocumentReport, text: 'Report', path: '/dashboard/Reports' },
        { icon: MdOutlineManageHistory, text: 'CMS CRUD', path: '/dashboard/cms' },
        { icon: BiPurchaseTag, text: 'Purchase', path: '/dashboard/PurchaseManagement' },
        { icon: FaRegUser, text: 'Contact Us', path: '/dashboard/aboutUsos' },
        { icon: FaRegUser, text: 'Privacy Policy', path: '/dashboard/aboutUsuee' },
        { icon: FaRegUser, text: 'Terms & Conditions', path: '/dashboard/aboutUsew' },
        { icon: FaRegUser, text: 'Orders', path: '/dashboard/AdminOrder' },
        { icon: FaRegUser, text: 'Affiliation', path: '/dashboard/affiliate' },
        { icon: FaRegUser, text: 'Help & Support', path: '/dashboard/aboutUsew' },
        { icon: FaRegUser, text: 'Offers', path: '/dashboard/pages/aboutUsew' },
        { icon: FaRegUser, text: 'Refund, Return & Cancellation', path: '/dashboard/aboutUsew' },
      ],
    },
    { icon: FaRegUser, text: 'User Profile', path: '/dashboard/userProfileDash' },
    // { icon: FiToggleRight, text: 'Section Activation', path: '/dashboard/section-activation' },
    // {
    //   icon: FiLayers,
    //   text: 'Sections',
    //   subItems: [
    //     { text: 'Top Nav', path: '/dashboard/sections/hero' },
    //     { text: 'Nav Bar', path: '/dashboard/sections/videos' },
    //     { text: 'Who We Are', path: '/dashboard/sections/marquee' },
    //     { text: 'Product Category Slider', path: '/dashboard/sections/review' },
    //     { text: 'Hot Deals', path: '/dashboard/sections/faq' },
    //     { text: 'Review', path: '/dashboard/sections/jobs' },
    //     { text: 'Footer Main', path: '/dashboard/sections/blogs' },
    //   ],
    // },
    // {
    //   icon: FiLayers,
    //   text: 'Pages',
    //   subItems: [
    //     { text: 'About Us', path: '/dashboard/about-us' },
    //     { text: 'Products', path: '/dashboard/createProducts' },
    //     { text: 'Category', path: '/dashboard/PurchaseManagement' },
    //     { text: 'Market Prices', path: '/dashboard/aboutUs' },
    //     { text: 'Categories', path: '/dashboard/aboutUs' },
    //     { text: 'Contact Us', path: '/dashboard/aboutUsos' },
    //     { text: 'Privacy Policy', path: '/dashboard/aboutUsuee' },
    //     { text: 'Terms & Conditions', path: '/dashboard/aboutUsew' },
    //     { text: 'Orders', path: '/dashboard/pages/aboutUsew' },
    //     { text: 'Affiliation', path: '/dashboard/affiliate' },
    //     { text: 'Help & Support', path: '/dashboard/aboutUsew' },
    //     { text: 'Offers', path: '/dashboard/pages/aboutUsew' },
    //     { text: 'Refund, Return & Cancellation', path: '/dashboard/aboutUsew' },
    //   ],
    // },
    // { icon: FiShoppingCart, text: 'Cart', path: '/dashboard/clients' },
    { icon: ImBlog , text: 'Blog', path: '/dashboard/blog' },
    { icon: IoAnalyticsOutline, text: 'Analytics', path: '/dashboard/analytics' },
    { icon: FiTrash2, text: "Trash", path: "/dashboard/trash", className: "text-red-600 font-semibold" },
    { icon: FiLogOut, text: 'Logout', onClick: handleLogout, className: "text-orange-600 font-semibold" },
  ];

  const toggleDropdown = (index) => {
    // Toggle dropdown: if it's open, close it; if it's closed, open it and close the others
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  const handleLinkClick = () => {
    if (onNavClick) onNavClick(); // Notify parent to close sidebar
  };

  return (
    <nav className="mt-4 text-custom-black h-full flex flex-col justify-between">
      <div
        className="overflow-y-auto scrollbar-hidden scroll-smooth"
        style={{
          WebkitOverflowScrolling: 'touch', // Smooth scrolling for mobile devices
        }}
      >
        {navItems.map((item, index) => (
          <div key={index}>
            {item.subItems ? (
              <div className="dropdown">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="flex items-center justify-between w-full p-4 rounded-e-lg hover:bg-orange-200"
                  aria-expanded={openDropdown === index}
                >
                  <div className="flex items-center">
                    <item.icon size={20} />
                    <span className="ml-6">{item.text}</span>
                  </div>
                  <FiChevronDown
                    className={`transform transition-transform ${
                      openDropdown === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openDropdown === index && (
                <div className="transition-all duration-300 ease-in-out">
                  {item.subItems.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.path}
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `block py-2 px-4 rounded-s-lg pl-16 ${
                          isActive ? 'text-[#F97316] font-medium' : ''
                        } hover:bg-orange-200`
                      }
                    >
                      <div className="flex items-center">
                        {subItem.icon && <subItem.icon size={18} className="mr-2" />}
                        <span>{subItem.text}</span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
              </div>
            ) : (
              <div>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className={`flex items-center w-full p-4 rounded-e-lg hover:bg-orange-200 ${item.className || ''}`}
                  >
                    <item.icon size={20} />
                    <span className="ml-6">{item.text}</span>
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center p-4 rounded-e-lg hover:bg-orange-200 ${
                        isActive ? 'text-[#F97316] font-medium' : ''
                      } ${item.className || ''}`
                    }
                  >
                    <item.icon size={20} />
                    <span className="ml-6">{item.text}</span>
                  </NavLink>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
  
};

DashboardNav.propTypes = {
  onNavClick: PropTypes.func.isRequired, // Parent callback for closing sidebar
};

export default DashboardNav;
