import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { socket } from "../../utils/socket";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS


const CreateProducts = () => {
  const [formData, setFormData] = useState({
    productName: "",
    purchaseDate: "",
    purchasePrice: "",
    sellPrice: "",
    sellQuantity: "",
    sellAmount: "",
    quantity: "",
    product_size: "",
    description: "",
    brand: "",
    category: "",
    image: null,
    existingImage: "", // For editing existing images
    // Add product options
    hotDeal: false,
    todaysMarketPrice: false,
    topSelling: false,
    bestSeller: false,
    newArrival: false,
    topRated: false,
    featured: false,
  });
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  //const { setSocketData } = useState(null);  //To store data from socket
  const [selectedPurchaseDate, setSelectedPurchaseDate] = useState("");  //New state for selected purchase date

  useEffect(() => {
    // Manually connect the socket when the component mounts
    socket.connect();

    // Listen for category updates and handle them
    socket.on("updateCategories", (newCategory) => {
      setCategories((prev) => [...prev, newCategory]);
    });

    socket.on("removeCategory", (categoryId) => {
      setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
    });

    // Clean up on component unmount
    return () => {
      socket.off("updateCategories");
      socket.off("removeCategory");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Fetch brands, categories, and purchases on mount
    const fetchData = async () => {
      try {
        const [brandRes, categoryRes, purchaseRes, productRes] = await Promise.all([
          axios.get("/api/brands"),
          axios.get("/api/categories"),
          axios.get("/api/purchases"),
          axios.get("/api/products"),
        ]);
        setBrands(brandRes.data);
        setCategories(categoryRes.data);
        setPurchases(purchaseRes.data);
        const sortedProducts = productRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log("Fetched products:", products); // Add this line to check the products array
        console.log("Fetched products:", sortedProducts); // Add this line to check the products array
        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };

      // Calculate sellAmount when either sellPrice or sellQuantity changes
      if (name === 'sellPrice' || name === 'sellQuantity') {
        const price = parseFloat(name === 'sellPrice' ? value : prevData.sellPrice) || 0;
        const quantity = parseFloat(name === 'sellQuantity' ? value : prevData.sellQuantity) || 0;
        newData.sellAmount = (price * quantity).toString();
      }

      return newData;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleProductNameChange = (e) => {
    const selectedProductName = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      productName: selectedProductName,
    }));
    setSelectedPurchaseDate("");  //Reset selected purchase date when product name changes
  };

  const handlePurchaseDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedPurchaseDate(selectedDate);

    //Find the corresponding product in the purchases list and update purchasePrice and stock
    const selectedProduct = purchases.find(
      (purchase) => purchase.productName === formData.productName && purchase.purchaseDate === selectedDate
    );

    if (selectedProduct) {
      const totalQuantity = purchases
        .filter((purchase) => purchase.productName === formData.productName)
        .reduce((acc, purchase) => acc + purchase.quantity, 0);

      setFormData((prevData) => ({
        ...prevData,
        purchasePrice: selectedProduct.purchasePrice || "",
        quantity: totalQuantity || "",
        purchaseDate: selectedProduct.purchaseDate || "",
      }));
    }
  };

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append all fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && value) {
          formDataToSend.append(key, value); // Append new image file
        } else if (key !== "image") {
          formDataToSend.append(key, value); // Append other fields
        }
      });

      // If no new image is uploaded and we're editing, include the existing image path
      if (!formData.image && editingId) {
        formDataToSend.append("existingImage", formData.existingImage || "");
      }

      if (editingId) {
        // Update existing product
        const updateResponse = await axios.put(`/api/products/${editingId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(`"${formData.productName}" has been successfully updated!`);
        console.log("Update response:", updateResponse.data);
      } else {
        // Add new product
        const createResponse = await axios.post("/api/products", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(`"${formData.productName}" has been successfully added!`);
        console.log("Create response:", createResponse.data);
      }

      // Refetch products after adding/updating
      const productRes = await axios.get("/api/products");
      const sortedProducts = productRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(sortedProducts);

      // Reset form data after successful submission
      setFormData({
        productName: "",
        purchaseDate: "",
        purchasePrice: "",
        sellPrice: "",
        sellQuantity: "",
        sellAmount: "",
        quantity: "",
        product_size: "",
        description: "",
        brand: "",
        category: "",
        image: null,
        existingImage: "", // Reset existing image path
      });

      // Clear the image preview (if any)
      setImagePreview("");
      setEditingId(null); // Reset editingId after submission
    } catch (error) {
      console.error("Error adding/updating product:", error);
      toast.error(
        `An error occurred while adding/updating the product: ${error.response?.data?.message || error.message
        }`
      );
    }
  };


  const handleDelete = async () => {
    if (deleteId) {
      try {
        await axios.delete(`/api/products/${deleteId}`);
        setProducts(products.filter((product) => product._id !== deleteId));
        setShowModal(false);
        setDeleteId(null);
        alert('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
        toast.error("Failed to delete product: " + (error.response ? error.response.data.message : error.message));
      }
    }
  };


  const handleEdit = (product) => {
    console.log("Editing Product:", product); // Log the product data
    setFormData({
      productName: product.productName,
      purchaseDate: product.purchaseDate,
      purchasePrice: product.purchasePrice,
      sellPrice: product.sellPrice,
      sellQuantity: product.sellQuantity,
      sellAmount: product.sellAmount,
      quantity: product.quantity,
      product_size: product.product_size,
      description: product.description,
      brand: product.brand,
      category: product.category,
      image: null, // Clear the image field for editing
      existingImage: product.image || "", // Store the existing image path
      // Include product options
      hotDeal: product.hotDeal || false,
      todaysMarketPrice: product.todaysMarketPrice || false,
      topSelling: product.topSelling || false,
      bestSeller: product.bestSeller || false,
      newArrival: product.newArrival || false,
      topRated: product.topRated || false,
      featured: product.featured || false,
    });
    setImagePreview(product.image ? `${import.meta.env.VITE_API_URL}/uploads/products/${product.image}` : null); // Show the existing image for editing
    setEditingId(product._id); // Set the editingId to the product's ID
  };

  const formatProductOptions = (product) => {
    const options = [];
    if (product.hotDeal) options.push("hotDeal");
    if (product.todaysMarketPrice) options.push("todaysMarketPrice");
    if (product.topSelling) options.push("topSelling");
    if (product.bestSeller) options.push("bestSeller");
    if (product.newArrival) options.push("newArrival");
    if (product.topRated) options.push("topRated");
    if (product.featured) options.push("featured");

    return options.join(", "); // Join options into a comma-separated string
  };

  return (
    <>
      <div className="p-4 max-w-2xl mx-auto">
        <ToastContainer />
        <div className="max-w-xl w-full border rounded-md mb-10 text-center p-4">
          <h2 className="text-2xl text-center font-bold mb-4">{editingId ? 'Edit Product' : 'Add Product'}</h2>

          <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg shadow">
            <fieldset className="border border-gray-300 p-6 rounded-lg">
              <legend className="font-semibold text-gray-700">Product Details</legend>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <Label>Product Name</Label>
                  <select
                    name="productName"
                    value={formData.productName}
                    onChange={handleProductNameChange}
                    className="w-full border border-black focus:border-blue-500 p-2 rounded-md"
                    required
                  >
                    <option value="">Select Product</option>
                    {purchases.map((purchase) => (
                      <option key={purchase._id} value={purchase.productName}>
                        {purchase.productName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-left">
                  <Label>Purchase Date</Label>
                  <select
                    name="purchaseDate"
                    value={selectedPurchaseDate || formData.purchaseDate}
                    onChange={handlePurchaseDateChange}
                    className="w-full border border-black focus:border-blue-500 p-2 rounded-md"
                    required
                  >
                    <option value="">Select Purchase Date</option>
                    {purchases
                      .filter((purchase) => purchase.productName === formData.productName)
                      .map((purchase) => (
                        <option key={purchase._id} value={purchase.purchaseDate}>
                          {formatDate(purchase.purchaseDate)}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="text-left">
                  <Label>Purchase Price</Label>
                  <input
                    type="number"
                    name="purchasePrice"
                    placeholder="Purchased Price"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    className="w-full border border-black focus:border-blue-500 p-2 rounded-md"
                    required
                    disabled
                  />
                </div>
                <div className="text-left">
                  <Label>Sell Price</Label>
                  <input
                    type="number"
                    name="sellPrice"
                    placeholder="Sell Price"
                    value={formData.sellPrice}
                    onChange={handleChange}
                    className="w-full border border-black focus:border-blue-500 p-2 rounded-md"
                    required
                  />
                </div>
                <div className="text-left">
                  <Label>Sell Quantity</Label>
                  <input
                    type="number"
                    name="sellQuantity"
                    placeholder="Sell Quantity"
                    value={formData.sellQuantity}
                    onChange={handleChange}
                    className="w-full border border-black focus:border-blue-500 p-2 rounded-md"
                    required
                  />
                </div>
                <div className="text-left">
                  <Label>Sell Amount</Label>
                  <input
                    type="number"
                    name="sellAmount"
                    placeholder="Sell Amount"
                    value={formData.sellAmount}
                    onChange={handleChange}
                    className="w-full border border-black focus:border-blue-500 p-2 rounded-md bg-gray-100"
                    required
                    readOnly
                  />
                </div>
                <div className="text-left">
                  <Label>Product Quantity</Label>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Stock"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full border border-black focus:border-blue-500 p-2 rounded-md"
                    required
                  />
                </div>
                <div className="text-left">
                  <Label>Product Size/Weight</Label>
                  <input
                    type="text"
                    name="product_size"
                    placeholder="Size/Weight"
                    value={formData.product_size}
                    onChange={handleChange}
                    className="w-full border border-black focus:border-blue-500 p-2 rounded-md"
                    required
                  />
                </div>
                <div className="text-left">
                  <Label>Select Brand</Label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full border border-black focus:border-blue-500 p-2 rounded-md"
                    required
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-left">
                  <Label>Select Category</Label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-black focus:border-blue-500 p-2 rounded-md"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-black focus:border-blue-500 p-2 rounded-md mt-4"
                required
              ></textarea>
            </fieldset>
            <fieldset className="border border-gray-300 p-4 rounded-lg">
              <legend className="font-semibold text-gray-700">Product Options</legend>
              <div className="grid grid-cols-3 gap-10">
                {/* Column 1 */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="hotDeal"
                      checked={formData.hotDeal}
                      onChange={(e) => setFormData({ ...formData, hotDeal: e.target.checked })}
                    />
                    <span>Hot Deal</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="todaysMarketPrice"
                      checked={formData.todaysMarketPrice}
                      onChange={(e) => setFormData({ ...formData, todaysMarketPrice: e.target.checked })}
                    />
                    <span>Today's Market Price</span>
                  </label>
                </div>

                {/* Column 2 */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="topSelling"
                      checked={formData.topSelling}
                      onChange={(e) => setFormData({ ...formData, topSelling: e.target.checked })}
                    />
                    <span>Top Selling</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="bestSeller"
                      checked={formData.bestSeller}
                      onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })}
                    />
                    <span>Best Seller</span>
                  </label>
                </div>

                {/* Column 3 */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="newArrival"
                      checked={formData.newArrival}
                      onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })}
                    />
                    <span>New Arrival</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="topRated"
                      checked={formData.topRated}
                      onChange={(e) => setFormData({ ...formData, topRated: e.target.checked })}
                    />
                    <span>Top Rated</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span>Featured</span>
                  </label>
                </div>
              </div>
            </fieldset>

            <fieldset className="border border-gray-300 p-6 rounded-lg">
              <legend className="font-semibold text-gray-700">Product Image</legend>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-black focus:border-blue-500 p-2 rounded-md"
                required={!editingId}  // Only required if not editing
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mt-4 rounded-md shadow-md" />
              ) : formData.existingImage ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/products/${formData.existingImage}`}
                  alt="Existing Product"
                  className="w-32 h-32 object-cover mt-4 rounded-md shadow-md"
                />
              ) : null}
            </fieldset>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>


      </div>
      <div className="flex justify-center">
        <div className="max-w-7xl w-full border rounded-md mb-10 text-center p-4">
          <h2 className="text-2xl text-center font-bold mt-6 mb-6">Product List</h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Purchase Date</th>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Product Name</th>
                  <th className="border px-4 py-2">Product Option</th>
                  <th className="border px-4 py-2">Product Category</th>
                  <th className="border px-4 py-2">Purchase Price</th>
                  <th className="border px-4 py-2">Sell Price</th>
                  <th className="border px-4 py-2">Sell Quantity</th>
                  <th className="border px-4 py-2">Sell Amount</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  // Safely get the first purchase entry
                  const purchase = (product.details?.purchases ?? [])[0] || null;

                  return (
                    <tr key={product._id} className="border-b">
                      <td className="px-6 py-3">{index + 1}</td>
                      <td className="border px-4 py-2">{purchase ? purchase.purchaseDate : "N/A"}</td>
                      <td className="border px-4 py-2">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/products/${product.image}`}
                          alt={product.productName}
                          className="h-12 w-12 object-cover rounded"
                        />
                      </td>
                      <td className="border px-4 py-2">{product.productName}</td>
                      <td className="border px-4 py-2">{formatProductOptions(product)}</td>
                      <td className="border px-4 py-2">{product.category.name}</td>
                      <td className="border px-4 py-2">{purchase ? purchase.purchasePrice : "N/A"}</td>
                      <td className="border px-4 py-2">{product.sellPrice}</td>
                      <td className="border px-4 py-2">{product.sellQuantity}</td>
                      <td className="border px-4 py-2">{product.sellAmount}</td>
                      <td className="px-6 py-3 space-x-2">
                        <button onClick={() => handleEdit(product)}>
                          <FaEdit className="text-blue-500 hover:text-blue-700" />
                        </button>
                        <button onClick={() => { setDeleteId(product._id); setShowModal(true); }}>
                          <FaTrashAlt className="text-red-500 hover:text-red-700" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>


        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4 text-center">Confirm Deletion</h3>
              <p className="text-center text-gray-700 mb-4">Are you sure you want to delete this brand?</p>
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
    </>
  );
};

export default CreateProducts;

