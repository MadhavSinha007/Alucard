import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AlumniPage from "./pages/AlumniPage";
import EventsPage from "./pages/EventsPage";
import MentorshipPage from "./pages/MentorshipPage";
import MessagesPage from "./pages/MessagesPage";
import DonationsPage from "./pages/DonationsPage";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";

import { useAuth } from "./hooks/useAuth";

const AppLayout = ({ children }) => (
  <div className="flex bg-black text-white min-h-screen">
    <Sidebar />
    <main className="flex-1 p-6">{children}</main>
  </div>
);

const App = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      {user && <Header />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}
        {user && (
          <>
            <Route
              path="/dashboard"
              element={
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              }
            />
            <Route
              path="/alumni"
              element={
                <AppLayout>
                  <AlumniPage />
                </AppLayout>
              }
            />
            <Route
              path="/events"
              element={
                <AppLayout>
                  <EventsPage />
                </AppLayout>
              }
            />
            <Route
              path="/mentorship"
              element={
                <AppLayout>
                  <MentorshipPage />
                </AppLayout>
              }
            />
            <Route
              path="/messages"
              element={
                <AppLayout>
                  <MessagesPage />
                </AppLayout>
              }
            />
            <Route
              path="/donations"
              element={
                <AppLayout>
                  <DonationsPage />
                </AppLayout>
              }
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;