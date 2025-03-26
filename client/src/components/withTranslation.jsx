import React from 'react';
import { useTranslation } from 'react-i18next';

// HOC for wrapping components with translation support
const withTranslation = (WrappedComponent) => {
  return function WithTranslationWrapper(props) {
    const { i18n } = useTranslation();
    const isBangla = i18n.language === 'bn';
    
    return (
      <WrappedComponent 
        {...props}
        className={`${props.className || ''} ${isBangla ? 'font-bangla' : 'font-english'}`}
        lang={i18n.language}
      />
    );
  };
};

export default withTranslation;