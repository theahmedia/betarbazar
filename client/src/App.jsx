import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from './components/Navigation';
import TopNav from './components/topnav';
import Footermain from './components/footermain';
import FooterPay from './components/footerpayment';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blogs.jsx';
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from './i18n'; // Adjust the path based on your project structure
/* Dashboard */
import Dash from './components/dashboard/dashboardHome';
import DashboardLayout from "./components/dashboard/DashboardLayout";
import SectionActivation from "./components/dashboard/SactionActivation";
import Admin from "./components/dashboard/Admin";
import UserProfileOnDash from "./components/dashboard/userProfileDash.jsx";
import Profile from "./components/dashboard/Profile";
import Settings from "./components/dashboard/Settings";
import Reports from "./components/dashboard/Reports";
import Cms from "./components/dashboard/cmsCRUD.jsx";
import AboutOnDash from "./components/dashboard/aboutUs.jsx";
import ProductOnDash from "./components/dashboard/products.jsx";
import AffiliateOnDash from "./components/dashboard/affiliation.jsx";
import CreateProducts from './components/dashboard/createProducts.jsx';
import ManageCategory from './components/dashboard/PurchaseManagement.jsx';
import EditUser from './components/dashboard/editUser.jsx';
import SupplierManage from './components/dashboard/supplierCreate.jsx';
import CategoryManage from './components/dashboard/categoryCreate.jsx';
import BrandManage from './components/dashboard/brandCreate.jsx';
import AdminOrder from './components/dashboard/AdminOrderPage.jsx';
/* Dashboard */
import Products from './components/allproducts';
import Category from './components/category';
import CategoryProducts  from './components/CategoryProductPage';
import Market2 from './components/allMarketPrice';
import MainHotDeal from './components/allHotDeals.jsx';
{/* CategoryMain Folders Pages */}
import DailyNeeds from './components/CategoryMain/dailyNeeds.jsx';
import Fruities from './components/CategoryMain/fruits.jsx';
import Vegies from './components/CategoryMain/vegetables.jsx';
import Fishes from './components/CategoryMain/fish.jsx';
import Eggs from './components/CategoryMain/egg.jsx';
import Meat from './components/CategoryMain/meat.jsx';
import SeaFood from './components/CategoryMain/seafood.jsx';
import Bakery from './components/CategoryMain/bakery.jsx';
import HealthNWellness from './components/CategoryMain/healthyness.jsx';
import BabyCare from './components/CategoryMain/babycare.jsx';
import Medicine from './components/CategoryMain/medicine.jsx';
import FeminineCare from './components/CategoryMain/feminine.jsx';
import FrozenFoods from './components/CategoryMain/frozenFoods.jsx';
import Beverages from './components/CategoryMain/beverages.jsx';
import Snacks from './components/CategoryMain/snacks.jsx';
import PastaNoodles from './components/CategoryMain/noodles.jsx';
import PetFood from './components/CategoryMain/petfood.jsx';
import DryFruiteNuts from './components/CategoryMain/nutsndryfruits.jsx';
import TeaCoffee from './components/CategoryMain/teaNcoffee.jsx';
import Spicess from './components/CategoryMain/spices.jsx';
import OilsVin from './components/CategoryMain/oils.jsx';
import HomeAppliance from './components/CategoryMain/homeApp.jsx';
import CartPage from './components/CartPage.jsx';
{/* CategoryMain Folders Pages */}
import WebDevelopment from './components/webDevelopment';
import AppDevelopment from './components/appDevelopment';
import LoadFromTop from './components/loadFromTop';
{/* Footer Pages */}
import Affiliate from './components/support/affiliationSales.jsx';
import Cancellation from './components/support/cancelReturnRefund.jsx';
import ContactUs from './components/support/contactUs.jsx';
import ExclusiveOffers from './components/support/exclusiveOffers.jsx';
import HelpSupport from './components/support/helpNsupport.jsx';
import MyOrders from './components/support/ordersRecord.jsx';
import Privacy from './components/support/privacy.jsx';
import Terms from './components/support/termsNcondition.jsx';
import MyProfile from './components/support/userProfile.jsx';
import OrderTrack from './components/support/orderTrackingNhistory.jsx';
/* Floating Buttons */
import HomeFloatShoppingList from './components/floatingButtons/homeShopList';
import ShoppingBag from './components/floatingButtons/shoppingBag';
import TawkToChat from './pages/TawkToChat.jsx';
/* Floating Buttons */
import Login from './auth/Login.jsx';
import SignUp from './auth/Register.jsx';
import ResetPass from "./auth/ResetPassword.jsx";
import ForgotPass from "./auth/ForgotPassword.jsx";
import HotDealsPage from './pages/hotdeals.jsx';
import TopSelling from './pages/topselling.jsx';
import BestSellerPage from './pages/recommend.jsx';
import FeaturedProductsPage from './pages/recommend.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { BagProvider } from './context/BagContext.jsx';
import Checkout from './components/checkout.jsx'; // Import the new Checkout component


