import { createContext, useState } from "react";

export const Store = createContext();
export default function StoreProvider({children}) {
  const [openCart, setOpennCart] = useState(false);

  return <Store.Provider value={{openCart,setOpennCart}}>{children}</Store.Provider>;
}
