import { createContext, useState } from "react";

export const Store = createContext();
export default function StoreProvider({ children }) {
  const [openCart, setOpennCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Store.Provider value={{ openCart, setOpennCart, openMenu, setOpenMenu }}>
      {children}
    </Store.Provider>
  );
}
