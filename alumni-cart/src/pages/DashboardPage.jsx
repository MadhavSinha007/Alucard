import React from "react";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import AlumniDashboard from "../components/dashboard/AlumniDashboard";
import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div>
      {user.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <AlumniDashboard />
      )}
    </div>
  );
};

export default DashboardPage;