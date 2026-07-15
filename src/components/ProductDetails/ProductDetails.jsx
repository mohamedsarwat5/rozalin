import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ShoppingBag } from "lucide-react";
import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { toast } from "sonner";
import { Store } from "../../context/StoreProvider";
import { Helmet } from 'react-helmet-async'; // مستوردة بالفعل وممتازة

export default function ProductDetails() {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { setOpennCart } = useContext(Store);

  // الحصول على الـ cartId أو إنشائه إذا لم يكن موجوداً
  let cartId = localStorage.getItem("cartId");
  if (!cartId) {
    cartId = "cart_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("cartId", cartId);
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // 1. جلب تفاصيل المنتج
  const getProductDetails = async () => {
    const { data } = await axios.get(`${baseUrl}products/${id}`);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["details", id],
    queryFn: getProductDetails,
  });

  // 2. دالة إضافة المنتج إلى العربة
  const addToCartMutation = useMutation({
    mutationFn: async (cartData) => {
      const response = await axios.post(`${baseUrl}cart`, cartData);
      return response.data;
    },
    onSuccess: () => {
      setOpennCart(true);
      setQuantity(1); // إعادة العداد إلى 1 بعد الإضافة الناجحة
      queryClient.invalidateQueries(["cart", cartId]);
    },
    onError: (error) => {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product.");
    },
  });

  // دالة Mutation لتحديث الكمية
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, newQuantity }) => {
      const response = await axios.put(`${baseUrl}cart/${cartId}/${itemId}`, {
        quantity: newQuantity,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", cartId]);
    },
    onError: (error) => {
      console.error("Error updating quantity:", error);
      toast.error("فشل تحديث الكمية");
    },
  });

  // 3. معالج الضغط على زر الإضافة
  const handleAddToCart = () => {
    if (data?.category !== "Blouses" && !selectedSize) {
      toast.error("Please choose size first");
      return;
    }
    if (data?.category !== "Blouses" && !selectedLength) {
      toast.error("Please choose length first");
      return;
    }

    const productPayload = {
      cartId: cartId,
      productId: data?._id || id,
      color: data?.colors?.[selectedColorIndex]?.color,
      image: data?.colors?.[selectedColorIndex]?.image,
      price: data?.price,
      quantity: quantity,
      size: selectedSize || null,
      length: selectedLength || null,
    };

    addToCartMutation.mutate(productPayload);
  };

  if (isLoading) {
    return <Loading />;
  }

  // تحديد ما إذا كان اللون الحالي المختار متوفر في المخزن
  const isCurrentColorInStock = data?.colors?.[selectedColorIndex]?.inStock;

  // استخراج تفاصيل المنتج للـ Meta Tags لتسهيل القراءة والكتابة
  const productTitle = data?.name ? `${data.name} | Rozalin` : "Rozalin Store";
  const productDesc = data?.description || "تسوقي أحدث الفساتين والملابس النسائية الأنيقة من متجر روزالين.";
  const productImage = data?.colors?.[selectedColorIndex]?.image || "";
  const productUrl = `https://rozalin-store.com/product/${id}`;

  return (
    <div className="padding ">
      {/* 🚀 إضافة الـ Helmet هنا ديناميكياً بناءً على بيانات المنتج */}
      <Helmet>
        <title>{productTitle}</title>
        <meta name="description" content={productDesc} />

        {/* Open Graph / Facebook (لمشاركة الروابط بشكل مميز) */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={productTitle} />
        <meta property="og:description" content={productDesc} />
        <meta property="og:image" content={productImage} />
        <meta property="og:url" content={productUrl} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={productTitle} />
        <meta name="twitter:description" content={productDesc} />
        <meta name="twitter:image" content={productImage} />
      </Helmet>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-y-6 pb-12">
        <div className="w-full md:w-8/12 overflow-hidden mx-auto relative ">
          {/* تم ربط كلمة Sold out بحالة اللون الحالي أيضاً لتقديم تجربة مستخدم أفضل */}
          {!isCurrentColorInStock && (
            <span className="absolute bg-red-500 z-50 top-7 -right-8 px-2 py-0.5 w-36 text-center rotate-45 text-white text-sm">
              {" "}
              Sold out
            </span>
          )}

          <img
            src={data?.colors?.[selectedColorIndex]?.image}
            alt={data?.name}
            className="object-cover aspect-2/3 "
          />
        </div>

        {/* data */}
        <div>
          <div className="flex flex-col justify-between ">
            <h2 className="text-burgundy font-bold md:text-2xl text-xl mb-3 capitalize">
              {data?.name}
            </h2>
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className="fa-solid fa-star text-[#ECB018]"></i>
              ))}
              <span className="ml-2 text-sm"> (4.9)</span>
            </div>
          </div>

          <p className="my-5">{data?.description}</p>

          {/* price */}
          <div className="flex items-center space-x-4 mb-5">
            <h3 className="font-bold text-burgundy text-2xl">
              {data?.price}{" "}
              <span className="text-gray-500 text-lg font-normal">LE</span>
            </h3>
          </div>

          {/* colors */}
          <h5 className="mb-3">Colors:</h5>
          <div className="flex items-center flex-wrap gap-3">
            {data?.colors.map((c, index) => (
              <h4
                key={index}
                onClick={() => {
                  setSelectedColorIndex(index);
                  scrollToTop();
                }}
                className={`capitalize py-1 px-4 text-sm rounded-md font-normal border cursor-pointer transition-all ${
                  selectedColorIndex === index
                    ? "bg-burgundy text-white border-burgundy"
                    : "text-burgundy border-burgundy bg-transparent"
                } ${!c.inStock ? "opacity-50" : ""}`} // تم إضافة عتامة خفيفة للون غير المتوفر لتوضيح حالته
              >
                {c.color} {!c.inStock && "(Out of stock)"}
              </h4>
            ))}
          </div>

          {/* Sizes */}
          <div className="mt-5">
            <h4 className="mb-3">Sizes:</h4>

            {data?.category === "Blouses" ? (
              <button className="bg-burgundy text-white border-burgundy py-1 px-4 rounded-md border w-fit">
                {data?.availableWeights}
              </button>
            ) : data?.category === "Sets" || data?.category === "sets" ? (
              <>
                <h4 className="mb-3">Blouse size : </h4>
                <button className="bg-burgundy text-white border-burgundy py-1 px-4 rounded-md border w-fit">
                  one size
                </button>

                <h4 className="mt-3">Skirt size:</h4>
                <div className="flex flex-wrap gap-3 mt-3">
                  {data?.availableWeights?.slice(0).map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={` py-1 px-4 rounded-md border transition-all cursor-pointer ${
                        selectedSize === size
                          ? "bg-burgundy text-white border-burgundy"
                          : "text-burgundy border-burgundy bg-transparent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-wrap gap-3 mt-3">
                  {data?.availableWeights?.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={` py-1 px-4 rounded-md border transition-all cursor-pointer ${
                        selectedSize === size
                          ? "bg-burgundy text-white border-burgundy"
                          : "text-burgundy border-burgundy bg-transparent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {data?.category !== "Blouses" && (
            <div className="mt-5">
              <h4 className="mb-3"> {data?.category === "Abaya" ?"length":"Skirt Length:"} </h4>
              <div className="flex flex-wrap gap-3">
                {data?.availableLengths?.map((length, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedLength(length)}
                    className={` py-1 px-4 rounded-md border transition-all cursor-pointer ${
                      selectedLength === length
                        ? "bg-burgundy text-white border-burgundy"
                        : "text-burgundy border-burgundy bg-transparent"
                    }`}
                  >
                    {length} cm
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* الحاوية الخاصة بالكمية */}
          <form className="mt-4">
            <label className="block mb-3 text-sm font-medium text-heading">
              Choose quantity:
            </label>
            <div className="relative flex items-center">
              <button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                type="button"
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading rounded-full text-sm focus:outline-none h-6 w-6"
              >
                <svg
                  className="w-3 h-3 text-heading"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14"
                  />
                </svg>
              </button>

              <input
                type="text"
                id="counter-input"
                className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-10 text-center"
                value={quantity}
                readOnly
                required
              />

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                type="button"
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading rounded-full text-sm focus:outline-none h-6 w-6"
              >
                <svg
                  className="w-3 h-3 text-heading"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
              </button>
            </div>
          </form>

          {/* زر add to bag - تم إصلاح الشرط هنا بنجاح */}
          {data?.inStock && data?.colors?.[selectedColorIndex]?.inStock ? (
            <button
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
              className={`btn mt-8 flex items-center justify-center space-x-2 w-full md:w-auto ${
                addToCartMutation.isPending
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
               <svg
              className="Icon Icon--cart w-5 h-5 text-white hover:text-black bag transition-colors"
              role="presentation"
              viewBox="0 0 17 20"
            >
              <path
                d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z"
                fill="#fff"
              ></path>
            </svg>
              <h6 className="capitalize font-medium">
                {addToCartMutation.isPending ? "Adding..." : "add to bag"}
              </h6>
            </button>
          ) : (
            <button
              className="btnDisabled mt-8 w-full md:w-auto"
              disabled={true}
            >
              Sold out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}