import React, { useState, useEffect } from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { IoCloseCircleOutline } from 'react-icons/io5';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useBag } from '../context/BagContext';

const formatPrice = (price, language) => {
  if (typeof price !== 'number') {
    console.error("Invalid price value:", price);
    return "N/A"; // Default text if price is undefined
  }
  return `৳ ${price.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
};




const Rfy = () => {
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [activeTab, setActiveTab] = useState('bestSeller'); // Default tab
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { addToBag } = useBag();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch all product lists in parallel
        const [
          bestSellerRes,
          newArrivalRes,
          topRatedRes,
          featuredRes
        ] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/products/top-selling`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/products/best-seller`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/products/new-arrival`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/products/top-rated`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/products/featured`)
        ]);

        // Validate responses
        const validateProducts = (data) =>
          Array.isArray(data)
            ? data.map(product => ({
              ...product,
              sellingPrice: Number(product.sellAmount) || 0,
              discount: Number(product.discount) || 0,
              size: product.product_size || 'N/A',
              name: product.productName || 'Unnamed Product',
              description: product.description,
              category: product.category || 'Uncategorized',
              rating: Number(product.rating) || 0,
              image: product.image ? `${import.meta.env.VITE_API_URL}/uploads/products/${product.image}` : 'default-image-url',
            }))
            : [];

        // Set state with validated products
        setProducts({
          bestSeller: validateProducts(bestSellerRes.data),
          newArrival: validateProducts(newArrivalRes.data),
          topRated: validateProducts(topRatedRes.data),
          featured: validateProducts(featuredRes.data),
        });

        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(t('error.fetchProducts'));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, [t]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
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

  const tabs = [
    { id: 'bestSeller', label: t('bestSeller') },
    { id: 'newArrival', label: t('newArrival') },
    { id: 'topRated', label: t('topRated') },
    { id: 'featured', label: t('featured') },
  ];


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

  const getCategoryName = (categoryId) => {
    // Find category name from the categories array using the category ID
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : 'Uncategorized';
  };


  const selectedProduct = products[activeTab]?.find(
    (product) => product.image === selectedImage
  );



  if (loading) return <div className="text-center py-8">{t('loading')}...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">{t('recommendedForYou')}</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${activeTab === tab.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-5 sm:gap-6">
        {products[activeTab]?.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer transition-all duration-300 group">
            <div className="relative h-48 overflow-hidden" onClick={() => handleImageClick(product.image)}>
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute top-2 left-2">
                <span className="bg-orange-100 text-custom-orange px-2 py-[2px] rounded-full text-xs font-medium">
                  {getCategoryName(product.category)}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <span className="bg-green-100 text-green-600 px-2 py-[2px] rounded-full text-xs font-medium" onClick={() => handleImageClick(product.image)}>
                  {t('details')}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{t(product.name)}</h3>
              <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                {t(product.product_size)}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-custom-orange font-bold">
                  {formatPrice(product.sellingPrice, i18n.language)}
                </span>
              </div>
            </div>

            {/* Quantity */}
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
        ))}
      </div>
      {/* Product Modal */}
      {selectedImage && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-2 sm:p-6 z-50" onClick={closeModal}>
          <div className="relative bg-white sm:p-5 rounded-lg shadow-lg max-w-5xl max-h-[90vh] md:max-h-[540px] overflow-y-scroll no-scrollbar" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-2 z-40" onClick={closeModal}>
              <IoCloseCircleOutline className='text-2xl text-slate-900 hover:text-custom-orange ' />
            </button>
            <div className="grid md:grid-cols-2 items-center">
              <div className="overflow-hidden rounded-lg mx-auto w-2/3 h-2/3 md:w-full md:h-auto">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-150" />
              </div>
              <div className="p-4">
                <span className="text-green-600 bg-green-100 text-xs px-3 py-[2px] rounded-full">{t(getCategoryName(selectedProduct.category))}</span>
                <h3 className="text-xl text-slate-900 font-semibold my-1">{t(selectedProduct?.name)}</h3>
                <p className="text-gray-500 text-sm">{t(selectedProduct.description || 'No description available')}</p>
                <p className="text-gray-500 text-sm mb-1 mt-3" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>{t(selectedProduct.size)}</p>
                <div className="mt-2">
                  <span className="text-xl font-bold text-custom-orange">{formatPrice(selectedProduct.sellingPrice, i18n.language)}</span>
                </div>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className={`w-4 h-4 ${index < Math.floor(selectedProduct.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({selectedProduct.rating})</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">{t('soldCount')}: {new Intl.NumberFormat(t('locale')).format(selectedProduct.soldCount || 0)}</p>
                <p className="text-gray-500 text-sm mt-2">{t('sku')}: {selectedProduct.sku || t('notAvailable')}</p>

                {/* Quantity */}
                <div className="flex gap-4 items-center">
                  <h6>{t('quantity')}</h6>
                  <div className="flex items-center justify-center gap-0 mt-2">
                    <button className="border px-2 text-xl rounded-full hover:border-custom-orange hover:text-custom-orange" onClick={() => decreaseQuantity(selectedProduct._id)}>-</button>
                    <span className="mx-3 min-w-[30px] text-center">{quantities[selectedProduct._id] || 1}</span>
                    <button className="border px-2 text-xl rounded-full hover:border-custom-orange hover:text-custom-orange" onClick={() => increaseQuantity(selectedProduct._id)}>+</button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mt-2">
                  <button
                    onClick={() => {
                      handleAddToBag(selectedProduct);
                      setSelectedImage(null); // Close the modal
                    }}
                    className="w-full bg-custom-orange text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    {t('addToBag')} <BsArrowRight />
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedImage(null);
                    }}
                    className="w-full border-2 border-green-600 text-green-600 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart /> {t('addToCart')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rfy;

