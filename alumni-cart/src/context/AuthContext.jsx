import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = async (firebaseUser) => {
    try {
      const token = await firebaseUser.getIdToken();

      const res = await fetch("http://localhost:8080/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch role");

      const data = await res.json();

      if (data?.role) {
        setRole(data.role);
      } else {
        setRole(null);
      }
    } catch (err) {
      console.error("Role fetch error:", err);
      setRole(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (firebaseUser) {
        setUser(firebaseUser);
        await fetchRole(firebaseUser);
      } else {
        setUser(null);
        setRole(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (firebaseUser) => {
    setUser(firebaseUser);
    await fetchRole(firebaseUser);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};