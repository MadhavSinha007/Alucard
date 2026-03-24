import React from "react";
import AdminDashboard from "../components/dashboard/AdminDashboard";
import AlumniDashboard from "../components/dashboard/AlumniDashboard";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) return null;

  const role = user.role?.toUpperCase();

  if (role === "ADMIN") {
    return <AdminDashboard />;
  }

  if (role === "ALUMNI") {
    return <AlumniDashboard />;
  }

  if (role === "STUDENT") {
    return <StudentDashboard />;
  }

  return <div>INVALID ROLE</div>;
};

export default DashboardPage; 