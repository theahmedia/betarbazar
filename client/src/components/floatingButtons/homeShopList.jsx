import React, { useCallback, useState, useEffect } from "react";
import { BsShop } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useBag } from "../../context/BagContext";
import { useAuth } from "../../context/AuthContext";

const FloatingShoppingList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [bag, setBag] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const { setOrderSubmitted } = useState(false); // Track order submission status


  const { setIsExistingUser } = useState(false);

  const { clearBag } = useBag();
  const { user } = useAuth();

  const deliveryCharge = 30;
  const advancePayment = 100;

  const calculateTotal = useCallback(() => {
    // Calculate subtotal
    const newSubtotal = bag.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);

    setSubtotal(newSubtotal); // Store subtotal in state

    // Calculate total after delivery and advance payment
    const totalAfterDelivery = newSubtotal + deliveryCharge;
    const finalTotal = totalAfterDelivery - advancePayment;

    setTotalPrice(finalTotal);
  }, [bag, deliveryCharge, advancePayment]);


  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        console.log("Fetched Products:", response.data); // ✅ Debugging
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.response || error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get("/api/products/new-arrival");
        setNewArrivalProducts(response.data.slice(0, 5)); // Display 5 new arrivals
      } catch (error) {
        console.error("Error fetching new arrivals:", error.response || error);
      }
    };
    fetchNewArrivals();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((p) =>
        (p.productName || "").toLowerCase().includes(search.toLowerCase()) &&
        !bag.some((item) => item.id === p._id) // Prevent adding the same product again
      )
    );
  }, [search, products, bag]);

  console.log("Filtered Products:", filteredProducts); // ✅ Debugging

  const addToBag = (product) => {
    console.log("Adding to bag:", product); // Debugging
    if (product && product.productName && product.sellAmount && product._id) {
      setBag([...bag, {
        id: product._id,
        name: product.productName,
        price: product.sellAmount,
        quantity: 1,
        size: product.product_size || "N/A",
      }]);

      setSearch("");
      setSelectedIndex(-1);

      setFilteredProducts(filteredProducts.filter((p) => p._id !== product._id));
      setNewArrivalProducts(newArrivalProducts.filter((p) => p._id !== product._id));
    } else {
      console.error("Invalid product data:", product); // Debugging invalid data
    }
  };


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

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, filteredProducts.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      addToBag(filteredProducts[selectedIndex]);
    }
  };

  const increaseQuantity = (id) => {
    setBag(
      bag.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setBag(
      bag.map((item) =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeItem = (id) => {
    setBag(bag.filter((item) => item.id !== id)); // Removes the item from the bag
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
    if (!name) {
      toast.error("Please enter your name.");
      return;
    }
    if (!phoneNumber) {
      toast.error("Please enter your phone number.");
      return;
    }
    if (!isValidPhone(phoneNumber)) {
      toast.error("Phone number must be exactly 11 digits.");
      return;
    }
    if (!paymentNumber) {
      toast.error("Please provide a payment number.");
      return;
    }
    if (!isValidPhone(paymentNumber)) {
      toast.error("Payment number must be exactly 11 digits.");
      return;
    }
    if (!deliveryLocation) {
      toast.error("Please provide your delivery location.");
      return;
    }
    if (bag.length === 0) {
      toast.error("Your bag is empty.");
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
  
      setOrderSubmitted(true); // Set the confirmation state
    } catch (error) {
      console.error("Error during order submission:", error);
      toast.error("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  


  return (
    <div className="z-50">
      <div className="fixed bottom-28 right-0 w-20 max-h-[550px] flex overflow-y-auto items-center justify-center z-[9999]">
        <div className="">
          <button className="bg-white text-xl text-orange-500 p-3 rounded-full" onClick={() => setIsOpen(!isOpen)}>
            <BsShop />
          </button>
        </div>

      </div>
      <div className={`fixed right-20 bottom-20 bg-slate-100 p-4 rounded-lg shadow-2xl w-96 max-h-[500px] overflow-y-auto transition-transform duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
        <div className="relative flex bg-orange-500 rounded-lg py-2 px-4 items-center justify-center">
          <h2 className="text-white">Shopping List</h2>
          <button className="absolute right-2 text-white" onClick={() => setIsOpen(false)}><IoClose /></button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full mt-5 p-2 border rounded-md"
          />
          {search && filteredProducts.length > 0 && (
            <ul className="absolute w-full bg-white border mt-1 rounded-md shadow-md z-[9999]">
              {filteredProducts?.length > 0 && filteredProducts.map((product, index) => (
                <li
                  key={product.id}
                  className={`p-2 cursor-pointer ${selectedIndex === index ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
                  onClick={() => {
                    addToBag(product); // Adds product to the bag
                    setSelectedIndex(-1); // Resets the selected index after adding
                  }}
                  onMouseEnter={() => setSelectedIndex(index)} // Updates selected index on hover
                >
                  {product.productName} - ৳{product.sellAmount} - {product.product_size}
                </li>
              ))}
            </ul>
          )}
        </div>

        {!search && newArrivalProducts.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">New Arrivals</h3>
            <ul className="border rounded-md p-2 bg-white shadow-md">
              {newArrivalProducts.map((product) => (
                <li
                  key={product._id}
                  className="p-2 cursor-pointer hover:bg-gray-100 flex justify-between"
                  onClick={() => addToBag(product)}
                >
                  <span>{product.productName} - ৳{product.sellAmount}</span>
                  <button className="text-green-600">+ Add</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Scrollable bag container */}
        <div className="mt-4 overflow-y-auto max-h-[450px]"> {/* Added max-h-[450px] and overflow-y-auto */}
          {bag.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-2 border-b">
              <span>{item.name} ({item.size})</span>
              <span>৳{item.price}</span>
              <div className="flex items-center space-x-2">
                <button className="bg-gray-300 px-2 rounded" onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button className="bg-gray-300 px-2 rounded" onClick={() => increaseQuantity(item.id)}>+</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => removeItem(item.id)}><IoMdCloseCircle /></button>
              </div>
            </div>
          ))}
        </div>

        {bag.length > 0 && (
          <div className="mt-4 text-center">
            <div>
              <div className="flex justify-between pb-2">
                <p className="font-semibold">Subtotal:</p>
                <p className="text-right">৳{bag.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
              </div>
              <div className="flex justify-between border-t pt-2">
                <p className="pb-2">Delivery Charge:</p>
                <p className="text-right">৳{deliveryCharge}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">Advance Payment: (-)</p>
                <p className="text-right text-red-500">৳{advancePayment}</p>
              </div>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <p className="font-semibold">Total:</p>
              <p className="text-right">৳{totalPrice}</p>
            </div>
            <div className="mt-2 mb-2">
              <p className="text-md p-2 text-justify border-2 rounded-xl border-green-500 text-green-500 font-thin">
                অর্ডার নিশ্চিত করতে অগ্রীম <span className="text-red-500 font-semibold">১০০ টাকা</span> প্রদান করুন।
              </p>
            </div>
            <div className="mt-3 space-y-2">
              {/* Form Inputs for Name, Phone, etc. */}
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
          </div>
        )}
      </div>
    </div>

  );
};

export default FloatingShoppingList;



