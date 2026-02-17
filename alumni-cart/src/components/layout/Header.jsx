import React from "react";
import { LogOut, User } from "lucide-react";
import { useFakeAuth } from "../../hooks/useFakeAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useFakeAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // clear auth state
    navigate("/");     // go back to home (or /login)
  };

  return (
    <header className="
      h-20
      bg-white
      border-b-4 border-black
      px-6
      flex
      items-center
      justify-between
      font-mono
      shadow-[6px_6px_0px_#000]
    ">

      {/* Brand */}
      <h1 className="text-2xl font-black">
        ALUMNI CART
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2 border-2 border-black px-4 py-2 bg-blue-200 shadow-[3px_3px_0px_#000]">
          <User size={16} strokeWidth={2.5} />
          <span className="text-sm font-bold">
            WELCOME, {user?.name?.toUpperCase() || "USER"}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2
            bg-blue-400
            border-4 border-black
            px-5 py-2
            font-black text-sm
            shadow-[6px_6px_0px_#000]
            transition-all duration-150
            hover:translate-x-1 hover:translate-y-1
            hover:shadow-[3px_3px_0px_#000]
          "
        >
          <LogOut size={16} strokeWidth={2.5} />
          LOGOUT
        </button>

      </div>
    </header>
  );
};

export default Header;
