import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingBasket,
  ShoppingCartIcon,
  Trash,
  X,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Store } from "../../context/StoreProvider";
import { toast } from "sonner";

export default function Navbar() {
  const { openCart, setOpennCart } = useContext(Store);
  const [openMenu, setOpenMenu] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  // مصفوفة تحتوي على العناصر الفرعية لـ All collections
  const subCollections = ["Dresses", "Sets", "Blouses", "Skirts", "Abaya"];

  const queryClient = useQueryClient();

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
    return data;
  };

  const deleteItemMutation = useMutation({
    mutationFn: async (itemId) => {
      // إرسال طلب الحذف للسيرفر
      const response = await axios.delete(`${baseUrl}cart/${cartId}/${itemId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Deleted Successfully");

      // 🔥 السحر هنا: إجبار الـ Query المسؤول عن جلب العربة على تحديث بياناته فوراً
      // تأكد من أن الكي ["cart", cartId] يطابق تماماً الـ queryKey المستخدم في جلب بيانات العربة
      queryClient.invalidateQueries(["cart", cartId]);
    },
    onError: (error) => {
      console.error("حطأ أثناء الحذف:", error);
      toast.error("فشل حذف المنتج");
    },
  });

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  const cartItems = data?.items || [];

  return (
    // bg-[#ffe7de]
    <div className=" bg-white  border-b-burgundy sticky top-0 left-0 right-0 z-20">
      <nav className="md:px-30 p-4 flex items-center  justify-between">
        {/* menu button */}
        <button
          onClick={openSideMenu}
          className="cursor-pointer flex items-center justify-center p-1"
        >
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1H18" stroke="black" strokeWidth="1" />
            <path d="M0 6H18" stroke="black" strokeWidth="1" />
            <path d="M0 11H18" stroke="black" strokeWidth="1" />
          </svg>
        </button>

        {/* overlay */}
        <div
          className={`fixed inset-0 bg-black/35 z-10 transition-opacity duration-500 ease-in-out ${
            openMenu
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpenMenu(false)}
        />
        {/* side menu */}
        <div
          className={`fixed z-50 bg-white top-0 bottom-0 left-0 w-4/5 md:w-3/12 transition-transform duration-500 ease-in-out ${
            openMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* exit button */}
          <button
            onClick={() => setOpenMenu(false)}
            className="absolute top-6 left-6 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center p-1"
            aria-label="Close menu"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="black"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* side menu links */}
          <nav className="space-y-5 font-light tracking-wide text-[15px] p-8 mt-16 ">
            {/* Home */}
            <div className="border-b border-slate-300 pb-4 acitve">
              <NavLink to={"/"} className="hover:text-burgundy block">
                Home
              </NavLink>
            </div>

            {/* New Arrival */}
            <div className="border-b border-slate-300 pb-4 acitve">
              <NavLink
                to={"/new"}
                className="hover:text-burgundy font-normal block"
              >
                New Arrival
              </NavLink>
            </div>

            {/* Best Seller */}
            <div className="border-b border-slate-300 pb-4 acitve">
              <NavLink to={"/bestSeller"} className="hover:text-burgundy block">
                Best Seller
              </NavLink>
            </div>

            {/* All collections (Accordion) */}
            <div className="border-b border-slate-300 pb-4">
              <button
                onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                className="w-full flex items-center justify-between text-left cursor-pointer focus:outline-none"
              >
                <span>All collections</span>
                {isCollectionsOpen ? (
                  <Minus size={16} className="text-gray-500" />
                ) : (
                  <Plus size={16} className="text-gray-500" />
                )}
              </button>

              {/* العناصر الفرعية لـ All collections */}
              <div
                className={`pl-4 space-y-4 pt-4 text-gray-600 text-[14px] transition-all duration-300 ease-in-out  ${
                  isCollectionsOpen
                    ? "max-h-125 opacity-100 "
                    : "max-h-0 opacity-0 "
                }`}
              >
                {subCollections.map((item, index) => (
                  <a
                    href="#"
                    key={index}
                    className="block hover:text-burgundy transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </nav>
        </div>
        {/* logo */}
        <div className="w-fit">
          <NavLink to={"/"}>
            <h1 className="text-2xl font-thin  tracking-wider text-burgundy  uppercase logo">
              Rozalin
            </h1>
          </NavLink>
        </div>

        {/* زر فتح العربة */}
        <button
          onClick={openSideCart}
          className="cursor-pointer relative text-black"
        >
          <span className="block">
            <svg
              className="Icon Icon--cart w-5 h-5 text-black hover:text-burgundy transition-colors"
              role="presentation"
              viewBox="0 0 17 20"
            >
              <path
                d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z"
                fill="#000"
              ></path>
            </svg>
          </span>
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
            className="absolute top-6 right-6 cursor-pointer hover:scale-110 transition-transform flex items-center justify-center p-1"
            aria-label="Close cart"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="black"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="flex flex-col h-full bg-white">
            {/* العنوان */}
            <div className="p-4 border-b">
              <h3 className="font-medium text-lg text-burgundy capitalize">
                shopping bag ({cartItems.length})
              </h3>
            </div>

            {/* قائمة المنتجات */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item._id} className="flex space-x-4 border-b pb-4">
                    {/* صورة المنتج بناءً على اللون المختار */}
                    <div className="w-20 h-24 shrink-0 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={item.selectedColor?.image}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* تفاصيل المنتج */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-sm text-burgundy line-clamp-1 capitalize flex justify-between   items-center">
                          {item.product?.name}
                          {/* <button
                            onClick={() => deleteItemMutation.mutate(item._id)}
                          >
                            <Trash />
                          </button> */}
                        </h4>

                        {/* الخصائص المختارة */}
                        <div className="flex justify-bettween items-center w-full">
                          <div className="mt-1 flex flex-col flex-wrap gap-x-2 gap-y-0.5 text-xs text-gray-500">
                            <span>
                              Color:{" "}
                              <strong className="text-gray-700 capitalize">
                                {item.selectedColor?.color}
                              </strong>
                            </span>
                            {item.selectedWeight && (
                              <>
                                {/* <span>|</span> */}
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
                                {/* <span>|</span> */}
                                <span>
                                  Length:{" "}
                                  <strong className="text-gray-700">
                                    {item.selectedLength} cm
                                  </strong>
                                </span>
                              </>
                            )}
                          </div>
                          {/* remove button from cart */}
                          <button
                            onClick={() => deleteItemMutation.mutate(item._id)}
                            className="text-burgundy mb-8 ml-auto"
                          >
                            <Trash />
                          </button>
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
                <NavLink
                  to={"/checkout"}
                  onClick={openSideCart}
                  className="block text-center w-full bg-burgundy text-white py-2.5 rounded-md font-medium text-sm hover:bg-opacity-90 transition-all capitalize"
                >
                  proceed to checkout
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
