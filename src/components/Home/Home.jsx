import React, { useEffect } from "react";
import pink from "/pink.webp";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";

export default function Home() {
  useEffect(() => {
    let cartId = localStorage.getItem("cartId");
    if (!cartId) {
      cartId = crypto.randomUUID();
      localStorage.setItem("cartId", cartId);
    }
  }, []);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const getProducts = async () => {
    const { data } = await axios.get(`${baseUrl}products`);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="h-105 md:min-h-dvh  w-full bg"></div>
      <div className="padding grid md:grid-cols-4 grid-cols-2 gap-2">
        {data?.map((product, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35 }}
            className="mb-6 relative overflow-hidden"
          >
            {!product.inStock&& (
          <span className="absolute bg-red-500 z-50 top-5 -right-11 lg:top-7 lg:-right-8 px-2 py-0.5 w-36 text-center rotate-45 text-white text-sm">
              {" "}
              Sold out
            </span>
            )}
            <NavLink to={`/details/${product._id}`}>
              <div className=" overflow-hidden mb-4 rounded-md aspect-3/4 ">
                <img
                  src={product.colors[0].image}
                  alt=""
                  className="image w-full h-full object-cover"
                />
              </div>
              <div className="text-sm">
                <h3 className="capitalize font-medium text-burgundy truncate ">
                  {product.name}
                </h3>
                <p className="truncate capitalize text-xs mb-2">{product.description}</p>

                <div className="flex items-center ">
                  <div className="flex items-center space-x-3 text-sm">
                    <h5 className="font-medium">{product.price} EGP</h5>
                    {/* <h5 className="line-through hidden md:block text-gray-500">
                      750 EGP
                    </h5> */}
                  </div>
                  <div className="flex mt-1 items-center text-xs ml-auto">
                    <h6 className="">4.9</h6>
                    <i className="fa-solid fa-star text-[#ECB018]"></i>
                  </div>
                </div>
              </div>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
