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

      // Firebase login
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // fetch role from backend + store in context/localStorage
      await login(userCred.user);

      const role = localStorage.getItem("role")?.toUpperCase();

      // ROLE BASED REDIRECT (SAFE)
      if (role === "ADMIN") {
        navigate("/dashboard");
      } else if (role === "STUDENT") {
        navigate("/dashboard");
      } else if (role === "ALUMNI") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }

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
        className="w-full max-w-md bg-blue-200 border-4 border-black p-10 shadow-[10px_10px_0px_#000] space-y-8"
      >

        <h1 className="text-3xl font-black">LOGIN</h1>

        {error && (
          <div className="bg-red-500 text-white border-4 border-black px-4 py-3 font-bold">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="EMAIL"
          className="w-full border-4 border-black px-4 py-3 font-bold"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="PASSWORD"
          className="w-full border-4 border-black px-4 py-3 font-bold"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 border-4 border-black py-3 font-black"
        >
          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>

      </form>
    </div>
  );
};

export default Login;