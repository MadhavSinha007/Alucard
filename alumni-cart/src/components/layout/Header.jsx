import React from "react";

const Header = () => {
  return (
    <header className="h-16 bg-black border-b border-gray-800 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-white">
        Alumni Portal
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Welcome, User</span>
        <button className="px-3 py-1 text-sm rounded bg-white text-black hover:bg-gray-200 transition">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;