import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    // bg-[#ffe7de]
    <div className=" bg-white shadow-md border-b-burgundy sticky top-0 left-0 right-0">
      <nav className="md:px-30 p-4">
       <div className="w-fit">
         <NavLink to={"/"} >
           <h1 className="text-2xl font-light tracking-wider text-burgundy">
             Rozalin
           </h1>
         </NavLink>
       </div>
      </nav>
    </div>
  );
}
