import React, { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  HandCoins,
  GraduationCap,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const BASE_URL = "http://localhost:8080";

const BrutalCard = ({ title, value, subtitle, icon: Icon }) => (
  <div
    className="
      bg-blue-400 border-4 border-black p-6
      shadow-[8px_8px_0px_#000]
      transition-all duration-150
      hover:translate-x-1 hover:translate-y-1
      hover:shadow-[4px_4px_0px_#000]
    "
  >
    <div className="flex items-center gap-3 mb-3">
      <Icon size={22} strokeWidth={2.5} />
      <p className="text-sm font-bold uppercase">{title}</p>
    </div>
    <h2 className="text-3xl font-black">{value}</h2>
    <p className="text-xs mt-2 font-medium">{subtitle}</p>
  </div>
);

const StudentDashboard = () => {
  const { user, userData } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    totalDonations: "₹0",
    eventsAttended: 0,
    mentorshipSessions: 0,
    requestUpdates: 0,
  });

  useEffect(() => {
    if (!userData) return;

    setStats((prev) => ({
      ...prev,
      totalDonations: `₹${Number(userData.totalDonation || 0).toLocaleString()}`,
      eventsAttended: Number(userData.eventAttended || 0),
      mentorshipSessions: Number(userData.mentorshipSession || 0),
      requestUpdates: Number(userData.requestUpdates || 0),
    }));
  }, [userData]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const token = await user.getIdToken();

        // Notifications
        try {
          const res = await fetch(`${BASE_URL}/api/notifications`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          const safeNotifications = Array.isArray(data) ? data : [];
          setNotifications(safeNotifications);

          setStats((prev) => ({
            ...prev,
            requestUpdates:
              Number(userData?.requestUpdates || 0) || safeNotifications.length,
          }));
        } catch {
          setNotifications([]);
        }

        // Announcements
        try {
          const res = await fetch(`${BASE_URL}/api/announcements`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();

          if (Array.isArray(data) && data.length > 0) {
            setMessage(data[0].message || data[0].content || data[0].text || "");
          } else if (data?.message) {
            setMessage(data.message);
          }
        } catch {}

        // Optional: pull mentorship request count if available
        try {
          const res = await fetch(`${BASE_URL}/api/mentorship/my-requests`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();

          if (Array.isArray(data)) {
            setStats((prev) => ({
              ...prev,
              requestUpdates:
                Number(userData?.requestUpdates || 0) || data.length || prev.requestUpdates,
            }));
          }
        } catch {}
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }

      setLoading(false);
    };

    fetchData();
  }, [user, userData]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono">
        <p className="text-xl font-black animate-pulse">LOADING USER...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono">
        <p className="text-xl font-black animate-pulse">LOADING DASHBOARD...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6 sm:p-10 font-mono">
      <h1 className="text-4xl font-black mb-12 border-b-4 border-black inline-block">
        STUDENT DASHBOARD
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <BrutalCard
          title="Total Donations"
          value={stats.totalDonations}
          subtitle="Scholarships & support received"
          icon={HandCoins}
        />
        <BrutalCard
          title="Events Attended"
          value={stats.eventsAttended}
          subtitle="Campus & alumni events joined"
          icon={Calendar}
        />
        <BrutalCard
          title="Mentorship Sessions"
          value={stats.mentorshipSessions}
          subtitle="Sessions completed"
          icon={GraduationCap}
        />
        <BrutalCard
          title="Request Updates"
          value={stats.requestUpdates}
          subtitle="Requests / updates tracked"
          icon={RefreshCw}
        />
      </div>

      {/* LOWER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications */}
        <div className="bg-blue-200 border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
          <h3 className="text-xl font-black mb-6 flex items-center gap-3">
            <Bell size={22} strokeWidth={2.5} />
            NOTIFICATIONS
          </h3>

          {notifications.length === 0 ? (
            <p className="font-bold">No notifications</p>
          ) : (
            <ul className="space-y-3">
              {notifications.map((n, i) => (
                <li
                  key={n.id ?? i}
                  className="bg-white border-2 border-black p-3 text-sm font-medium shadow-[3px_3px_0px_#000]"
                >
                  {n.message || n.content || n.text}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Request Updates Summary */}
        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
          <h3 className="text-xl font-black mb-6 flex items-center gap-3">
            <RefreshCw size={22} strokeWidth={2.5} />
            REQUEST UPDATES
          </h3>

          <div className="space-y-3 text-sm font-medium">
            <p>Total tracked updates: {stats.requestUpdates}</p>
            <p>Latest notifications: {notifications.length}</p>
            <p>Keep checking for mentorship, event, and donation updates.</p>
          </div>
        </div>

        {/* Announcement */}
        <div className="bg-blue-400 border-4 border-black p-8 shadow-[8px_8px_0px_#000] lg:col-span-2">
          <h3 className="text-xl font-black mb-4 flex items-center gap-3">
            <MessageSquare size={22} strokeWidth={2.5} />
            MESSAGE FOR YOU
          </h3>

          <p className="text-sm font-medium leading-relaxed">
            {message || "No announcements at this time."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;