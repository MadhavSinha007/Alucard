import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

import { useAuth } from "./hooks/useAuth";


// 🔹 Layout with Header only (Home page)
const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-white text-black flex flex-col">
    <Header />
    <main className="flex-1">{children}</main>
  </div>
);


// 🔹 Layout with Header + Sidebar (Protected pages)
const ProtectedLayout = ({ children }) => (
  <div className="flex bg-white text-black h-screen overflow-hidden">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  </div>
);


// 🔐 Route Guard
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <ProtectedLayout>{children}</ProtectedLayout>;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Home with Header */}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        {/* Login (NO HEADER) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alumni"
          element={
            <ProtectedRoute>
              <AlumniPage />
            </ProtectedRoute>
          }
        />
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;