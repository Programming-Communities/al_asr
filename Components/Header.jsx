'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="py-5 px-5 md:px-12 lg:px-28 bg-gradient-to-b from-white to-red-50">
        <div className="flex justify-between items-center">
          <div className="w-[130px] sm:w-[180px] h-[60px] bg-gray-200 rounded animate-pulse"></div>
          <div className="w-0"></div>
        </div>
        <div className="text-center my-12">
          <div className="h-12 bg-gray-200 rounded animate-pulse mb-4 mx-auto max-w-md"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse mt-6 mx-auto max-w-2xl"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mt-4 mx-auto max-w-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28 bg-gradient-to-b from-white to-red-50">
      <div className="flex justify-between items-center">
      <Image
  src="/logo.png"
  alt="Al-Asr Hussaini Calendar"
  width={160}
  height={60}
  className="w-[130px] sm:w-auto h-auto" // ✅ Added h-auto
  priority
  sizes="(max-width: 640px) 130px, 180px"
  loading="eager"
/>
      </div>
      <div className="text-center my-12">
        <h1 className="text-3xl sm:text-5xl font-medium text-gray-800 mb-4">Al-Asr Hussaini Calendar</h1>
        <p className="mt-6 max-w-[740px] mx-auto text-base text-gray-600 leading-relaxed">
          Islamic services, calendar events, and community programs. Stay updated with the latest from Al-Asr Islamic Center.
        </p>
        <div className="flex justify-center mt-8">
          <div className="bg-red-900 text-white px-6 py-3 rounded-lg shadow-lg">
            <p className="font-semibold">📅 Islamic Calendar • 🕌 Services • 👥 Community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;