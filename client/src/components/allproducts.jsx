import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { BsArrowRight } from 'react-icons/bs';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios'; // Import axios for HTTP requests
import { useCart } from '../context/CartContext';
import { useBag } from '../context/BagContext';

const AllProducts = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]); // State to store fetched products
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [quantities, setQuantities] = useState({});
  const productsPerPage = 9;
  const { addToCart } = useCart();
  const { addToBag } = useBag();

  // Fetch categories from the backend when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data); // Set the fetched categories in the state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

      fetchCategories();
  }, [categories]);

  // Fetch products from the server using axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products"); // Your API endpoint for products

        const baseImageUrl = 'http://localhost:5000/uploads/products/';
        
        const validatedProducts = response.data.map((product) => ({
          ...product,
          sellingPrice: Number(product.sellAmount) || 0,
          discount: Number(product.discount) || 0,
          size: product.product_size || 'N/A',
          name: product.productName || 'Unnamed Product',
          description: product.description,
          image: product.image ? `${baseImageUrl}${product.image}` : 'default-image-url',
        }));

        setProducts(validatedProducts); // Set the fetched products in the state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const increaseQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1)
    }));
  };

  const handleAddToCart = (product) => {
    const quantityToAdd = quantities[product._id] || 1;
    addToCart({ ...product, id: product._id }, quantityToAdd);
  };

  const handleAddToBag = (product) => {
    try {
      const quantityToAdd = quantities[product._id] || 1;
      addToBag({ ...product, id: product._id }, quantityToAdd);
      setQuantities(prev => ({ ...prev, [product._id]: 1 })); // Reset quantity to 1
    } catch (error) {
      console.error('Error adding to bag:', error);
      alert(t('error.addToBag')); // Show error message to the user
    }
  };

  // Filter products based on selected category
  const filteredProducts = products.filter((product) => {
    return selectedCategory === "All" || (product.category && product.category.name === selectedCategory);
  });

  // Sort products based on selection (latest, top-rated, price)
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "latest") return b.id - a.id; // Sort by latest product ID (you may want to use a timestamp instead)
    if (sortOrder === "top-rated") return Number(b.rating) - Number(a.rating); // Ensure numeric comparison for top-rated
    if (sortOrder === "low-high") return a.sellPrice - b.sellPrice; // Sort by price low to high
    if (sortOrder === "high-low") return b.sellPrice - a.sellPrice; // Sort by price high to low
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const displayedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when category or sort order changes
  }, [selectedCategory, sortOrder, filteredProducts.length]); // Ensure that the pagination resets correctly

  return (
    <div className="bg-white text-gray-800 min-h-screen mt-40 p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Categories */}
          <h3 className="text-lg font-medium">Categories</h3>
          <ul className="mb-4 flex flex-wrap gap-2">
            <li
              className={`cursor-pointer py-1 px-3 rounded-full border ${selectedCategory === "All"
                  ? "bg-green-600 text-white font-bold"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </li>
            {categories.length > 0 ? (
              categories.map((category) => (
                <li
                  key={category._id}
                  className={`cursor-pointer py-1 px-3 rounded-full border ${selectedCategory === category.name
                      ? "bg-green-600 text-white font-bold"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </li>
              ))
            ) : (
              <li>No categories found</li>
            )}
          </ul>

          {/* Sorting Options */}
          <h3 className="text-lg font-medium">Sort By</h3>
          <select
            className="w-full p-2 border rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="top-rated">Top Rated</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* Products Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl text-center font-bold mb-4">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div
                  key={product._id}  // Updated to use _id instead of id
                  className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-semibold">{product.productName}</h3>
                  <p className="text-gray-600">
                    Price: ৳ {product.sellAmount} | Size: {product.product_size}
                  </p>
                  <p className="text-gray-600">Category: {product.category?.name}</p>
                  <p className="text-gray-600">Brand: {product.brand?.name}</p>
                  <p className="text-yellow-500">⭐ {product.rating}</p>

                  {/* Quantity Controls */}
            <div className="px-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <h6>{t('quantity')}</h6>
                <button
                  onClick={() => decreaseQuantity(product._id)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="min-w-[30px] text-center">
                  {quantities[product._id] || 1}
                </span>
                <button
                  onClick={() => increaseQuantity(product._id)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

                  {/* Add to Cart and Add to Bag Buttons */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => handleAddToBag(product)}
                      className="w-full border-2 border-custom-orange bg-custom-orange text-white py-2 rounded-lg hover:bg-orange-50 hover:text-custom-orange transition-colors duration-100 ease-in flex items-center justify-center gap-1 text-sm"
                    >
                      {t('addToBag')}
                      <BsArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full mt-2 border-2 border-green-600 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-100 ease-in flex items-center justify-center gap-1 text-sm"
                    >
                      <FaShoppingCart className="w-4 h-4" />
                      {t('addToCart')}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500">No products found.</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`px-4 py-2 rounded ${currentPage === index + 1
                      ? "bg-green-600 text-white"
                      : "bg-gray-200"
                    }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

