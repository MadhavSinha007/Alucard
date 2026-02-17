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
      setError("PLEASE ENTER EMAIL AND PASSWORD");
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
    <div className="min-h-screen flex items-center justify-center bg-blue-50 font-mono px-6">

      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md
          bg-blue-200
          border-4 border-black
          p-10
          shadow-[10px_10px_0px_#000]
          space-y-8
        "
      >

        {/* Title */}
        <div>
          <h1 className="text-3xl font-black">
            {isAdmin ? "ADMIN LOGIN" : "USER LOGIN"}
          </h1>

          <p className="mt-2 text-sm font-bold">
            {isAdmin
              ? "ACCESS THE ADMIN CONTROL PANEL."
              : "SIGN IN TO ACCESS THE ALUMNI PORTAL."}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-400 border-4 border-black px-4 py-3 font-bold shadow-[4px_4px_0px_#000]">
            {error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="EMAIL"
          className="
            w-full
            border-4 border-black
            px-4 py-3
            bg-white
            font-bold
            focus:outline-none
            focus:bg-blue-100
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="PASSWORD"
          className="
            w-full
            border-4 border-black
            px-4 py-3
            bg-white
            font-bold
            focus:outline-none
            focus:bg-blue-100
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          type="submit"
          className="
            w-full
            bg-blue-500
            border-4 border-black
            py-3
            font-black
            text-lg
            shadow-[6px_6px_0px_#000]
            transition-all duration-150
            hover:translate-x-1 hover:translate-y-1
            hover:shadow-[3px_3px_0px_#000]
          "
        >
          {isAdmin ? "LOGIN AS ADMIN" : "LOGIN"}
        </button>

        {/* Toggle */}
        <div className="text-center text-sm font-bold">
          {isAdmin ? "NOT AN ADMIN?" : "ARE YOU AN ADMIN?"}{" "}
          <button
            type="button"
            onClick={() => setIsAdmin(!isAdmin)}
            className="underline"
          >
            {isAdmin ? "USER LOGIN" : "ADMIN LOGIN"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default Login;
