import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AlumniPage from "./pages/AlumniPage";
import EventsPage from "./pages/EventsPage";
import MentorshipPage from "./pages/MentorshipPage";
import MessagesPage from "./pages/MessagesPage";
import DonationsPage from "./pages/DonationsPage";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

/* =============================
   Layouts
============================= */

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-white text-black flex flex-col">
    <Header />
    <main className="flex-1">{children}</main>
  </div>
);

const ProtectedLayout = ({ children }) => (
  <div className="flex bg-white text-black h-screen overflow-hidden">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  </div>
);

/* =============================
   Route Guards
============================= */

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen font-mono font-black text-xl">
        LOADING...
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  return <ProtectedLayout>{children}</ProtectedLayout>;
};

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen font-mono font-black text-xl">
        LOADING...
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  if (!role)
    return (
      <div className="flex items-center justify-center h-screen font-mono font-black text-xl">
        LOADING...
      </div>
    );

  if (!allowedRoles.includes(role)) {
    if (role === "ADMIN") return <Navigate to="/dashboard" replace />;
    if (role === "ALUMNI") return <Navigate to="/alumni" replace />;
    return <Navigate to="/login" replace />;
  }

  return <ProtectedLayout>{children}</ProtectedLayout>;
};

/* =============================
   App
============================= */

function App() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen font-mono font-black text-xl">
        LOADING...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route path="/login" element={<LoginPage />} />

        {/* AUTO REDIRECT AFTER LOGIN */}
        <Route
          path="/"
          element={
            user ? (
              role === "ADMIN" ? (
                <Navigate to="/dashboard" replace />
              ) : role === "ALUMNI" ? (
                <Navigate to="/alumni" replace />
              ) : (
                <HomePage />
              )
            ) : (
              <HomePage />
            )
          }
        />

        {/* ADMIN */}
        <Route
          path="/dashboard"
          element={
            <RoleRoute allowedRoles={["ADMIN"]}>
              <DashboardPage />
            </RoleRoute>
          }
        />

        {/* ALUMNI */}
        <Route
          path="/alumni"
          element={
            <RoleRoute allowedRoles={["ALUMNI"]}>
              <AlumniPage />
            </RoleRoute>
          }
        />

        {/* SHARED */}
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentorship"
          element={
            <ProtectedRoute>
              <MentorshipPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donations"
          element={
            <ProtectedRoute>
              <DonationsPage />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;