import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-black text-gray-400 text-sm text-center py-4">
      © {new Date().getFullYear()} Alumni Platform. All rights reserved.
    </footer>
  );
};

export default Footer;