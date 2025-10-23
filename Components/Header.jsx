// Components/Header.jsx
"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28 bg-linear-to-b from-white to-red-50 dark:from-gray-900 dark:to-red-950">

      {/* Logo Section */}
      <div className="flex justify-between items-center">
        <div className="relative w-[130px] sm:w-40 h-[60px]">

          {mounted ? (
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Al-Asr (Islamic Service)"
                width={80}
                height={40}
                sizes="(max-width: 640px) 130px, 160px"
                priority
                quality={75}
                style={{
                  objectFit: "contain",
                  width: "auto",
                  height: "auto",
                }}
                className="cursor-pointer hover:opacity-90 transition-opacity"
              />
            </Link>
          ) : (
            <div className="w-full h-full bg-gray-200 rounded animate-pulse"></div>
          )}
        </div>

        {/* Theme Toggle Button */}
        {mounted && <ModeToggle />}
      </div>

      {/* Hero Section */}
      <div className="text-center my-12">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Al-Asr ( Islamic Service )
        </h1>
        <p className="mt-6 max-w-[740px] mx-auto text-base text-gray-600 dark:text-gray-300 leading-relaxed text-balance">
          Islamic services, calendar events, and community programs. Stay updated with the latest from Al-Asr ( Islamic Service ).
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