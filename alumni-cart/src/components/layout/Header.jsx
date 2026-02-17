import React from "react";

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 md:px-8">
      
      {/* Logo / Brand */}
      <h1 className="text-base sm:text-lg font-semibold tracking-tight text-gray-900">
        Alumni Cart
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-4 sm:gap-6">
        <span className="hidden sm:block text-sm text-gray-500">
          Welcome, User
        </span>

        <button className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-900 bg-white hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200">
          Logout
        </button>
      </div>
      
    </header>
  );
};

export default Header;