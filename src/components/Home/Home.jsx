import React, { useEffect } from "react";
import pink from "/pink.webp";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
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
      <div className="min-h-dvh w-full bg"></div>
      <div className="padding grid md:grid-cols-5 grid-cols-2 gap-4">
        {data?.map((product, i) => (
          <div key={i} className="mb-6 ">
            <NavLink to={`/details/${product._id}`}>
              <div className=" overflow-hidden mb-4 rounded-lg">
                <img src={product.colors[0].image} alt="" className="image"/>
              </div>
              <div className="text-sm">
                <h3 className="capitalize font-semibold text-burgundy truncate ">
                  {product.name}
                </h3>
                <p className="truncate capitalize">{product.description}</p>

                <div className="flex items-center ">
                  <div className="flex items-center space-x-3 text-sm">
                    <h5 className="font-medium">{product.price} EGP</h5>
                    <h5 className="line-through hidden md:block text-gray-500">750 EGP</h5>
                  </div>
                  <div className="flex mt-1 items-center text-xs ml-auto">
                    <h6 className="">4.9</h6>
                    <i className="fa-solid fa-star text-[#ECB018]"></i>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
