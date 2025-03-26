import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { BsBagFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { TbTrashXFilled } from "react-icons/tb";
import { useBag } from "../../context/BagContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ShoppingBag = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const { setIsExistingUser } = useState(false);

  const { bag, increaseQuantity, decreaseQuantity, removeFromBag, clearBag, getBagTotalPrice } = useBag();
  const { user } = useAuth();

  const deliveryCharge = 30;
  const subtotal = getBagTotalPrice();
  const totalPrice = subtotal + (bag.length ? deliveryCharge : 0);

  const checkUserExists = async (phoneNumber) => {
    try {
      if (!phoneNumber) {
        return;
      }
      const response = await axios.get(
        `http://localhost:5000/api/check-user?phone=${phoneNumber}`
      );
      setIsExistingUser(response.data.exists);
    } catch (error) {
      console.error("Error checking user:", error);
      toast.error("Error checking user. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        if (userId) {
          const response = await fetch(`http://localhost:5000/api/users/${userId}`);
          if (!response.ok) throw new Error("Failed to fetch user data");

          const userData = await response.json();
          setName(userData.name || "");
          setPhoneNumber(userData.phone || "");
          setPaymentNumber(userData.phone || "");
          setDeliveryLocation(userData.deliveryLocation || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Could not load user data.");
      }
    };

    if (user?.id) {
      fetchUserData(user.id);
    }
  }, [user]);

  const isValidPhone = (phone) => /^\d{11}$/.test(phone);
  const isFormValid = () => name && isValidPhone(phoneNumber) && isValidPhone(paymentNumber) && deliveryLocation;

  const updateInvoiceUrl = async (userId, invoiceUrl) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}/invoice`,
        { invoiceUrl }
      );
      console.log("Invoice URL updated:", response.data);
    } catch (error) {
      console.error("Failed to update invoice URL:", error);
      toast.error("Failed to update invoice URL.");
    }
  };

  const submitOrder = async () => {
    if (!isFormValid()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    if (bag.length === 0) {
      toast.error("Your bag is empty.");
      return;
    }

    if (!deliveryLocation) {
      toast.error("Please provide your delivery location.");
      return;
    }

    if (!paymentNumber) {
      toast.error("Please provide a payment number.");
      return;
    }

    setIsSubmitting(true);

    try {
      let userId = user?.id;

      if (!userId) {
        const userCheckResponse = await fetch(`http://localhost:5000/api/users?phone=${phoneNumber}`);
        const existingUser = await userCheckResponse.json();

        if (userCheckResponse.ok && existingUser?._id) {
          userId = existingUser._id;
        } else {
          const registerResponse = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              phone: phoneNumber,
              password: "defaultPassword123!",
              confirmPassword: "defaultPassword123!",
              role: "customer",
            }),
          });

          if (!registerResponse.ok) {
            throw new Error("Failed to register user");
          }

          const registeredUser = await registerResponse.json();
          userId = registeredUser._id;
        }
      }

      const orderData = {
        userId,
        items: bag.map((item) => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal,
        deliveryCharge,
        total: totalPrice,
        deliveryLocation,
        paymentNumber,
      };

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to submit order");
      }

      const result = await response.json();
      console.log("Invoice URL:", result.invoiceUrl);
      toast.success("Order submitted successfully! Check your invoice.", { autoClose: 5000 });
      clearBag();
      setIsOpen(false);

      if (result.invoiceUrl) {
        await updateInvoiceUrl(userId, result.invoiceUrl);
        window.open(result.invoiceUrl, "_blank");
      } else {
        toast.info("Invoice URL is missing, check your orders manually.");
      }
    } catch (error) {
      console.error("Error during order submission:", error);
      toast.error("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="z-50">
      <div className="fixed bottom-40 sm:bottom-48 right-4 flex items-center justify-center z-[9999]">
        <div className="relative rounded-full p-[.5px] before:absolute overflow- before:rounded-full before:top-[-2%] before:right-[-2%] before:bottom-[-2%] before:left-[-2%] before:bg-gradient-to-l from-orange-400 from-0% via-slate-100 via-10% to-slate-100 before:blur-[2px] before:animate-spin-slow">
          <button
            className="relative bg-white/90 text-xl sm:text-3xl text-orange-500 p-3 rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            <BsBagFill />
            <div className="absolute top-[-20px] right-[17px] bg-green-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {bag.length}
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed right-14 sm:right-20 bottom-36 max-h-[450px] overflow-y-auto bg-white shadow-lg rounded-md w-80 p-3 border border-gray-300 z-[9999]">
          <div className="flex justify-between border-b pb-2">
            <h3 className="text-lg text-center text-green-600 font-semibold">Bag Items</h3>
            <button className="text-red-500" onClick={() => setIsOpen(false)}>
              <IoClose />
            </button>
          </div>

          {bag.length > 0 ? (
            bag.map((item) => (
              <div key={item.id} className="grid grid-cols-[2fr_1fr_auto] gap-4 items-center py-2 border-b">
                <div className="truncate">
                  <span>{item.name}</span>
                  <span className="block text-sm text-gray-500">
                    ৳ {(item.price || 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <button className="px-2 bg-gray-200 rounded-md" onClick={() => decreaseQuantity(item.id)}>
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button className="px-2 bg-gray-200 rounded-md" onClick={() => increaseQuantity(item.id)}>
                    +
                  </button>
                </div>
                <div className="flex justify-end pr-2">
                  <button className="text-red-500 hover:text-red-700" onClick={() => removeFromBag(item.id)}>
                    <TbTrashXFilled />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-3">No items in Bag</p>
          )}

          {bag.length > 0 && (
            <>
              <div className="mt-3 border-t pt-3">
                <div className="flex justify-between text-md font-thin">
                  <span>Subtotal:</span>
                  <span>৳ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-md pb-2 text-red-500 font-thin">
                  <span>Delivery Charge:</span>
                  <span>৳ {deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-md border-t pt-2 pb-2 font-thin">
                  <span>Total:</span>
                  <span>৳ {totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-2 mb-2">
                <p className="text-md p-2 text-justify border-2 rounded-xl border-green-500 text-green-500 font-thin">
                  অর্ডার নিশ্চিত করতে অগ্রীম <span className="text-red-500 font-semibold">১০০ টাকা</span> প্রদান করুন।
                  পেমেন্ট করার সময়, মোট দাম থেকে <span className="text-red-500 font-semibold">১০০ টাকা</span> কেটে রাখা হবে,
                  ইংশা-আল্লাহ।
                </p>
              </div>
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Enter Your Phone"
                  className="w-full p-2 border border-gray-300 rounded-md mt-2"
                  value={phoneNumber}
                  onBlur={() => checkUserExists(phoneNumber)}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                {phoneNumber.length !== 11 && phoneNumber.length > 0 && (
                  <p className="text-red-500 text-sm">Phone number must be exactly 11 digits.</p>
                )}
                <input
                  type="tel"
                  placeholder="Provide Payment Number"
                  value={paymentNumber}
                  onChange={(e) => setPaymentNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
                {paymentNumber.length !== 11 && paymentNumber.length > 0 && (
                  <p className="text-red-500 text-sm mt-1">Phone number must be exactly 11 digits.</p>
                )}
                <input
                  type="text"
                  placeholder="Enter Your Delivery Location"
                  className="w-full p-2 border border-gray-300 rounded-md mt-2"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <button
                  className="w-full py-2 bg-green-600 text-white font-semibold rounded-md"
                  onClick={submitOrder}
                  disabled={isSubmitting || !isFormValid()}
                >
                  {isSubmitting ? "Submitting..." : "Submit Order"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingBag;
