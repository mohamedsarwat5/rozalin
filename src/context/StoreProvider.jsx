import { createContext, useState } from "react";

export const Store = createContext();
export default function StoreProvider({ children }) {
  const [openCart, setOpennCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const cartId = localStorage.getItem('cartId')

  return (
    <Store.Provider value={{ openCart, setOpennCart, openMenu, setOpenMenu ,cartId}}>
      {children}
    </Store.Provider>
  );
}