const App = () => {
  const location = useLocation();
  useTranslation();

  // Check if the route is part of the dashboard
  const isDashboard = location.pathname.startsWith('/dashboard');
  // Check if the current path is for login, register, or reset
  const isAuthPage = ['/login', '/register', '/reset', '/forgot'].includes(location.pathname);

  return (
    <>
      <LoadFromTop />
      <ToastContainer position="top-right" autoClose={2000} />
      {!isDashboard && !isAuthPage && (
        <>
          {/* Navbar and Top Navigation */}
          <div className="fixed top-0 left-0 w-full z-50">
            <TopNav />
            <Navigation />
          </div>
        </>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/allproducts" element={<Products />} />
        <Route path="/category" element={<Category />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/reset" element={<ResetPass />} />
        <Route path="/forgot/:token" element={<ForgotPass />} />
        <Route path="/hot-deals" element={<HotDealsPage />} />
        <Route path="/todays-market-price" element={<TopSelling />} />
        <Route path="/best-seller" element={<BestSellerPage />} />
        <Route path="/featured-products" element={<FeaturedProductsPage />} />
        <Route path="/checkout" element={<Checkout />} /> {/* Add the checkout route */}
        <Route path="/CartPage" element={<CartPage />} /> {/* Add the checkout route */}

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dash />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<Reports />} />
          <Route path="cms" element={<Cms />} />
          <Route path="about-us" element={<AboutOnDash />} />
          <Route path="affiliate" element={<AffiliateOnDash />} />
          <Route path="products" element={<ProductOnDash />} />
          <Route path="section-activation" element={<SectionActivation />} />
          <Route path="Admin" element={<Admin />} />
          <Route path="userProfileDash" element={<UserProfileOnDash />} />
          <Route path="createProducts" element={<CreateProducts />} />
          <Route path="PurchaseManagement" element={<ManageCategory />} />
          <Route path="supplierCreate" element={<SupplierManage />} />
          <Route path="categoryCreate" element={<CategoryManage />} />
          <Route path="brandCreate" element={<BrandManage />} />
          <Route path="AdminOrder" element={<AdminOrder />} />
        </Route>
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/allproducts" element={<Products />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        {/* CategoryMain Folders Pages Path */}
        <Route path="/CategoryMain/dailyNeeds" element={<DailyNeeds />} />
        <Route path="/CategoryMain/fruits" element={<Fruities />} />
        <Route path="/CategoryMain/vegetables" element={<Vegies />} />
        <Route path="/CategoryMain/fish" element={<Fishes />} />
        <Route path="/CategoryMain/egg" element={<Eggs />} />
        <Route path="/CategoryMain/meat" element={<Meat />} />
        <Route path="/CategoryMain/seafood" element={<SeaFood />} />
        <Route path="/CategoryMain/bakery" element={<Bakery />} />
        <Route path="/CategoryMain/healthyness" element={<HealthNWellness />} />
        <Route path="/CategoryMain/babycare" element={<BabyCare />} />
        <Route path="/CategoryMain/medicine" element={<Medicine />} />
        <Route path="/CategoryMain/feminine" element={<FeminineCare />} />
        <Route path="/CategoryMain/frozenFoods" element={<FrozenFoods />} />
        <Route path="/CategoryMain/beverages" element={<Beverages />} />
        <Route path="/CategoryMain/snacks" element={<Snacks />} />
        <Route path="/CategoryMain/noodles" element={<PastaNoodles />} />
        <Route path="/CategoryMain/petfood" element={<PetFood />} />
        <Route path="/CategoryMain/nutsndryfruits" element={<DryFruiteNuts />} />
        <Route path="/CategoryMain/teaNcoffee" element={<TeaCoffee />} />
        <Route path="/CategoryMain/spices" element={<Spicess />} />
        <Route path="/CategoryMain/oils" element={<OilsVin />} />
        <Route path="/CategoryMain/homeApp" element={<HomeAppliance />} />
        {/* CategoryMain Folders Pages Path */}
        <Route path="/allMarketPrice" element={<Market2 />} />
        <Route path="/allHotDeals" element={<MainHotDeal />} />
        <Route path="/services/webDevelopment" element={<WebDevelopment />} />
        <Route path="/services/appDevelopment" element={<AppDevelopment />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/termsNcondition" element={<Terms />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/userProfile" element={<MyProfile />} />
        <Route path="/affiliationSales" element={<Affiliate />} />
        <Route path="/orderTrackingNhistory" element={<OrderTrack />} />
        <Route path="/helpNsupport" element={<HelpSupport />} />
        <Route path="/exclusiveOffers" element={<ExclusiveOffers />} />
        <Route path="/cancelReturnRefund" element={<Cancellation />} />
      </Routes>

      {/* Footer and Additional Components */}
      {!isDashboard && !isAuthPage && (
        <>
          <Footermain />
          <FooterPay />
          <HomeFloatShoppingList />
          <ShoppingBag />
          <TawkToChat />
        </>
      )}
    </>
  );
};

const AppWrapper = () => (
  <I18nextProvider i18n={i18n}>
    <Router>
      <CartProvider> {/* Wrap with CartProvider */}
        <BagProvider> {/* Wrap with BagProvider */}
          <App /> {/* Your main App component */}
        </BagProvider>
      </CartProvider>
    </Router>
  </I18nextProvider>
);

export default AppWrapper;