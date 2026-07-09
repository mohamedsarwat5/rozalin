import React, { useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Store } from "../../context/StoreProvider";

export default function Layout() {
  const { pathname } = useLocation();
  const { openCart, setOpennCart, openMenu, setOpenMenu } = useContext(Store);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  useEffect(() => {
    if (openCart || openMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openCart, openMenu]);

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Navbar />
          <Outlet key={pathname} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
