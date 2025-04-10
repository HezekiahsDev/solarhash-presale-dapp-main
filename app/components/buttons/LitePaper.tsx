/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from "react";

const LitePaper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const litepaperUrl = "/Solarhash_assets/Litepaper.pdf";

  const handleViewLitepaper = () => {
    window.open(litepaperUrl, "_blank");
  };

  const handleDownloadLitepaper = () => {
    const link = document.createElement("a");
    link.href = litepaperUrl;
    link.download = "Litepaper.pdf";
    link.click();
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-amber-600 hover:bg-amber-700 text-white text-base font-semibold py-2 px-4 rounded-lg glow-on-hover"
      >
        Litepaper
      </button>
      {isOpen && (
        <div className="absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-amber-300 bg-opacity-20 ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={handleViewLitepaper}
              className="block w-full text-left hover:text-[16px] hover:text-amber-500 p-4 text-sm"
            >
              View Litepaper
            </button>
            <button
              onClick={handleDownloadLitepaper}
              className="block w-full text-left px-4 py-2 hover:text-[16px] hover:text-amber-500 text-sm"
            >
              Download Litepaper
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LitePaper;
