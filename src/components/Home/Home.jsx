import React, { useEffect } from "react";
import pink from "/pink.webp";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Loading from "../Loading/Loading";
// import blouse from "../../../public/blouse.jpg";
// import skirt from "../../../public/skirt.webp";
// import set from "../../../public/set.webp";
// import abaya from "../../../public/abaya.webp";

export default function Home() {
  const Images = [
    { name: "sets", src: "/set.webp" },
    { name: "abaya", src: "/abaya.webp" },
    { name: "blouses", src: "/blouse.jpg" },
    { name: "skirts", src: "/skirt.webp" },
  ];

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
      <div className=" min-h-fit w-full relative">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center flex-col text-white text-xl">
          <h1 className="welcome">"Welcome To ROZALIN"</h1>
          <p className="capitalize text-center px-2 mt-3 ">
            Because Your modest elegance is worth it.
          </p>
        </div>
        <img src="/bg.webp" className="w-full" alt="" />
      </div>
      <div className="padding grid md:grid-cols-2 grid-cols-1 gap-3">
        {Images.map((e, i) => (
          <div key={i} className="aspect-3/4 overflow-hidden relative">
            {/* overlay */}
            <div className="absolute inset-0 bg-black/40">
              <div className="absolute left-7 bottom-7  md:left-12 md:bottom-12 z-20">
                <h5 className="text-white capitalize  text-xl">{e.name}</h5>
                <NavLink
                  className="bg-white category text-black font-light px-5 py-1.5 mt-3 md:mt-5 block capitalize border border-transparent"
                  to={`category/${e.name}`}
                >
                  {`step in to ${e.name}`}
                </NavLink>
              </div>
            </div>
            <img className="w-full h-full object-cover" src={e.src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
