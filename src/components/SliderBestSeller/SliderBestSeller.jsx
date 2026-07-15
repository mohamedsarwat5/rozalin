import React from "react";
import SliderImport from "react-slick";
import { useBestSellers } from "../useBestSeller";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

// حل مشكلة استيراد react-slick في بيئة Vite
const Slider = SliderImport.default || SliderImport;

export default function SliderBestSeller() {
  const { data: bestSellers, isLoading, isError, error } = useBestSellers();

  const settings = {
    dots: true, // إلغاء النقاط للحصول على مظهر نظيف وبسيط مثل الصورة
    infinite: true,
    speed: 300,
    slidesToShow: 4, // عرض 4 منتجات في الشاشات الكبيرة كما في الصورة
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5, // حركة ذكية للموبايل لإظهار جزء من الكارت التالي لتشجيع السحب
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Error loading Best Sellers: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <div className="slider-container padding">
        <h3 className="text-center mb-1 capitalize md:text-xl text-sm">
          Best Sellers
        </h3>
        <h3 className="capitalize mb-4 text-center text-burgundy font-medium italic">Discover the elegance</h3>
        <Slider {...settings}>
          {bestSellers?.map((product, i) => (
            // إضافة padding أفقي خفيف (px-2) لعمل مسافات نظيفة بين الصور دون الحاجة لـ borders
            <div key={i} className="px-2 outline-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35 }}
                className="relative overflow-hidden group"
              >
                {/* شارة نفاد الكمية */}
                {!product.inStock && (
                  <span className="absolute bg-red-500 z-50 top-5 -right-11 px-2 py-0.5 w-36 text-center rotate-45 text-white text-xs font-semibold uppercase tracking-wider">
                    Sold out
                  </span>
                )}

                <NavLink to={`/details/${product._id}`} className="block">
                  {/* حاوية الصورة - مع حواف دائرية ممتازة ونسبة طول مثالية للملابس */}
                  <div className="overflow-hidden mb-3 rounded-2xl aspect-3/4 bg-slate-50">
                    <img
                      src={product.colors?.[0]?.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* تفاصيل المنتج أسفل الصورة مباشرة */}
                  <div className="space-y-1">
                    {/* اسم المنتج باللون الـ Burgundy والخط العريض النظيف */}
                    <h3 className="capitalize font-semibold text-burgundy text-sm sm:text-base truncate">
                      {product.name}
                    </h3>

                    {/* الوصف باللون الرمادي الخفيف وحجم أصغر ليتطابق مع الصورة */}
                    <p className="truncate capitalize text-xs text-gray-500 font-normal">
                      {product.description}
                    </p>

                    {/* السعر والتقييم على نفس السطر */}
                    <div className="flex items-center justify-between pt-1">
                      <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                        {product.price} LE
                      </h5>

                      {/* التقييم محاذى لليمين تماماً */}
                      <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                        <span>4.9</span>
                        <i className="fa-solid fa-star text-[#ECB018] text-[10px]"></i>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </motion.div>
            </div>
          ))}
        </Slider>
        <NavLink to={`/bestseller`} className={`uppercase btn1 block text-center mt-12 bg-burgundy text-white text-xs px-7 py-2 w-fit mx-auto`}>
          view all products
        </NavLink>
      </div>
    </div>
  );
}
