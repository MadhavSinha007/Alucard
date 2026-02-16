import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-[#ffffff] text-black overflow-hidden">

      {/* === Gradient Blobs === */}
      <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] bg-lime-500 rounded-full blur-[160px] opacity-20"></div>
      <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-yellow-400 rounded-full blur-[180px] opacity-20"></div>

      {/* === Main Content === */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-32 grid md:grid-cols-2 items-center">

        {/* Left Side (Hero Content) */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            We <span className="italic font-light">connect</span> you with
            <br />
            real alumni.
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-md leading-relaxed">
            Build meaningful mentorships, explore career opportunities,
            attend exclusive events, and grow with a powerful alumni network.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center gap-6">

            {/* Primary CTA */}
            <Link
              to="/login"
              className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            >
              Login
              <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full transition-all duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* Secondary CTA */}
            <Link
              to="/register"
              className="text-gray-400 border-b border-gray-700 hover:text-black hover:border-white transition-all duration-300 pb-1"
            >
              Register
            </Link>

          </div>
        </div>

        {/* Right Side (Optional Decorative Space / Future Illustration) */}
        <div className="hidden md:block"></div>

      </div>
    </div>
  );
};

export default HomePage;