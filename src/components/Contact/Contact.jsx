import React from "react";
import { NavLink } from "react-router-dom";

export default function Contact() {
  return (
    <div>
      <div className="padding h-dvh text-center">
        <h3 className="text-lg font-medium text-gray-800 tracking-wide mb-4">
          Connect with us on social media
        </h3>
        <div className="mt-1 text-center space-x-2">
          <a
            href="https://www.instagram.com/rozalin914/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform duration-200 hover:scale-110"
          >
            <i className="fa-brands fa-instagram text-3xl inline-block bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] bg-clip-text text-transparent"></i>
          </a>
          <a
            href="https://www.facebook.com/RozaLiiiin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform duration-200 hover:scale-110"
          >
            <i className="fa-brands fa-facebook text-3xl text-[#1877F2]"></i>
          </a>
        </div>

       <p className="text-sm text-gray-500 mt-3">Tell us about your inquiry, and we'll get back to you shortly.</p>

      </div>
    </div>
  );
}
