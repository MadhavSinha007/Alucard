import React from "react";
import { LogOut, LogIn, User, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { user, userData, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const displayName =
    userData?.fullName?.toUpperCase() ||
    user?.email?.toUpperCase() ||
    "USER";

  const isHome = location.pathname === "/";

  return (
    <header
      className="
        sticky top-0 z-40
        bg-white/95 backdrop-blur
        border-b-4 border-black
        px-4 sm:px-6
        h-20
        flex items-center justify-between
        font-mono
        shadow-[0px_6px_0px_#000]
      "
    >
      <button
        onClick={() => navigate(user ? "/dashboard" : "/")}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 bg-blue-400 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000]">
          <Sparkles size={18} strokeWidth={2.5} />
        </div>
        <div className="text-left">
          <p className="text-lg sm:text-2xl font-black leading-none">
            ALUMNI CART
          </p>
          <p className="text-[10px] sm:text-xs font-bold mt-1">
            COLLEGE ALUMNI PORTAL
          </p>
        </div>
      </button>

      <div className="flex items-center gap-3 sm:gap-6">
        {!isHome && loading ? (
          <div className="border-2 border-black px-4 py-2 bg-blue-100 shadow-[3px_3px_0px_#000]">
            <span className="text-sm font-bold animate-pulse">LOADING...</span>
          </div>
        ) : user ? (
          <>
            <div className="hidden md:flex items-center gap-2 border-2 border-black px-4 py-2 bg-blue-200 shadow-[3px_3px_0px_#000]">
              <User size={16} strokeWidth={2.5} />
              <span className="text-sm font-bold">
                WELCOME, {displayName}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="
                flex items-center gap-2
                bg-blue-400
                border-4 border-black
                px-4 sm:px-5 py-2
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
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="
              flex items-center gap-2
              bg-blue-400
              border-4 border-black
              px-4 sm:px-5 py-2
              font-black text-sm
              shadow-[6px_6px_0px_#000]
              transition-all duration-150
              hover:translate-x-1 hover:translate-y-1
              hover:shadow-[3px_3px_0px_#000]
            "
          >
            <LogIn size={16} strokeWidth={2.5} />
            LOGIN
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;