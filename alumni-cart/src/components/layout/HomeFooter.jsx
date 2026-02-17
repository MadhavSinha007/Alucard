import React from "react";
import { Shield, FileText, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-400 border-t-4 border-black px-6 py-10 font-mono">
      <div className="max-w-6xl mx-auto">

        <div className="
          bg-white
          border-4 border-black
          shadow-[8px_8px_0px_#000]
          p-8
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-6
        ">

          {/* Left Side */}
          <p className="font-bold text-sm md:text-base text-center md:text-left">
            © {new Date().getFullYear()} ALUMNI PORTAL — ALL RIGHTS RESERVED
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-6 justify-center">

            <a
              href="#"
              className="
                flex items-center gap-2
                bg-blue-200
                border-2 border-black
                px-4 py-2
                font-bold text-sm
                shadow-[4px_4px_0px_#000]
                transition-all duration-150
                hover:translate-x-1 hover:translate-y-1
                hover:shadow-[2px_2px_0px_#000]
              "
            >
              <Shield size={16} strokeWidth={2.5} />
              PRIVACY
            </a>

            <a
              href="#"
              className="
                flex items-center gap-2
                bg-blue-200
                border-2 border-black
                px-4 py-2
                font-bold text-sm
                shadow-[4px_4px_0px_#000]
                transition-all duration-150
                hover:translate-x-1 hover:translate-y-1
                hover:shadow-[2px_2px_0px_#000]
              "
            >
              <FileText size={16} strokeWidth={2.5} />
              TERMS
            </a>

            <a
              href="#"
              className="
                flex items-center gap-2
                bg-blue-200
                border-2 border-black
                px-4 py-2
                font-bold text-sm
                shadow-[4px_4px_0px_#000]
                transition-all duration-150
                hover:translate-x-1 hover:translate-y-1
                hover:shadow-[2px_2px_0px_#000]
              "
            >
              <Mail size={16} strokeWidth={2.5} />
              CONTACT
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
