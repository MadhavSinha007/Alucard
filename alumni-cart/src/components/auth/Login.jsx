import React, { useState } from "react";
import { useFakeAuth } from "../../hooks/useFakeAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useFakeAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    login(); // fake login
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-gray-800 p-6 rounded-lg space-y-4"
      >
        <h1 className="text-xl font-semibold">Login</h1>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-white text-black py-2 rounded hover:bg-gray-200">
          Login
        </button>

        <div className="flex justify-between text-sm text-gray-400">
          <button type="button">Forgot Password?</button>
          <button
            type="button"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;