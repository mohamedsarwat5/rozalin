import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Menu,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingBasket,
  ShoppingCartIcon,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpennCart] = useState(false);

  const openSideMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  const openSideCart = () => {
    setOpennCart((prev) => !prev);
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const cartId = localStorage.getItem("cartId");
  const getCartItems = async () => {
    const { data } = await axios.get(`${baseUrl}cart/${cartId}`);
    console.log(data);
    return data;
  };

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  const cartItems = data?.items || [];
  return (
    // bg-[#ffe7de]
    <div className=" bg-white shadow-md border-b-burgundy sticky top-0 left-0 right-0">
      <nav className="md:px-30 p-4 flex items-center  justify-between">
        <button onClick={openSideMenu} className="cursor-pointer">
          <Menu />
        </button>

        <div
          className={`fixed inset-0 bg-black/35 z-10 transition-opacity duration-500 ease-in-out ${
            openMenu
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpenMenu(false)}
        />

        <div
          className={`fixed z-50 bg-white top-0 bottom-0 left-0 w-4/5 md:w-3/12 transition-transform duration-500 ease-in-out ${
            openMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* زر الإغلاق */}
          <button
            onClick={() => setOpenMenu(false)}
            className="absolute top-6 left-6 cursor-pointer hover:scale-110 transition-transform" // أضفت تأثير تفاعلي بسيط
            aria-label="Close menu" // تحسين الوصولية (Accessibility)
          >
            <X />
          </button>
        </div>

        <div className="w-fit">
          <NavLink to={"/"}>
            <h1 className="text-2xl font-light tracking-wider text-burgundy">
              Rozalin
            </h1>
          </NavLink>
        </div>

        {/* زر فتح العربة */}
        <button onClick={openSideCart} className="cursor-pointer">
          <ShoppingCartIcon />
        </button>

        {/* الـ Overlay: تم إزالة الشرط عنه ليعمل الـ transition-opacity عند الفتح والإغلاق بسلاسة */}
        <div
          className={`fixed inset-0 bg-black/35 z-10 transition-opacity duration-500 ease-in-out ${
            openCart ? "opacity-100 " : "opacity-0 pointer-events-none"
          }`}
          onClick={openSideCart}
        />

        {/* عربة التسوق الجانبية */}
        <div
          className={`fixed z-50 bg-white top-0 bottom-0 right-0 w-4/5 md:w-3/12 transition-transform duration-500 ease-in-out ${
            openCart ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* زر الإغلاق */}
          <button
            onClick={openSideCart}
            className="absolute top-6 right-6 cursor-pointer hover:scale-110 transition-transform"
          >
            <X />
          </button>

          <div className="flex flex-col h-full bg-white">
            {/* العنوان */}
            <div className="p-4 border-b">
              <h3 className="font-bold text-lg text-burgundy capitalize">
                shopping bag ({cartItems.length})
              </h3>
            </div>

            {/* قائمة المنتجات */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item._id} className="flex space-x-4 border-b pb-4">
                    {/* صورة المنتج بناءً على اللون المختار */}
                    <div className="w-20 h-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={item.selectedColor?.image}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* تفاصيل المنتج */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-sm text-burgundy line-clamp-1 capitalize">
                          {item.product?.name}
                        </h4>

                        {/* الخصائص المختارة */}
                        <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-gray-500">
                          <span>
                            Color:{" "}
                            <strong className="text-gray-700 capitalize">
                              {item.selectedColor?.color}
                            </strong>
                          </span>
                          {item.selectedWeight && (
                            <>
                              <span>|</span>
                              <span>
                                Size:{" "}
                                <strong className="text-gray-700">
                                  {item.selectedWeight} kg
                                </strong>
                              </span>
                            </>
                          )}
                          {item.selectedLength && (
                            <>
                              <span>|</span>
                              <span>
                                Length:{" "}
                                <strong className="text-gray-700">
                                  {item.selectedLength} cm
                                </strong>
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* الكمية والسعر */}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-bold text-burgundy">
                          {item.priceAtAddition} EGP
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400 text-sm">
                  Your bag is empty
                </div>
              )}
            </div>

            {/* المجموع الكلي أسفل الكارت */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex justify-between text-base font-semibold text-burgundy mb-4">
                  <span>Total Price:</span>
                  <span>{data?.totalPrice} EGP</span>
                </div>
                <button className="w-full bg-burgundy text-white py-2.5 rounded-md font-medium text-sm hover:bg-opacity-90 transition-all capitalize">
                  proceed to checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
