import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-white mb-4">
        Alumni Connect
      </h1>

      <p className="text-gray-400 max-w-xl mb-8">
        Connect with alumni, explore mentorship opportunities,
        attend events, and grow together.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-white text-black rounded font-medium"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-6 py-2 border border-gray-700 text-white rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default HomePage;