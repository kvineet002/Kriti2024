import React from "react";
import { Analytics } from "@vercel/analytics/react"
function Footer() {
  return (
    <div className="flex flex-col bg-[#0000004c] my_shadow m-5 rounded-lg">
      <div className="flex gap-2 px-4 pt-8 sm:pt-16">
        <div className=" uppercase text-white px-3 text-base sm:text-xl font-bold">Follow us</div>
        <img src="/facebook.svg" alt="facebook" className="w-5 sm:w-7 md:w-9"/>
        <img src="/linkedin.svg" alt="linkedin" className="w-5 sm:w-7 md:w-9" />
        <img src="/twitter.svg" alt="twitter" className="w-5 sm:w-7 md:w-9" />
        <img src="/youtube.svg" alt="youtube" className="w-5 sm:w-7 md:w-9" />
        <img src="/instagram.svg" alt="instagram" className="w-5 sm:w-7 md:w-9"/>
      </div>
        <div className="bg-[#7c7c7c] h-[1px] mt-3 mx-6"/>
        <div className="px-6 pt-4 flex gap-2 pb-5">
            <img src="/copyright.svg" alt="c" />
            <div className="text-white uppercase text-sm font-thin">
                2024 Collampus IIT Guwahati
        <Analytics/>
            </div>
        </div>
    </div>
  );
}

export default Footer;
