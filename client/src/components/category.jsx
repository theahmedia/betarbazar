import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
//import { io } from "socket.io-client";
import { socket } from "../utils/socket";



const CategoryPage = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Initially fetch categories
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();

    // Listen for real-time category updates
    socket.on("categoryUpdated", (newCategory) => {
      setCategories((prevCategories) => {
        const existingCategory = prevCategories.find(
          (cat) => cat._id === newCategory._id
        );
        if (existingCategory) {
          return prevCategories.map((cat) =>
            cat._id === newCategory._id ? newCategory : cat
          );
        }
        return [...prevCategories, newCategory];
      });
    });

    return () => {
      socket.off("categoryUpdated");
    };
  }, []);

  return (
    <div className="bg-white mt-24 md:mt-32 lg:mt-32 text-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("ShopbyCategory")}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link to={`/category/${category._id}`} key={index}>
              <div className="group relative cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-custom-orange">
                <div className="w-full h-44 overflow-hidden">
                  <img
                    src={category.image ? `http://localhost:5000/${category.image}` : '/default-image.jpg'}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-2 text-center sm:text-lg text-white font-semibold">
                  {t(category.name)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

