import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";
import MentorshipPage from "./pages/MentorshipPage";
import MessagesPage from "./pages/MessagesPage";
import DonationsPage from "./pages/DonationsPage";
import AlumniPage from "./pages/AlumniPage";
import AlumniProfilePage from "./pages/AlumniProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

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

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen font-mono font-black text-xl animate-pulse">
        LOADING...
      </div>
    );
  if (!user) return <Navigate to="/login" replace />;
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen font-mono font-black text-xl animate-pulse">
        LOADING...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            !user
              ? <MainLayout><HomePage /></MainLayout>
              : <Navigate to="/dashboard" replace />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />

        {/* DASHBOARD — DashboardPage renders correct component by role */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* ALUMNI DIRECTORY + PROFILE + EDIT */}
        <Route
          path="/alumni"
          element={
            <ProtectedRoute>
              <AlumniPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alumni/:id"
          element={
            <ProtectedRoute>
              <AlumniProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alumni/:id/edit"
          element={
            <ProtectedRoute>
              <EditProfilePage />
            </ProtectedRoute>
          }
        />

        {/* SHARED PROTECTED */}
        <Route path="/events"     element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
        <Route path="/mentorship" element={<ProtectedRoute><MentorshipPage /></ProtectedRoute>} />
        <Route path="/messages"   element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
        <Route path="/donations"  element={<ProtectedRoute><DonationsPage /></ProtectedRoute>} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;