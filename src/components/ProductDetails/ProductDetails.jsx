import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ShoppingBag, Star } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function ProductDetails() {
  // اجعلها تحت دالة useQuery مباشرة
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const { id } = useParams();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const getProductDetails = async () => {
    const { data } = await axios.get(`${baseUrl}products/${id}`);
    return data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["details"],
    queryFn: getProductDetails,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="padding ">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-y-6 pb-12">
        <div className="w-full md:w-8/12  overflow-hidden mx-auto">
          <img
            src={data?.colors?.[selectedColorIndex]?.image}
            alt={data?.name}
            className="object-cover aspect-3/4 "
          />
        </div>

        {/* data */}
        <div>
          <div className="flex flex-col justify-between ">
            {/* name */}
            <h2 className="text-burgundy font-bold md:text-2xl text-xl mb-3 capitalize">
              {data?.name}
            </h2>
            {/* rates */}
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className="fa-solid fa-star text-[#ECB018]"></i>
              ))}
              <span className="ml-2 text-sm"> (4.9)</span>
            </div>
          </div>
          {/* <h3>Category: {data.category}</h3> */}

          <p className="my-5">{data?.description}</p>

          {/* price */}
          <div className="flex items-center space-x-4 mb-5">
            <h3 className="font-bold text-burgundy text-2xl">
              {" "}
              {data?.price}{" "}
              <span className="text-gray-500 text-lg font-normal">EGP</span>
            </h3>
            <span>|</span>
            <h3 className="line-through text-gray-500">
              750 <span className="line-none">EGP</span>
            </h3>
          </div>
          {/* colors */}
          <h5 className="mb-3">Colors:</h5>
          <div className="flex items-center space-x-3">
            {data?.colors.map((c, index) => (
              <h4
                key={index}
                onClick={() => {
                  setSelectedColorIndex(index);
                  scrollToTop();
                }} // عند الضغط، يتم تحديث المؤشر ليعرض الصورة الخاصة باللون
                className={`capitalize py-1 px-4 rounded-md font-normal border cursor-pointer transition-all
      ${
        selectedColorIndex === index
          ? "bg-burgundy text-white border-burgundy" // شكل اللون المحدد نشطاً
          : "text-burgundy border-burgundy bg-transparent" // شكل باقي الألوان الغير محددة
      }`}
              >
                {c.color}
              </h4>
            ))}
          </div>

          {/* Sizes */}
          <div className="mt-5">
            <h4 className="mb-3">Sizes:</h4>

            {data.category === "Blouses" ? (
              <button className="bg-burgundy text-white border-burgundy py-1 px-4 rounded-md border w-fit">
                {data?.availableWeights[0]}
              </button>
            ) : data.category === "sets" ? (
              <>
                <h4 className="mb-3">Blouse size : </h4>
                <button className="bg-burgundy text-white border-burgundy py-1 px-4 rounded-md border w-fit">
                  one size
                </button>

                <h4 className="mt-3">Skirt size:</h4>
                <div className="flex flex-wrap gap-3 mt-3">
                  {data?.availableWeights?.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={` py-1 px-4 rounded-md border transition-all cursor-pointer
          ${
            selectedSize === size
              ? "bg-burgundy text-white border-burgundy"
              : "text-burgundy border-burgundy bg-transparent"
          }`}
                    >
                      {size} {size !== "one size" && "kg"}
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
                      className={` py-1 px-4 rounded-md border transition-all cursor-pointer
          ${
            selectedSize === size
              ? "bg-burgundy text-white border-burgundy"
              : "text-burgundy border-burgundy bg-transparent"
          }`}
                    >
                      {size} {size !== "one size" && "kg"}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {data?.category !== "Blouses" && (
            <div className="mt-5">
              <h4 className="mb-3">Skirt Length:</h4>

              <div className="flex flex-wrap gap-3">
                {data?.availableLengths?.map((length, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedLength(length)}
                    className={` py-1 px-4 rounded-md border transition-all cursor-pointer
          ${
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

          {/* add to bag */}
          <button className=" btn">
            <ShoppingBag className="" size={18} />
            <h6 className="capitalize  font-medium">add to bag</h6>
          </button>
        </div>
      </div>
    </div>
  );
}
