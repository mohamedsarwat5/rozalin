import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const navFooter = [
    { name: "Preview & Exchange Policy", path: "/exchange" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Contact Us", path: "/contact" },
    { name: "Shipping Policy", path: "/shipping" },

  ];

  return (
    <div className=" w-full bg-red-50 p ">
      <div className="p-6">
        <div className="flex flex-col ml-4 justify-center md:flex-row gap-x-16 gap-y-3">
          {navFooter.map(({ name, path }) => (
            <NavLink to={path}>{name}</NavLink>
          ))}
        </div>
      </div>
       <p className="text-center mt-2 pb-3">©Copyright {new Date().getFullYear()} - <span className="text-burgundy font-semibold">Rozalin Store</span> - All Rights Reserved  </p>
    </div>
  );
}
