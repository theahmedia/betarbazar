import React from 'react';
import { useTranslation } from 'react-i18next';

const TranslatedText = ({ children, className = '', ...props }) => {
  const { i18n } = useTranslation();
  const isBangla = i18n.language === 'bn';
  
  return (
    <span 
      className={`${className} ${isBangla ? 'font-bangla' : 'font-english'}`}
      lang={i18n.language}
      {...props}
    >
      {children}
    </span>
  );
};

export default TranslatedText;
