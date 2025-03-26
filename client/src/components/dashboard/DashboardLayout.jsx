import { useState } from 'react';
// import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { Outlet, useLocation, Link } from 'react-router-dom';
import {
  FiSearch,
  FiBell,
  // FiLogOut,
  FiUser,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import logo from '../../assets/tr/BetarBazarlogo.png';
import victor from '../../assets/tr/BetarBazarlogo.png';
import admin from "../../assets/team/team1.jpg";
import DashboardNav from './DashboardNav';

function DashboardLayout() {
  // const navigate = useNavigate();
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);
  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);

  // const handleLogout = () => {
  //   localStorage.removeItem('isAuthenticated');
  //   navigate('/');
  // };

  // Map of routes to page names
  const pageNames = {
    '/dashboard': 'Dashboard',
    '/dashboard/section-activation': 'Section Activation',
    '/dashboard/sections/hero': 'Hero',
    '/dashboard/sections/videos': 'Videos',
    '/dashboard/sections/marquee': 'Marquee',
    '/dashboard/sections/review': 'Review',
    '/dashboard/sections/faq': 'FAQ',
    '/dashboard/sections/jobs': 'Jobs',
    '/dashboard/sections/blogs': 'Blogs',
    '/dashboard/clients': 'Clients',
    '/dashboard/team': 'Team',
    '/dashboard/projects': 'Projects',
    '/dashboard/analytics': 'Analytics',
    '/dashboard/profile': 'Admin Profile',
    '/dashboard/settings': 'Profile Settings'
  };

  // Get the current page name from the URL path
  const currentPage = pageNames[location.pathname] || 'Dashboard';

return (
  <div className="h-screen flex overflow-hidden">
    {/* Sidebar */}
    <aside
      className={`fixed overflow-y-scroll no-scrollbar w-[240px] z-30 h-full bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 lg:translate-x-0 lg:relative lg:block`}
    >
      <div className="flex items-center justify-center px-2 py-4">
      <Link to="/" className="text-xl font-bold">
             <img
               className={`w-14 h-12 xl:w-20 xl:h-16 sm:w-12 sm:h-12 ${sidebarOpen ? 'm-0' : 'mx-auto'} block`}
               src={sidebarOpen ? logo : victor}
               alt="Logo"
             />
           </Link>
      </div>
      <DashboardNav onNavClick={() => setSidebarOpen(false)} />
    </aside>

    {/* Main Content */}
    <div className="flex-1 overflow-auto transition-all duration-300">
      {/* Top Navigation */}
      <header className="bg-white shadow-lg">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-4">
            {/* Dynamic Page Title */}
            <h1 className="text-lg sm:text-2xl font-semibold text-custom-black">
              {currentPage}
            </h1>
          </div>
          <div className="flex items-center space-x-4 sm:mt-0">
            {/* Search */}
            <div className="relative ml-5 flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search..."
                className="w-full sm:w-auto pl-12 pr-4 py-2 text-sm sm:text-base rounded-full border border-custom-orange focus:outline-none focus:ring-2 focus:ring-custom-orange bg-slate-200 text-slate-700"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Notifications */}
            <div className="relative z-30">
              <button
                onClick={toggleNotifications}
                className="p-2 sm:p-3 rounded-full bg-custom-orange hover:bg-orange-600 text-white"
              >
                <FiBell size={20} />
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-200 rounded-lg shadow-lg p-4 z-40">
                  <h3 className="text-sm font-semibold text-custom-black mb-2">
                    Notifications
                  </h3>
                  <div className="space-y-2">
                    <p className="text-xs text-custom-black">No new notifications</p>
                  </div>
                  <Link
                    to="/dashboard/notifications"
                    className="block mt-4 text-center text-sm font-medium text-orange-400 hover:text-custom-orange"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    View All Notifications
                  </Link>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <img
                src={admin}
                alt="Admin"
                className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-custom-orange rounded-full cursor-pointer"
                   onClick={toggleProfileMenu}
                 />
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-200 rounded-lg shadow-lg p-4 z-40">
                  <nav className="space-y-2">
                    <Link to="/dashboard/profile" className="flex items-center space-x-2 cursor-pointer hover:bg-gray-300 p-2 rounded">
                      <FiUser size={16} />
                      <span className="text-custom-black">Profile</span>
                    </Link>
                    <Link to="/dashboard/settings" className="flex items-center space-x-2 cursor-pointer hover:bg-gray-300 p-2 rounded">
                      <FiSettings size={16} />
                      <span className="text-custom-black">Settings</span>
                    </Link>
                    {/* <li
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-300 p-2 rounded"
                      onClick={handleLogout}
                    >
                      <FiLogOut size={16} />
                      <span className="text-custom-black">Logout</span>
                    </li> */}
                  </nav>
                </div>
              )}
            </div>

            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="p-3 ml-4 rounded-full bg-custom-orange hover:bg-orange-600 text-white lg:hidden"
             >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  </div>
);
}

export default DashboardLayout;

