import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { toast } from "sonner";

// 👈 كائن المحافظات وأسعار الشحن الخاصة بها خارج الكومبوننت لعدم إعادة إنشائه مع كل رندر
const GOVERNORATES = {
  "Cairo": 70,
  "Giza": 70,
  "New Cities": 80,
  "Alexandria": 90,
  "Qalyubia": 80,
  "Sharqia": 90,
  "Dakahlia": 90,
  "Beheira": 90,
  "Kafr El Sheikh": 90,
  "Gharbia": 90,
  "Monufia": 90,
  "Damietta": 90,
  "Port Said": 90,
  "Ismailia": 90,
  "Suez": 90,
  "North Sinai": 130,
  "South Sinai": 130,
  "Matrouh": 130,
  "Red Sea": 130,
  "New Valley": 130,
  "Fayoum": 100,
  "Beni Suef": 100,
  "Minya": 100,
  "Assiut": 100,
  "Sohag": 100,
  "Qena": 100,
  "Luxor": 100,
  "Aswan": 100
};

export default function Checkout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const cartId = localStorage.getItem("cartId");

  // حالة استمارة الشحن (تمت إضافة governorate)
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    governorate: "", // 👈 تبدأ فارغة ليُجبر العميل على الاختيار
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

  // 👈 حساب قيمة شحن المحافظة المحددة ديناميكياً
  const shippingPrice = formData.governorate ? GOVERNORATES[formData.governorate] : 0;

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
      toast.success("Order placed successfully!");
      // تحديث كاش العربة في الـ TanStack Query لتظهر فارغة فوراً في الـ Navbar
      queryClient.invalidateQueries(["cart"]);
      // توجيه العميل لصفحة الرئيسة أو صفحة نجاح الطلب
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. تنظيف المدخلات من المسافات الزائدة في البداية والنهاية
    const trimmedName = formData.customerName.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedAddress = formData.address.trim();
    const selectedGov = formData.governorate; // 👈 المحافظة المختارة

    // 2. التحقق من أن العربة ليست فارغة
    if (!cartId || !cartData || cartData.items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // 3. الـ RegEx الخاص بأرقام الهواتف في مصر (010, 011, 012, 015) ومكون من 11 رقم
    const egyptPhoneRegex = /^01[0125][0-9]{8}$/;

    if (!egyptPhoneRegex.test(trimmedPhone)) {
      toast.error("Enter a valid mobile number");
      return; // إيقاف العملية
    }

    // 4. التحقق من أن الاسم يحتوي على اسم ثنائي أو ثلاثي على الأقل (يحتوي على مسافة بين الأسماء)
    const nameWords = trimmedName.split(/\s+/); // تقسيم الاسم بناءً على المسافات
    if (nameWords.length < 2 || trimmedName.length < 8) {
      toast.error("Enter your full name.");
      return; // إيقاف العملية
    }

    // 5. التحقق من جدية العنوان
    if (trimmedAddress.length < 15) {
      toast.error("Please provide a more detailed address for shipping.");
      return;
    }

    // 👈 6. التحقق من اختيار المحافظة
    if (!selectedGov) {
      toast.error("Please select your governorate.");
      return;
    }

    // إذا مرت البيانات من كل الفحوصات بنجاح، يتم إرسال الطلب
    const orderPayload = {
      cartId,
      customerName: trimmedName,
      phone: trimmedPhone,
      address: trimmedAddress,
      governorate: selectedGov, // 👈 إرسال المحافظة
      shippingPrice: GOVERNORATES[selectedGov], // 👈 إرسال قيمة الشحن
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
                  minLength={8}
                  maxLength={50}
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
                  maxLength={11} // يمنع المستخدم من كتابة أكثر من 11 رقم
                  value={formData.phone}
                  onChange={(e) => {
                    // كود ذكي: يمنع المستخدم من كتابة أي حروف نهائياً ويقبل أرقام فقط
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData((prev) => ({ ...prev, phone: value }));
                  }}
                  className="w-full border p-2.5 rounded-md focus:ring-1 focus:ring-burgundy focus:outline-none"
                  placeholder="01023456789"
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

              {/* 👈 تعديل السيلكت أوبشن للمحافظات */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Governorate
                </label>
                <select
                  name="governorate"
                  required
                  value={formData.governorate}
                  onChange={handleInputChange}
                  className="w-full border p-2.5 rounded-md focus:ring-1 focus:ring-burgundy focus:outline-none bg-white text-gray-800"
                >
                  <option value="" disabled>Choose your governorate...</option>
                  {Object.entries(GOVERNORATES).map(([gov, price]) => (
                    <option key={gov} value={gov}>
                      {gov} 
                    </option>
                  ))}
                </select>
              </div>

              {/* الحل السحري: الزر هنا محصن داخل الفورم ومحمي من الاختفاء */}
              <div className="pt-4 border-t mt-6">
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

            <div className="max-h-96 overflow-y-auto pr-2">
              {cartItems.map((item, index) => (
                <div
                  key={item._id}
                  className={`flex space-x-4 py-4 items-start ${
                    index !== cartItems.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  {/* صورة المنتج */}
                  <div className="w-16 h-20 bg-white rounded overflow-hidden shrink-0 border">
                    <img
                      src={item.selectedColor?.image}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* تفاصيل المنتج */}
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
                {/* 👈 إذا اختار العميل محافظة يظهر سعرها، وإذا لم يختر يظهر تنبيه بالاختيار */}
                <span className={shippingPrice > 0 ? "text-gray-800 font-medium" : "text-amber-600 font-medium"}>
                  {shippingPrice > 0 ? `${shippingPrice} EGP` : "Select Governorate"}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-burgundy pt-2 border-t">
                <span>Total Amount:</span>
                {/* 👈 جمع سعر العربة الأصلي مع سعر شحن المحافظة المختارة ديناميكياً */}
                <span>{((cartData?.totalPrice || 0) + shippingPrice)} EGP</span>
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