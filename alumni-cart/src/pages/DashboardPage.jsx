import React from "react";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import AlumniDashboard from "../components/dashboard/AlumniDashboard";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono bg-blue-50">
        <p className="text-xl font-black animate-pulse">LOADING...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  // Role still resolving
  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono bg-blue-50">
        <p className="text-xl font-black animate-pulse">LOADING ROLE...</p>
      </div>
    );
  }

  if (role === "ADMIN") return <AdminDashboard />;
  if (role === "ALUMNI") return <AlumniDashboard />;
  if (role === "STUDENT") return <StudentDashboard />;

  return (
    <div className="min-h-screen flex items-center justify-center font-mono">
      <p className="text-xl font-black text-red-600">UNKNOWN ROLE: "{role}"</p>
    </div>
  );
};

export default DashboardPage;