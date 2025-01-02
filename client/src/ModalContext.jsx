import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);

  const showModal = (modalName) => setActiveModal(modalName);
  const hideModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};
