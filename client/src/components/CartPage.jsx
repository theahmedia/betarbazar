import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa"; // For the increase/decrease buttons
import { BsArrowRight } from "react-icons/bs";
import { FiX } from "react-icons/fi"; // For the close button
import { useCart } from "../context/CartContext"; // Import Cart Context
import { useBag } from "../context/BagContext"; // Import Cart Context
import { useTranslation } from "react-i18next"; // Import translation hook

const CartPage = () => {
    const { t } = useTranslation(); // Initialize translation
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart(); // Using cart context
    const { addToBag } = useBag(); // Using cart context

    // Function to handle adding a product to the cart
    const handleAddToBag = (item) => {
        try {
            // Add the item to the bag
            addToBag(item, 1);
    
            // Remove the item from the cart after adding it to the bag
            removeFromCart(item.id);
        } catch (error) {
            console.error('Error adding to bag:', error);
            alert(t('error.addToBag'));
        }
    };

    return (
        <div className="flex flex-col items-center p-4 mt-40">
            <h1 className="text-2xl font-semibold mb-4">{t("ShoppingCart")}</h1>

            {/* Cart Table */}
            <div className="w-full max-w-4xl overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border border-gray-300 text-left">{t("Product")}</th>
                            <th className="px-4 py-2 border border-gray-300 text-left">{t("ProductSize")}</th>
                            <th className="px-4 py-2 border border-gray-300 text-left">{t("Quantity")}</th>
                            <th className="px-4 py-2 border border-gray-300 text-left">{t("Price")}</th>
                            <th className="px-4 py-2 border border-gray-300 text-left">{t("Actions")}</th>
                            <th className="px-4 py-2 border border-gray-300 text-left">{t("addToBag")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2 border border-gray-300">{item.productName}</td>
                                    <td className="px-4 py-2 border border-gray-300">{item.product_size}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <div className="flex items-center justify-center">
                                            <button onClick={() => decreaseQuantity(item.id)} className="p-1">
                                                <FaMinus />
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button onClick={() => increaseQuantity(item.id)} className="p-1">
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">৳ {item?.price ? (item.price * item.quantity).toFixed(2) : "Price Missing"}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                                            <FiX />
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button
                                            onClick={() => handleAddToBag(item)} // Corrected the use of the item variable
                                            className="w-full border-2 border-custom-orange bg-custom-orange text-white py-2 rounded-lg hover:bg-orange-50 hover:text-custom-orange transition-colors duration-100 ease-in flex items-center justify-center gap-1 text-sm"
                                        >
                                            {t('addToBag')}
                                            <BsArrowRight className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 border text-center text-sm sm:text-base">
                                    {t("Yourcartisempty")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {cart.length > 0 && (
                <div className="mt-4 w-full max-w-4xl">
                    <div className="mt-2 mb-2">
                        <p className="text-md p-2 text-justify border-2 rounded-xl border-green-500 text-green-500 font-thin">
                            অর্ডার নিশ্চিত করতে অগ্রীম <span className="text-red-500 font-semibold">১০০ টাকা</span> প্রদান করুন।
                            পেমেন্ট করার সময়, মোট দাম থেকে <span className="text-red-500 font-semibold">১০০ টাকা</span> কেটে রাখা হবে,
                            ইংশা-আল্লাহ।
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
