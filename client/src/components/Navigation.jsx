import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TranslatedText from './TranslatedText';
import "../i18n";
import Logo from "../assets/tr/BetarBazarlogo.png";
import { FiSearch, FiUser, FiX, FiShoppingCart } from 'react-icons/fi';
import { RiMenu3Fill } from "react-icons/ri";
import { useCart } from "../context/CartContext"; // Import Cart Context
import { FaPlus, FaMinus } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navigation = () => {
    const { t, i18n } = useTranslation();
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart(); // Using cart context

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const isLoggedIn = !!localStorage.getItem("token");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const menuRef = useRef(null);
    const cartRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setIsCartOpen(false);
            }
            if (isSearchOpen && !event.target.closest('.search-popup')) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSearchOpen]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        // Simulate search results, replace this with actual search logic
        setSearchResults(
            query ? ['Result 1', 'Result 2', 'Result 3'].filter(item => item.toLowerCase().includes(query.toLowerCase())) : []
        );
    };

    return (
        <>
            <ToastContainer />
            <nav className='bg-white py-1 w-full mx-auto top-0 left-0 z-50 shadow-[0_4px_12px_rgba(255,165,0,0.1)] relative'>
                <div className='container mx-auto'>
                    <div className='flex justify-between items-center py-2'>
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-xl font-bold">
                                <img className="w-10 h-6 xl:w-14 xl:h-10 sm:w-7 sm:h-5 cursor-pointer" src={Logo} alt="Logo" />
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className='hidden lg:flex font-medium text-lg flex-row space-x-6 items-center justify-center'>
                            <Link to="/"><TranslatedText className="hover:text-custom-orange transition-colors">{t("home")}</TranslatedText></Link>
                            <Link to="/about"><TranslatedText className="hover:text-custom-orange transition-colors">{t("About")}</TranslatedText></Link>
                            <Link to="/allproducts"><TranslatedText className="hover:text-custom-orange transition-colors">{t("Products")}</TranslatedText></Link>
                            <Link to="/allMarketPrice"><TranslatedText className="hover:text-custom-orange transition-colors">{t("Market Price")}</TranslatedText></Link>
                            <Link to="/category"><TranslatedText className="hover:text-custom-orange transition-colors">{t("Categories")}</TranslatedText></Link>
                        </div>

                        {/* Icons */}
                        <div className="flex items-center space-x-4">
                            {/* Search Button */}
                            <button
                                className="p-2 hover:bg-green-50 hover:text-custom-orange rounded-full transition-colors"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                            >
                                <FiSearch className="w-5 h-5" />
                            </button>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => changeLanguage(i18n.language === 'en' ? 'bn' : 'en')}
                                    className="relative inline-flex items-center cursor-pointer p-1 bg-custom-orange rounded-full w-16 h-8 transition-all duration-300 ease-in-out"
                                >
                                    <span className="sr-only">Toggle language</span>
                                    <span
                                        className={`inline-block w-7 h-7 bg-white rounded-full transform transition-transform duration-300 ease-in-out 
      ${i18n.language === 'en' ? 'translate-x-0' : 'translate-x-8'}`}
                                    />
                                    {/* En appears on the right when in English mode */}
                                    <span className={`absolute text-white font-medium text-sm right-2.5 transition-opacity duration-300 ${i18n.language === 'en' ? 'opacity-100' : 'opacity-0'}`}>
                                        En
                                    </span>
                                    {/* বাং appears on the left when in বাংলা mode */}
                                    <span className={`absolute text-white font-medium text-sm left-2.5 transition-opacity duration-300 ${i18n.language === 'bn' ? 'opacity-100' : 'opacity-0'}`}>
                                        বাং
                                    </span>
                                </button>
                            </div>
                            {/* Login / Dashboard + Logout Button */}
                            {!isLoggedIn ? (
                                <Link to="/login">
                                    <button className="p-2 hover:bg-green-50 hover:text-custom-orange rounded-full transition-colors flex items-center">
                                        <FiUser className="w-5 h-5" />
                                        <TranslatedText className="hidden lg:block ml-1 font-medium text-lg">{t("Login")}</TranslatedText>
                                    </button>
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    {/* Dashboard Button */}
                                    <Link to="/dashboard">
                                        <button className="p-4 font-medium text-lg bg-green-50 text-green-600 hover:bg-green-100 hover:text-custom-orange rounded-full transition-colors flex items-center">
                                            <FiUser className="w-5 h-5" />
                                            <TranslatedText className="hidden lg:block ml-1">{t("Dashboard")}</TranslatedText>
                                        </button>
                                    </Link>
                                </div>
                            )}

                            {/* Cart Button */}
                            <Link to="/CartPage">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="p-2 hover:bg-green-50 font-medium text-lg hover:text-green-600 rounded-full transition-colors relative flex items-center"
                            >
                                <FiShoppingCart className="w-5 h-5" />
                                <TranslatedText className="hidden lg:block ml-1">{t("Cart")}</TranslatedText>
                                <div className="absolute top-[-3px] right-[-13px] bg-green-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                    {cart.length}
                                </div>
                            </button>
                                    </Link>
                            

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 hover:bg-green-50 hover:text-custom-orange rounded-full transition-colors"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <FiX className="w-6 h-6" /> : <RiMenu3Fill className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Popup */}
                {isSearchOpen && (
                    <div className="search-popup absolute w-[500px] max-w-full left-0 right-0 mx-auto shadow-lg rounded-full bg-white/40 z-50">
                        <div className="relative p-1 w-full">
                            <input
                                type="text"
                                className="w-full p-2 px-4 border border-gray-300 rounded-full focus:outline-custom-orange"
                                placeholder="Search youe Product"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            {searchResults.length > 0 && (
                                <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-2">
                                    <ul>
                                        {searchResults.map((result, index) => (
                                            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                                                {result}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                <div
                    ref={menuRef}
                    className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                >
                    <div className="container mx-auto">
                        <div className="flex flex-col p-4 space-y-3">
                            <Link to="/" className="hover:text-custom-orange font-medium text-lg transition-colors" onClick={() => setIsMenuOpen(false)}><TranslatedText>{t("home")}</TranslatedText></Link>
                            <Link to="/about" className="hover:text-custom-orange font-medium text-lg transition-colors" onClick={() => setIsMenuOpen(false)}><TranslatedText>{t("About")}</TranslatedText></Link>
                            <Link to="/allproducts" className="hover:text-custom-orange font-medium text-lg transition-colors" onClick={() => setIsMenuOpen(false)}><TranslatedText>{t("Products")}</TranslatedText></Link>
                            <Link to="/allMarketPrice" className="hover:text-custom-orange font-medium text-lg transition-colors" onClick={() => setIsMenuOpen(false)}><TranslatedText>{t("Market Price")}</TranslatedText></Link>
                            <Link to="/category" className="hover:text-custom-orange font-medium text-lg transition-colors" onClick={() => setIsMenuOpen(false)}><TranslatedText>{t("Categories")}</TranslatedText></Link>
                        </div>
                    </div>
                </div>

                {/* Cart Sidebar */}
                {/* <div
                    ref={cartRef}
                    className={`fixed top-20 right-0 w-96 rounded-xl border-custom-orange border-b-4 border-l-4 border-t-4 bg-white shadow-md shadow-green-200 transform transition-transform duration-300 ease-in-out 
                    ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-10">
                        <h2 className="text-xl text-center mb-5 font-bold"><TranslatedText>{t("YourCart")}</TranslatedText></h2>
                        {cart.length > 0 ? (
                            <div>
                                {cart.map((item, index) => {
                                    console.log("Cart Item:", item); // Debugging log
                                    return (
                                        <div key={index} className="flex justify-between items-center my-2">
                                            <div>{item.name}</div>
                                            <div className="flex items-center">
                                                <button onClick={() => decreaseQuantity(item.id)} className="p-1"><FaMinus /></button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button onClick={() => increaseQuantity(item.id)} className="p-1"><FaPlus /></button>
                                            </div>
                                            <div>৳ {item?.price ? (item.price * item.quantity).toFixed(2) : "Price Missing"}</div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-500"><FiX /></button>
                                        </div>
                                    );
                                })}


                                <div className="mt-4">
                                    <div className="flex justify-between font-bold">
                                        <span><TranslatedText>{t("Total")}</TranslatedText></span>
                                        <span>৳ {calculateTotal()}</span>
                                    </div>
                                    <div className="mt-2 mb-2">
                                        <p className="text-md p-2 text-justify border-2 rounded-xl border-green-500 text-green-500 font-thin">
                                            অর্ডার নিশ্চিত করতে অগ্রীম <span className="text-red-500 font-semibold">১০০ টাকা</span> প্রদান করুন।
                                            পেমেন্ট করার সময়, মোট দাম থেকে <span className="text-red-500 font-semibold">১০০ টাকা</span> কেটে রাখা হবে,
                                            ইংশা-আল্লাহ।
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full mt-4 bg-custom-orange text-white py-2 rounded-full"
                                    >
                                        <TranslatedText>{t("Proceed to Checkout")}</TranslatedText>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className='text-sm sm:text-base'><TranslatedText>{t("Yourcartisempty")}</TranslatedText></p>
                        )}
                        <button onClick={() => setIsCartOpen(false)} className="absolute top-2 right-2">
                            <FiX className="w-6 h-6" />
                        </button>
                    </div>
                </div> */}
            </nav>
        </>

    );
};

export default Navigation;