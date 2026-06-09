import React from "react";

export default function Loading() {
  return (
   <div className="h-screen flex items-center justify-center fixed inset-0 z-50 bg-white">
     <div className="wrapper">
       <div className="circle" />
       <div className="circle" />
       <div className="circle" />
       <div className="shadow" />
       <div className="shadow" />
       <div className="shadow" />
     </div>
   </div>
  );
}
