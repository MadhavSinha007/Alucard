import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import AlumniJoinRequest from "./AlumniJoinRequest";
import LoadingScreen from "../layout/LoadingScreen";

const Login = () => {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showJoinRequest, setShowJoinRequest] = useState(false);
  const [enteringPortal, setEnteringPortal] = useState(false);

  if (!loading && user && role && !enteringPortal) {
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

      setEnteringPortal(true);

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1400);
    } catch (err) {
      console.error(err);
      setError("INVALID EMAIL OR PASSWORD");
      setSubmitting(false);
      setEnteringPortal(false);
    }
  };

  if (loading || enteringPortal) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-50 font-mono px-6">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
          <div className="bg-blue-300 border-4 border-black p-8 sm:p-10 shadow-[10px_10px_0px_#000]">
            <p className="text-sm font-black mb-3">ALUMNI CART PORTAL</p>

            <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-6">
              CONNECT.
              <br />
              CONTRIBUTE.
              <br />
              GROW.
            </h1>

            <p className="font-bold text-sm sm:text-base leading-relaxed mb-8">
              ACCESS EVENTS, MENTORSHIP, ALUMNI DIRECTORY, DONATIONS, AND COMMUNITY FEATURES
              THROUGH ONE COLLEGE NETWORK.
            </p>

            <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000]">
              <p className="font-black text-sm mb-3">
                PASSED OUT BEFORE THIS SYSTEM EXISTED?
              </p>
              <p className="font-bold text-sm mb-4">
                REQUEST ACCESS AND UPLOAD DOCUMENTS FOR VERIFICATION.
              </p>
              <button
                type="button"
                onClick={() => setShowJoinRequest(true)}
                className="bg-blue-500 border-4 border-black px-5 py-3 font-black shadow-[4px_4px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
              >
                MAKE ACCESS REQUEST
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full bg-blue-200 border-4 border-black p-8 sm:p-10 shadow-[10px_10px_0px_#000] space-y-8"
          >
            <div>
              <h2 className="text-3xl font-black mb-2">LOGIN</h2>
              <p className="font-bold text-sm text-gray-700">
                SIGN IN TO ACCESS YOUR DASHBOARD
              </p>
            </div>

            {error && (
              <div className="bg-red-500 text-white border-4 border-black px-4 py-3 font-bold">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <input
                type="email"
                placeholder="EMAIL"
                className="w-full border-4 border-black px-4 py-3 font-bold bg-white focus:outline-none focus:bg-blue-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="PASSWORD"
                className="w-full border-4 border-black px-4 py-3 font-bold bg-white focus:outline-none focus:bg-blue-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-500 border-4 border-black py-3 font-black shadow-[6px_6px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_#000] disabled:opacity-60"
            >
              {submitting ? "VERIFYING..." : "LOGIN"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-white border-4 border-black py-3 font-black shadow-[6px_6px_0px_#000]"
            >
              BACK TO HOME
            </button>
          </form>
        </div>
      </div>

      {showJoinRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div
            className="absolute inset-0"
            onClick={() => setShowJoinRequest(false)}
          />
          <div className="relative z-10 w-full max-w-5xl flex items-center justify-center">
            <AlumniJoinRequest onClose={() => setShowJoinRequest(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;