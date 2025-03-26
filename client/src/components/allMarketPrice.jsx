import React from "react";
import SliderM from './sliderMarket.jsx';
import { useTranslation } from 'react-i18next';

// Sample product data with name and prices
const products = [
  { name: "Apple", today: 120, yesterday: 115, dayBefore: 110 },
  { name: "Banana", today: 60, yesterday: 55, dayBefore: 50 },
  { name: "Milk", today: 80, yesterday: 78, dayBefore: 75 },
  { name: "Rice", today: 55, yesterday: 50, dayBefore: 52 },
  { name: "Chicken", today: 250, yesterday: 245, dayBefore: 240 },
  { name: "Fish", today: 300, yesterday: 310, dayBefore: 320 },
  { name: "Tomato", today: 40, yesterday: 35, dayBefore: 30 },
  { name: "Potato", today: 30, yesterday: 32, dayBefore: 31 },
  { name: "Sugar", today: 90, yesterday: 85, dayBefore: 80 },
  { name: "Salt", today: 35, yesterday: 34, dayBefore: 33 },
  { name: "Flour", today: 60, yesterday: 58, dayBefore: 55 },
  { name: "Oil", today: 180, yesterday: 175, dayBefore: 170 },
  { name: "egg", today: 120, yesterday: 115, dayBefore: 110 },
  { name: "Tea", today: 450, yesterday: 440, dayBefore: 430 },
  { name: "Coffee", today: 500, yesterday: 510, dayBefore: 520 },
  { name: "Onion", today: 70, yesterday: 75, dayBefore: 80 },
  { name: "Garlic", today: 90, yesterday: 88, dayBefore: 85 },
  { name: "Ginger", today: 150, yesterday: 140, dayBefore: 135 },
  { name: "Beef", today: 700, yesterday: 690, dayBefore: 680 },
  { name: "Mutton", today: 900, yesterday: 880, dayBefore: 870 },
  { name: "Carrot", today: 50, yesterday: 48, dayBefore: 45 },
  { name: "peas", today: 100, yesterday: 105, dayBefore: 110 },
  { name: "Cucumber", today: 45, yesterday: 43, dayBefore: 40 },
  { name: "Papaya", today: 55, yesterday: 50, dayBefore: 48 },
  { name: "Mango", today: 120, yesterday: 110, dayBefore: 100 },
];

// Function to get price change indicator
const getPriceChange = (today, yesterday) => {
  if (today > yesterday) return "text-green-600"; // Price increased
  if (today < yesterday) return "text-red-600"; // Price decreased
  return "text-gray-600"; // No change
};

const MarketPrice = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-white text-gray-900 min-h-screen mt-10 mb-10">
      {/* Slider For Market Price */}
      <div className="">
          <SliderM />
        </div>
      <div className="mt-10"></div>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6">{t('MarketPriceUpdates')}</h2>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                <th className="border border-gray-300 px-4 py-2 text-left">{t('ProductName')}</th>
                <th className="border border-gray-300 px-4 py-2 text-center">{t('TodaysPrice(৳)')}</th>
                <th className="border border-gray-300 px-4 py-2 text-center">{t('YesterdayPrice(৳)')}</th>
                <th className="border border-gray-300 px-4 py-2 text-center">{t('DayBeforePrice(৳)')}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{t(product.name)}</td>
                  <td style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }} className={`border border-gray-300 px-4 py-2 text-center ${getPriceChange(product.today, product.yesterday)}`}>
                    {t(product.today)} ৳
                  </td>
                  <td style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }} className={`border border-gray-300 px-4 py-2 text-center ${getPriceChange(product.yesterday, product.dayBefore)}`}>
                    {t(product.yesterday)} ৳
                  </td>
                  <td style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }} className="border border-gray-300 px-4 py-2 text-center">{t(product.dayBefore)} ৳</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketPrice;
