import Feed from '../assets/aboutImages/feedback.webp'
import AboutHero from '../assets/aboutImages/aboutherobg.webp'
import Fresh from '../assets/aboutImages/freshProducts.webp'
import Fast from '../assets/aboutImages/fastDelivery.webp'
import AboutVector from '../assets/aboutImages/aboutherovector.png'
import { useTranslation } from 'react-i18next';  // Import i18n hook
import "../i18n"; // Import i18n configuration


const About = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white mt-24 text-gray-800">
      {/* Hero Section */}
      <div className="relative min-h-[50vh]">
            <img
                src= {AboutHero} // Replace with your image
                alt="Fresh Products"
                className="w-full h-full object-cover absolute"
            />
        <div className="container mx-auto h-full">
            <div className="grid md:grid-cols-2 items-center relative py-14 sm:py-20">
                <div className="text-center md:text-left">
                    <h1 className="text-3xl lg:text-5xl font-bold">
                        {t('PurenFreshProductsDeliveredFast')}
                    </h1>
                    <p className="text-lg mt-3 max-w-2xl">
                        {t('WebringyouthefreshestorganicandhighqualityproductswithlightningfastdeliveryExperiencethebestinpurityandservice')}
                    </p>
                </div>
                <div className="">
                <img
                    src= {AboutVector} // Replace with your image
                    alt="Fresh Products"
                    className="w-10/12 mx-auto lg:mx-0 lg:float-end h-full object-cover"
                />
                </div>
            </div>
        </div>
        {/* <img
          src= {AboutHero} // Replace with your image
          alt="Fresh Products"
          className="w-full h-auto object-cover"
        />
        <div className="container mx-auto absolute inset-0 ">
          <div className="flex flex-col justify-center md:max-w-[500px] lg:max-w-3xl py-16 text-black p-6">
            <h1 className="text-3xl lg:text-5xl font-bold">
              Pure & Fresh Products, Delivered Fast!
            </h1>
            <p className="text-lg mt-3 max-w-2xl">
              We bring you the freshest, organic, and high-quality products with lightning-fast delivery. Experience the best in purity and service!
            </p>
          </div>
        </div> */}
      </div>

      {/* About Us Section */}
      <div className="max-w-6xl mx-auto p-6 md:p-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-center">
          {t('WhyChooseUs')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          {/* Card 1 - Pure & Fresh */}
          <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src={Fresh}
              alt="Fresh Products"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>{t('100%PurenFresh')}</h3>
            <p className="text-gray-600 mt-2">
            {t('Wehandpickonlythefreshestandpurestproductsforyouensuringtopnotchquality')}
            </p>
          </div>

          {/* Card 2 - Fast Delivery */}
          <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src={Fast}
              alt="Fast Delivery"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4">{t('SuperFastDelivery')}</h3>
            <p className="text-gray-600 mt-2">
              {t('Yourordersreachyouinrecordtimewithourefficientdeliverynetwork')}
            </p>
          </div>

          {/* Card 3 - Customer Satisfaction */}
          <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src={Feed}
              alt="Customer Satisfaction"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4">{t('CustomerSatisfaction')}</h3>
            <p className="text-gray-600 mt-2">
            {t('Weprioritizeyourhappinessandtrustwithexcellentserviceandtopqualityproducts')}
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 text-center py-12 px-6">
        <h2 className="text-3xl font-bold">{t('ExperiencetheBestinQualitynDelivery')}</h2>
        <p className="text-gray-700 mt-2">{t('Shopwithusandenjoyfreshorganicandfastdeliveries')}</p>
        <button className="mt-5 bg-orange-500 text-white py-3 px-6 rounded-full text-lg hover:bg-orange-600 transition">
          {t('ShopNow')}
        </button>
      </div>
    </div>
  );
};

export default About;
