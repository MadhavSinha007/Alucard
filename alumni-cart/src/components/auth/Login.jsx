import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";



const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("PLEASE ENTER EMAIL AND PASSWORD");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // 🔐 Firebase login
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 🔁 Fetch role from backend
      await login(userCred.user);

      const role = localStorage.getItem("role");

      // 🚀 Redirect based on role
      if (role === "admin") navigate("/dashboard");
      else if (role === "student") navigate("/dashboard");
      else navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("INVALID EMAIL OR PASSWORD");
    } finally {
      setLoading(false);
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
          animate-[fadeIn_0.3s_ease-in]
        "
      >

        {/* Title */}
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            LOGIN
          </h1>

          <p className="mt-2 text-sm font-bold">
            SIGN IN TO ACCESS THE PLATFORM.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500 text-white border-4 border-black px-4 py-3 font-bold shadow-[4px_4px_0px_#000]">
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
            focus:ring-4 focus:ring-blue-300
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
            focus:ring-4 focus:ring-blue-300
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
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
            hover:scale-[0.98]
            disabled:opacity-50
          "
        >
          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>

        {/* Helper text */}
        <p className="text-xs text-center font-bold opacity-70">
          CONTACT ADMIN IF YOU DON’T HAVE ACCESS
        </p>

      </form>
    </div>
  );
};


export default Login;

