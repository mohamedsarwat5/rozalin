import React from "react";

export default function Shipping() {
  return (
    <div>
      <div className="padding min-h-dvh">
        <div className=" max-w-6xl mx-auto ">
          <div className="flex flex-col gap-5 items-start">
            {/* Shipping Icon */}
           <div className="flex  items-center space-x-2">
             <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-burgundy text-xl">
               <i className="fa-solid fa-truck-fast"></i>
             </div>
              <h3 className="md:text-2xl text-lg font-semibold text-gray-950">
                 Shipping & Dispatch Policy
               </h3>
           </div>

            {/* Content */}
            <div className="space-y-3">


              <div className="text-sm text-gray-800 space-y-6 leading-relaxed">
                <p>
                  Once your order is confirmed, we immediately prepare and
                  dispatch your package to our reliable shipping partner.
                </p>
                <p>
                  Our delivery service ensures your items arrive safely at your
                  designated address within a maximum of{" "}
                  <strong className="text-gray-900 font-medium">
                    10 business days
                  </strong>
                  .
                </p>
                <p className="text-xs text-gray-600 italic mt-2">
                  * Please note that unforeseen regional logistics delays or
                  peak holiday seasons may occasionally extend delivery times.
                  We appreciate your patience and understanding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
