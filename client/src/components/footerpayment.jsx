import React from 'react';
import { useTranslation } from 'react-i18next';

import Bkash from '../assets/pglogos/bkash.png';
import VISA from '../assets/pglogos/visa.png';
import Master from '../assets/pglogos/mastercard.png';
import AmEx from '../assets/pglogos/ae.png';
import Nogod from '../assets/pglogos/nogod.png';
import Upay from '../assets/pglogos/upay.png';

const FooterPayment = () => {
  const { t } = useTranslation();
  return (
    <div className='bg-slate-50'>
      <div className='container mx-auto px-4 py-6 border-t border-slate-200'>
        <div className='flex flex-col md:flex-row justify-between items-center w-full gap-4'>
          <div>
            <a href="https://betarbazar.com/" className='text-md font-normal hover:text-custom-orange'>{t('betarbazarcom')}</a>
          </div>
          <div className='flex flex-wrap gap-2 items-center justify-center'>
            <p className='text-sm font-normal px-6'>{t('Wereusingsafepaymentfor')}</p>
            <img className='w-6 h-6 bg-slate-50 rounded-lg shadow-sm' src= { Bkash } alt="Bkash" />
            <img className='w-6 h-6 bg-slate-50 rounded-lg shadow-sm' src= { VISA } alt="VISA" />
            <img className='w-6 h-6 bg-slate-50 rounded-lg shadow-sm' src= { Master } alt="Mastercard" />
            <img className='w-6 h-6 bg-slate-50 rounded-lg shadow-sm' src= { AmEx } alt="American Express" />
            <img className='w-6 h-6 bg-slate-50 rounded-lg shadow-sm' src= { Nogod } alt="Nogod" />
            <img className='w-6 h-6 bg-slate-50 rounded-lg shadow-sm' src= { Upay } alt="UPAY" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterPayment
