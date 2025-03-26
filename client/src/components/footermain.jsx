import React from "react";
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope  } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import Logo from "../assets/tr/BetarBazarlogo.png";
{/* Footer Pages */}
// import Affiliate from '../components/support/affiliationSales.jsx';
import AboutUs from '../components/About.jsx';
import Cancellation from '../components/support/cancelReturnRefund.jsx';
import ContactUs from '../components/support/contactUs.jsx';
import ExclusiveOffers from '../components/support/exclusiveOffers.jsx';
import HelpSupport from '../components/support/helpNsupport.jsx';
import MyOrders from './support/ordersRecord.jsx';
import Privacy from '../components/support/privacy.jsx';
import Terms from '../components/support/termsNcondition.jsx';
import MyProfile from '../components/support/userProfile.jsx';
import OrderTrack from '../components/support/orderTrackingNhistory.jsx';

const Footer = () => {
  const { t } = useTranslation();


  return (
    <footer className="bg-slate-50 text-custom-black py-6">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Logo, Contact, Social Media */}
          <div className="w-full lg:w-1/4">
            <div>
              {/* <img src={Logo} alt="logo/" className="w-16 h-12 mb-2" /> */}
              <Link to="/" className="text-xl font-bold">
                  <img
                      className="w-16 h-12 cursor-pointer"
                      src={Logo}
                      alt="Logo"
                  />
              </Link>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <p className="text-md font-normal" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>{t('GotQuestion?Callus9AMto10PM')}</p>
              <div className="relative">
                <p onClick={() => window.location.href = 'tel:+8801758111870'} className="cursor-pointer text-lg font-bold hover:text-custom-orange" >{t('01758111870')}</p>
                {/* status */}
                <span className={`block w-3 h-3 rounded-full absolute top-0 left-[135px] ${new Date().getHours() >= 9 && new Date().getHours() < 22 ? 'bg-green-400' : 'bg-red-400'}`}></span>
              </div>
              <p className="text-md text-custom-orange font-semibold mb-1">{t('FollowUs')}</p>
            </div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/betarbazar" target="_blank" title="Facebook" className="hover:text-blue-600">
                <FaFacebook className="w-6 h-6 cursor-pointer" />
              </a>
              <a href="https://www.instagram.com/betarbazar" target="_blank" title="Instagram" className="hover:text-pink-600">
                <FaInstagram className="w-6 h-6 cursor-pointer" />
              </a>
              <a href="https://www.youtube.com/@betarbazar" target="_blank" title="Youtube" className="hover:text-red-600">
                <FaYoutube className="w-6 h-6 cursor-pointer" />
              </a>
              <a 
              href="mailto:info@betarbazar.com" 
              title="Email us"
              className="hover:text-custom-orange"
              >
                <FaEnvelope className="w-6 h-6 cursor-pointer hover:text-custom-orange" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row gap-8 lg:w-3/4">
            <div className="flex-1">
              <h3 className="font-bold text-md py-4">{t('QuickLinks')}</h3>
              <ul>
                <Link to="/About" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('About')}</li>
                </Link>
                <Link to="/contactUs" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('ContactUs')}</li>
                </Link>
                <Link to="/blog" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('Blog')}</li>
                </Link>
                <Link to="/privacy" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('PrivacyPolicy')}</li>
                </Link>
                <Link to="/termsNcondition" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('Terms&Condition')}</li>
                </Link>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-md py-4">{t('MyAccount')}</h3>
              <ul>
                <Link to="/ordersRecord" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('Orders')}</li>
                </Link>
                <Link to="/userProfile" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('MyProfile')}</li>
                </Link>
                {/* <Link to="/affiliationSales" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('AffiliationSales')}</li>
                </Link> */}
                <Link to="/orderTrackingNhistory" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('OrderHistory&TrackOrder')}</li>
                </Link>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-md py-4">{t('CustomerService')}</h3>
              <ul>
                <Link to="/" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('PaymentMethods')}</li>
                </Link>
                <Link to="/helpNsupport" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('Help&Support')}</li>
                </Link>
                <Link to="/exclusiveOffers" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('ExclusiveOffers')}</li>
                </Link>
                <Link to="/cancelReturnRefund" className="hover:underline">
                  <li className="mb-2 text-sm hover:text-custom-orange">{t('CancellationReturn&Refund')}</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
