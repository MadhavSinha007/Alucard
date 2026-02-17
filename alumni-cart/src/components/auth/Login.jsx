import React, { useState } from "react";
import { useFakeAuth } from "../../hooks/useFakeAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useFakeAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    login();

    if (isAdmin) {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-white text-black px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-gray-200 p-10 rounded-2xl space-y-6 shadow-sm"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isAdmin ? "Admin Login" : "User Login"}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {isAdmin
              ? "Access the admin control panel."
              : "Sign in to access the Alumni Portal."}
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
          {isAdmin ? "Login as Admin" : "Login"}
        </button>

        <div className="text-center text-sm text-gray-500">
          {isAdmin ? "Not an admin?" : "Are you an admin?"}{" "}
          <button
            type="button"
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-black font-medium hover:underline"
          >
            {isAdmin ? "User Login" : "Admin Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;