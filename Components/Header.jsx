import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          alt="logo"
          width={180}
          height={100}
          className="w-[130px] sm:w-auto"
        />
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#b00202]">
          Get Started
          {assets.arrow ? (
            <Image src={assets.arrow} alt="arrow" width={20} height={20} />
          ) : null}
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Hussaini Calendar</h1>
        <p className="mt-10 max-w [740px] m-auto text-xs ms:text-base">AL-ASR ( Islamic Service ) </p>
        <form className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-red-900 shadow-[-7px_7px_0px_#b00202]">
  <input
    type="email"
    placeholder="Enter your email"
    className="pl-4 outline-none flex-1"
  />
  <button
    type="submit"
    className="border-1 border-red-900 py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
  >
    Subscribe
  </button>
</form>
      </div>
    </div>
  );
};

export default Header;
