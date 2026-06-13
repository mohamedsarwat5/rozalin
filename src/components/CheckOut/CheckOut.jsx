import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Checkout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const cartId = localStorage.getItem("cartId");

  // حالة استمارة الشحن
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
  });

  // 1. جلب المنتجات الحالية للعربة لعرضها في ملخص الطلب
  const getCartItems = async () => {
    if (!cartId) return null;
    const cleanUrl = baseUrl.endsWith("/")
      ? `${baseUrl}cart/${cartId}`
      : `${baseUrl}/cart/${cartId}`;
    const { data } = await axios.get(cleanUrl);
    return data;
  };

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: getCartItems,
    enabled: !!cartId,
  });

  // 2. الـ Mutation الخاص بإنشاء الطلب وتصفير العربة
  const createOrderMutation = useMutation({
    mutationFn: async (orderPayload) => {
      const cleanUrl = baseUrl.endsWith("/")
        ? `${baseUrl}orders`
        : `${baseUrl}/orders`;
      const { data } = await axios.post(cleanUrl, orderPayload);
      return data;
    },
    onSuccess: () => {
      alert("🎉 Your order has been placed successfully!");
      // تحديث كاش العربة في الـ TanStack Query لتظهر فارغة فوراً في الـ Navbar
      queryClient.invalidateQueries(["cart"]);
      // توجيه العميل لصفحة الرئيسة أو صفحة نجاح الطلب
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong while placing the order.",
      );
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cartId || !cartData || cartData.items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // إعداد البيانات المطابقة للـ Router تماماً
    const orderPayload = {
      cartId,
      customerName: formData.customerName,
      phone: formData.phone,
      address: formData.address,
    };

    createOrderMutation.mutate(orderPayload);
  };

  if (isLoading) return <Loading />;

  const cartItems = cartData?.items || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-burgundy mb-8 capitalize">
        Checkout
      </h2>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* القسم الأيسر: استمارة بيانات الشحن بالكامل مع الزر بالداخل */}
          <div className="lg:col-span-7 bg-white p-6 shadow-md rounded-lg border">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Shipping Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full border p-2.5 rounded-md focus:ring-1 focus:ring-burgundy focus:outline-none"
                  placeholder="Aya Ahmed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border p-2.5 rounded-md focus:ring-1 focus:ring-burgundy focus:outline-none"
                  placeholder="01xxxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Detailed Address
                </label>
                <textarea
                  name="address"
                  required
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border p-2.5 rounded-md focus:ring-1 focus:ring-burgundy focus:outline-none"
                  placeholder="Building number, Street name, Apartment, City"
                />
              </div>

              {/* الحل السحري: الزر هنا محصن داخل الفورم ومحمي من الاختفاء */}
              <div className="pt-4 border-t mt-6">
                {/* <button
                  type="submit"
                  disabled={createOrderMutation.isPending}
                  className="w-full bg-burgundy text-white py-3 rounded-md font-medium hover:bg-opacity-90 transition-all capitalize shadow disabled:bg-gray-400 cursor-pointer text-center block text-base"
                >
                  {createOrderMutation.isPending
                    ? "Processing your order..."
                    : "Place Order (Cash on Delivery)"}
                </button> */}

                <button
                  type="submit"
                  disabled={createOrderMutation.isPending}
                  className="btn"
                >

                  {createOrderMutation.isPending
                    ? "Processing your order..."
                    : "Place Order (Cash on Delivery)"}
                </button>
              </div>
            </form>
          </div>

          {/* القسم الأيمن: ملخص المنتجات والأسعار */}
          <div className="lg:col-span-5 bg-gray-50 p-6 shadow-md rounded-lg border sticky top-24">
            <h3 className="text-lg font-semibold text-burgundy mb-6 capitalize">
              Order Summary
            </h3>

            <div className="divide-y max-h-96 overflow-y-auto pr-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex space-x-4 pt-4 first:pt-0 items-start"
                >
                  <div className="w-16 h-20 bg-white rounded overflow-hidden shrink-0 border">
                    <img
                      src={item.selectedColor?.image}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-800 truncate capitalize">
                      {item.product?.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 capitalize">
                      Color: {item.selectedColor?.color}{" "}
                      {item.selectedWeight && `| Size: ${item.selectedWeight}`}{" "}
                      {item.selectedLength &&
                        `| Length: ${item.selectedLength}cm`}
                    </p>
                    <div className="flex justify-between items-center mt-2 text-xs">
                      <span className="text-gray-500">
                        Qty: {item.quantity}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {item.priceAtAddition} EGP
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* الإجمالي التلقائي */}
            <div className="border-t mt-6 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">
                  Free Shipping
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-burgundy pt-2 border-t">
                <span>Total Amount:</span>
                <span>{cartData?.totalPrice} EGP</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white border rounded-lg shadow-sm">
          <p className="text-gray-400 text-lg mb-4">
            You have no items in your bag to checkout.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-burgundy text-white px-6 py-2 rounded-md font-medium text-sm"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}
