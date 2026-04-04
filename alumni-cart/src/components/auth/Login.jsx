import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // If auth is resolved and user is logged in, go to dashboard
  if (!loading && user && role) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("PLEASE ENTER EMAIL AND PASSWORD");
      return;
    }
    try {
      setSubmitting(true);
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      // AuthContext will update → this component re-renders → Navigate fires
    } catch (err) {
      console.error(err);
      setError("INVALID EMAIL OR PASSWORD");
      setSubmitting(false);
    }
  };

  // Show spinner while auth is initializing on page load
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono bg-blue-50">
        <p className="text-xl font-black animate-pulse">LOADING...</p>
      </div>
    );
  }

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
          className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className="w-full border-4 border-black px-4 py-3 font-bold bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-500 border-4 border-black py-3 font-black hover:bg-blue-600 transition-colors disabled:opacity-60"
        >
          {submitting ? "LOGGING IN..." : "LOGIN"}
        </button>
      </form>
    </div>
  );
};

export default Login;