import React from "react";
import { useBestSellers } from "../useBestSeller";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function BestSeller() {
    const { data: bestSellers, isLoading, isError, error } = useBestSellers();
  return (
    <div>
        <div className="flex items-center justify-center space-x-2">
          <i className="fa-solid fa-heart text-burgundy"></i>
          <h2 className="capitalize font-semibold text-xl">best sellers</h2>
          <i className="fa-solid fa-heart text-burgundy"></i>
        </div>
      <div className="padding grid md:grid-cols-4 grid-cols-2 gap-3">
        {bestSellers?.map((product, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35 }}
            className="mb-6 relative overflow-hidden"
          >
            {!product.inStock && (
              <span className="absolute bg-red-500 z-50 top-5 -right-11 lg:top-7 lg:-right-8 px-2 py-0.5 w-36 text-center rotate-45 text-white text-sm">
                {" "}
                Sold out
              </span>
            )}
            <NavLink to={`/details/${product._id}`}>
              <div className=" overflow-hidden mb-4 rounded-md aspect-2/3 ">
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
                <p className="truncate capitalize text-xs mb-2">
                  {product.description}
                </p>

                <div className="flex items-center ">
                  <div className="flex items-center space-x-3 text-sm">
                    <h5 className="font-medium">{product.price} LE</h5>
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
