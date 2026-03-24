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
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      const fetchedRole = data?.role?.toUpperCase() || null;

      setRole(fetchedRole);
      return fetchedRole;
    } catch (err) {
      console.error(err);
      setRole(null);
      return null;
    }
  };

  const login = async (firebaseUser) => {
    setUser(firebaseUser);
    setLoading(true);

    const fetchedRole = await fetchRole(firebaseUser);

    setLoading(false);
    return fetchedRole;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
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

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);