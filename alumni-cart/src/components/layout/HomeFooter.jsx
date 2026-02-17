import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Alumni Portal. All rights reserved.</p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-black transition">
            Privacy
          </a>
          <a href="#" className="hover:text-black transition">
            Terms
          </a>
          <a href="#" className="hover:text-black transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;