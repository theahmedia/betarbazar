import { useTranslation } from 'react-i18next'; // Import i18n hook
import TranslatedText from '../components/TranslatedText';
import Delivery from '../assets/aboutImages/fastDelivery.png';
import FresH from '../assets/aboutImages/vagetablesss.png';
import SaveM from '../assets/aboutImages/savemoney.png';
import CallCEn from '../assets/aboutImages/callCenterEn.png';
import CallCBn from '../assets/aboutImages/callCenterBn.png'; // Use correct Bangla image

const PolicyInfo = () => {
  const { t, i18n } = useTranslation(); // Initialize translation hook

  // Determine which customer support image to use based on language
  const callCenterImage = i18n.language === 'bn' ? CallCBn : CallCEn;

  return (
    <div className='container mx-auto mt-10'>
      <div className='grid lg:grid-cols-4 grid-cols-2 justify-center md:grid-cols-2 gap-8 md:gap-10'>

        {/* Policy Items */}
        {[ 
          { img: Delivery, titleKey: "fastHomeDelivery", textKey: "getProducts" },
          { img: FresH, titleKey: "freshProducts", textKey: "organicFood" },
          { img: SaveM, titleKey: "saveMoney", textKey: "exclusiveSale" },
          { img: callCenterImage, titleKey: "customerSupport", textKey: "callCenter", isPhone: true }
        ].map((item, index) => (
          <div key={index} className='flex items-center justify-center gap-2 border-slate-300 border-2 hover:border-custom-orange rounded-lg p-4 hover:shadow-lg group overflow-hidden'>            
            {/* Image */}
            <div className='w-20'>
              <img src={item.img} alt={t(item.titleKey)} />
            </div>

            {/* Text Content */}
            <div className='ml-2'>
              <h3 className='font-semibold text-gray-800'>{t(item.titleKey)}</h3>
              {item.isPhone ? (
                <p onClick={() => window.location.href = 'tel:+8801758111870'} className="cursor-pointer text-md font-normal hover:text-blue-600">{t(item.textKey)}</p>
              ) : (
                <p className='text-sm text-gray-600'>{t(item.textKey)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyInfo;
