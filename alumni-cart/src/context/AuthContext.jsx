import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (firebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();
      console.log("✅ Got token, fetching /api/users/me...");

      const res = await fetch("http://localhost:8080/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ /me response status:", res.status);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      console.log("✅ userData:", data);

      setUserData(data);
      setRole(data?.role?.toUpperCase() || null);
    } catch (err) {
      console.error("❌ fetchUserData error:", err);
      setUserData(null);
      setRole(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("🔥 onAuthStateChanged fired, user:", firebaseUser?.email);

      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchUserData(firebaseUser); // await so loading turns off AFTER data
      } else {
        setUser(null);
        setUserData(null);
        setRole(null);
      }

      setLoading(false); // always runs after everything
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserData(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, userData, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };