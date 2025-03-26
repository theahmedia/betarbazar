import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



// toast.configure();

// Helper function to format date as DD-MM-YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export default function AdminPurchase() {
  const [formData, setFormData] = useState({
    purchaseDate: new Date().toLocaleDateString("en-CA"), // Updated date format
    supplier: "",
    productName: "",
    purchasePrice: "",
    quantity: "",
    stockStatus: "In Stock",
    // productImage: null,
  });

  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);  // Track the selected index in suggestions
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track whether we are editing

  const fetchPurchases = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/purchases", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch purchases");
      }

      const data = await response.json();

      // Check if the response is null or not an array
      if (data === null || !Array.isArray(data)) {
        console.error("Invalid data format:", data);
        setPurchases([]); // Reset to empty array if data is invalid
      } else {
        setPurchases(data); // Set valid data
      }
    } catch (error) {
      console.error("Frontend Error Fetching Purchases:", error);
      setPurchases([]); // Reset to empty array on error
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/suppliers", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch suppliers: ${response.status}`);
      }

      const responseData = await response.json();

      // Extract suppliers array
      if (responseData.success && Array.isArray(responseData.data)) {
        setSuppliers(responseData.data);
      } else {
        console.error("Invalid suppliers data format:", responseData);
        setSuppliers([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Frontend Error Fetching Suppliers:", error);
      setSuppliers([]); // Ensure it remains an array
    }
  };


  useEffect(() => {
    fetchPurchases();
    fetchSuppliers();
  }, []);

  const processPurchases = () => {
    const productStock = {}; // Object to track stock for each product

    const processedPurchases = purchases.map((purchase, index) => {
      const key = purchase.productName;
      const currentStock = purchase.quantity;

      if (productStock[key]) {
        productStock[key] += currentStock; // Add to existing stock if the product is repeated
      } else {
        productStock[key] = currentStock; // Set initial stock if new product
      }

      return {
        ...purchase,
        currentStock: productStock[key], // Add calculated stock to purchase
        serialNumber: index + 1, // Add serial number (1-based index)
        formattedPurchaseDate: formatDate(purchase.purchaseDate), // Format the date
      };
    });

    return processedPurchases;
  };

  const processedPurchases = processPurchases();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "supplier") {
      if (value.trim() === "") {
        setFilteredSuppliers([]);
        setShowSuggestions(false);
      } else {
        // Ensure suppliers is an array before using filter
        if (!Array.isArray(suppliers)) {
          console.error("suppliers is not an array:", suppliers);
          return;
        }

        const filtered = suppliers.filter((supplier) =>
          supplier.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuppliers(filtered);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      }
    }
  };


  const handleSelectSupplier = (supplierName) => {
    setFormData({ ...formData, supplier: supplierName });
    setFilteredSuppliers([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for duplicate entry on the same date
    const isDuplicate = purchases.some(
      (purchase) =>
        purchase.productName.toLowerCase() === formData.productName.toLowerCase() &&
        formatDate(purchase.purchaseDate) === formData.purchaseDate
    );

    if (isDuplicate) {
      toast.error("This product has already been purchased on this date!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/purchases", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Purchase added successfully!");
        fetchPurchases();
        setFormData({
          purchaseDate: new Date().toLocaleDateString("en-CA"),
          supplier: "",
          productName: "",
          purchasePrice: "",
          quantity: "",
          stockStatus: "In Stock",
        });
      } else {
        toast.error("Failed to add purchase!");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again!");
      console.error("Error adding purchase:", error);
    }
  };

  const handleEdit = (purchase) => {
    setFormData({
      _id: purchase._id,  // Store the ID for updating
      purchaseDate: purchase.purchaseDate,  // Keep the original purchase date
      supplier: purchase.supplier,
      productName: purchase.productName,
      purchasePrice: purchase.purchasePrice,
      quantity: purchase.quantity,
      stockStatus: purchase.stockStatus,
      // productImage: purchase.productImage,
    });
    setIsEditing(true);
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    // Check for duplicate entry on the same date for the same product
    const isDuplicate = purchases.some(
      (purchase) =>
        purchase.productName.toLowerCase() === formData.productName.toLowerCase() &&
        formatDate(purchase.purchaseDate) === formData.purchaseDate &&
        purchase._id !== formData._id // Ensure we don't check the current item being updated
    );

    if (isDuplicate) {
      toast.error("This product has already been purchased on this date!");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "purchaseDate") {
        formDataToSend.append(key, formData[key]);
      }
    });

    formDataToSend.append("updatedDate", new Date().toISOString());

    try {
      const response = await fetch(`http://localhost:5000/api/purchases/${formData._id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Purchase updated successfully!", { position: "top-right" });
        fetchPurchases();
        setFormData({
          purchaseDate: new Date().toLocaleDateString("en-CA"),
          supplier: "",
          productName: "",
          purchasePrice: "",
          quantity: "",
          stockStatus: "In Stock",
        });
        setIsEditing(false);
      } else {
        toast.error(data.message || "Failed to update purchase", { position: "top-right" });
      }
    } catch (error) {
      console.error("Error updating purchase:", error);
      toast.error("An error occurred while updating!", { position: "top-right" });
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredSuppliers.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectSupplier(filteredSuppliers[selectedIndex].name);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this purchase?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/purchases/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Purchase deleted successfully!");
        fetchPurchases();
      } else {
        toast.error("Failed to delete purchase!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting!");
      console.error("Error fetching data:", error);
    }
  };


  return (
    <div className="max-w-7xl mx-auto mt-10">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl text-center mb-5 font-semibold">Admin Purchase System</h2>
          <form onSubmit={isEditing ? handleUpdate : handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Purchase Date</Label>
              <Input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Product Name</Label>
              <Input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative">
              <Label>Supplier Name</Label>
              <Input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
              />
              {showSuggestions && filteredSuppliers.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 shadow-md mt-1 rounded-md">
                  {filteredSuppliers.map((supplier, index) => (
                    <li
                      key={supplier._id}
                      className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedIndex === index ? "bg-orange-100" : ""}`}
                      onClick={() => handleSelectSupplier(supplier.name)}
                      tabIndex={0}
                    >
                      {supplier.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <Label>Purchase Price (৳)</Label>
              <Input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Stock Status</Label>
              <select
                name="stockStatus"
                value={formData.stockStatus}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            {/* Full width submit button */}
            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                {isEditing ? "Update Purchase" : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Purchase List */}
      <div className="mt-10 mb-10 border border-gray-300 rounded-lg p-4">
        <h3 className="text-lg text-center font-semibold mb-4">Purchased Products</h3>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse border border-gray-200 min-w-max">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-6 p-2">#</th>
                <th className="border px-6 p-2">Date</th>
                <th className="border px-6 p-2">Product</th>
                <th className="border px-6 p-2">Supplier</th>
                <th className="border px-6 p-2">Price</th>
                <th className="border px-6 p-2">Quantity</th>
                <th className="border px-6 p-2">Status</th>
                <th className="border px-6 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {processedPurchases.length > 0 ? (
                processedPurchases.map((purchase, index) => (
                  <tr key={purchase._id} className="border-b">
                    <td className="border px-6 p-2">{index + 1}</td>
                    <td className="border px-6 p-2">{purchase.formattedPurchaseDate}</td>
                    <td className="border px-6 p-2">{purchase.productName}</td>
                    <td className="border px-6 p-2">{purchase.supplier}</td>
                    <td className="border px-6 p-2">{purchase.purchasePrice}</td>
                    <td className="border px-6 p-2">{purchase.quantity}</td>
                    <td className="border px-6 p-2">{purchase.currentStock}</td>
                    <td className="border px-6 py-3 space-x-2">
                      <button onClick={() => handleEdit(purchase)} size="sm">
                        <FaEdit className="text-blue-500 hover:text-blue-700" />
                      </button>
                      <button onClick={() => handleDelete(purchase._id)}>
                        <FaTrashAlt className="text-red-500 hover:text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-2 text-center">No purchases found.</td>
                </tr>
              )}
            </tbody>
          </table>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-bold mb-4 text-center">Confirm Deletion</h3>
                <p className="text-center text-gray-700 mb-4">Are you sure you want to delete this category?</p>
                <div className="flex justify-center space-x-4">
                  <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Delete
                  </button>
                  <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>.
    </div>

  );
}
