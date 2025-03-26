import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  // To access the route params
import { useTranslation } from "react-i18next";

const CategoryProductsPage = () => {
  const { t } = useTranslation();
  const { categoryId } = useParams();  // Get category ID from the URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`/api/products/category/${categoryId}`);  // Adjust the API call based on your routes
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);  // Re-fetch products when categoryId changes

  return (
    <div className="bg-white mt-24 md:mt-32 lg:mt-32 text-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("Products in this Category")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="group relative cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-custom-orange">
                <div className="w-full h-44 overflow-hidden">
                  <img
                    src={product.image ? `http://localhost:5000/${product.image}` : '/default-product.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-2 text-center sm:text-lg text-white font-semibold">
                  {t(product.name)}
                </div>
                <div className="text-center sm:text-md text-white">
                  {t(`Price: $${product.price}`)}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-xl text-gray-500">No products found in this category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProductsPage;
