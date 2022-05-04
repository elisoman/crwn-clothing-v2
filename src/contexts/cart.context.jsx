import { createContext, useState, useEffect } from "react";

const updateCartItems = (cartItems, itemToAdd) => {
  const foundItem = cartItems.find((value) => itemToAdd.id === value.id);
  let updatedCartItems;

  if (foundItem) {
    updatedCartItems = cartItems.map((item) => {
      let resultItem = item;
      if (item.id === foundItem.id) {
        resultItem = {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return resultItem;
    });
  } else {
    updatedCartItems = [...cartItems, { ...itemToAdd, quantity: 1 }];
  }

  return updatedCartItems;
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const addItemToCart = (productToAdd) => {
    setCartItems(updateCartItems(cartItems, productToAdd));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
  };
  useEffect(() => {
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
