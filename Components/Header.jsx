// Components/Header.jsx
"use client"

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28 bg-gradient-to-b from-white to-red-50 dark:from-gray-900 dark:to-red-950">
      <div className="flex justify-between items-center">
        <div className="relative w-[130px] sm:w-[160px] h-[60px]">
          {mounted ? (
            <Image
              src="/logo.png"
              alt="Al-Asr Hussaini Calendar"
              width={160}
              height={60}
              className="object-contain"
              priority
              sizes="(max-width: 640px) 130px, 160px"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded animate-pulse"></div>
          )}
        </div>
        
        {mounted && <ModeToggle />}
      </div>

      <div className="text-center my-12">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Al-Asr Hussaini Calendar
        </h1>
        <p className="mt-6 max-w-[740px] mx-auto text-base text-gray-600 dark:text-gray-300 leading-relaxed text-balance">
          Islamic services, calendar events, and community programs. Stay updated with the latest from Al-Asr Islamic Center.
        </p>
        <div className="flex justify-center mt-8">
          <div className="bg-red-900 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200">
            <p className="font-semibold text-sm sm:text-base">📅 Islamic Calendar • 🕌 Services • 👥 Community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;