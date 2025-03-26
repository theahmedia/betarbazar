import React, { createContext, useContext, useReducer } from 'react';

// Create the Bag Context
const BagContext = createContext();

// Bag Reducer to handle actions
const bagReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BAG': {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, price: action.payload.price || 0 }],
        };
      }
    }
    case 'REMOVE_FROM_BAG':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'INCREASE_BAG_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case 'DECREASE_BAG_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      };
    case 'CLEAR_BAG':
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

// Bag Provider Component
export const BagProvider = ({ children }) => {
  const [bagState, dispatch] = useReducer(bagReducer, { items: [] });

  const addToBag = (product, quantity) => {
    if (!product.sellPrice) {
      console.error("Product sellPrice is missing:", product);
      return;
    }
    dispatch({
      type: 'ADD_TO_BAG',
      payload: { ...product, price: product.sellPrice, quantity }, // Map sellPrice to price
    });
  };

  const increaseQuantity = (productId) => {
    dispatch({
      type: 'INCREASE_BAG_QUANTITY',
      payload: productId,
    });
  };

  const decreaseQuantity = (productId) => {
    dispatch({
      type: 'DECREASE_BAG_QUANTITY',
      payload: productId,
    });
  };

  const removeFromBag = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_BAG',
      payload: productId,
    });
  };

  const clearBag = () => {
    dispatch({
      type: 'CLEAR_BAG',
    });
  };

  const getBagTotalPrice = () => {
    return bagState.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <BagContext.Provider
      value={{
        bag: bagState.items,
        addToBag,
        increaseQuantity,
        decreaseQuantity,
        removeFromBag,
        clearBag,
        getBagTotalPrice,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};

// Custom hook to use the Bag Context
export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error('useBag must be used within a BagProvider');
  }
  return context;
};