import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // To access the route params
import { useCart } from '../context/CartContext';
import { useBag } from '../context/BagContext';
import { BsArrowRight } from "react-icons/bs"; // Assuming you're using this icon
import { FaShoppingCart } from "react-icons/fa"; // Assuming you're using this icon
import { useTranslation } from 'react-i18next';
//import axios from 'axios';

const CategoryProductsPage = () => {
  const { t } = useTranslation();
  const { categoryId } = useParams();  // Get category ID from the URL
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();
  const { addToBag } = useBag();

  useEffect(() => {
    // Fetch category name
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/categories/${categoryId}`);
        const data = await response.json();
        setCategoryName(data.name || "Category"); // Default to "Category" if no name is found
      } catch (error) {
        console.error("Error fetching category:", error);
        setCategoryName("Category"); // Fallback name
      }
    };

    // Fetch products for the selected category
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products/category/${categoryId}`);
        const data = await response.json();

        // Define the base image URL
        const baseImageUrl = 'http://localhost:5000/uploads/products/';

        // Map the products and validate the fields
        const validatedProducts = data.map((product) => ({
          ...product,
          sellingPrice: Number(product.sellAmount) || 0,
          discount: Number(product.discount) || 0,
          size: product.product_size || 'N/A',
          name: product.productName || 'Unnamed Product',
          description: product.description,
          image: product.image ? `${baseImageUrl}${product.image}` : 'default-image-url',
        }));

        setProducts(validatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchCategory();
    fetchProducts();
  }, [categoryId]);

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
      alert('Error adding to bag');
    }
  };

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

  return (
    <div className="bg-white mt-24 md:mt-32 lg:mt-32 text-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("Category")}: {categoryName}
        </h2>

        {products.length === 0 ? (
          <div className="text-center text-xl font-semibold text-gray-700">
            No product has been added under this category.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={product.image || '/default-product.jpg'}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.size}</p>
                  <p className="text-gray-900 font-bold">{`$${product.sellingPrice}`}</p>
                  <div className="px-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <h6>Quantity</h6>
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
                    {/* Action Buttons */}
                    <div className="p-4 pt-0">
                      <button
                        onClick={() => handleAddToBag(product)}
                        className="w-full border-2 border-custom-orange bg-custom-orange text-white py-2 rounded-lg hover:bg-orange-50 hover:text-custom-orange transition-colors duration-100 ease-in flex items-center justify-center gap-1 text-sm"
                      >
                        Add to Bag
                        <BsArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full mt-2 border-2 border-green-600 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-100 ease-in flex items-center justify-center gap-1 text-sm"
                      >
                        <FaShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;

