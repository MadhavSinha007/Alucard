import React, { useEffect, useState } from "react";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Bell,
  Megaphone,
} from "lucide-react";

const BASE_URL = "http://localhost:8080";

/* =============================
   Reusable Brutal Card
============================= */

const AdminCard = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <div className="
      bg-blue-400
      border-4 border-black
      p-8
      shadow-[10px_10px_0px_#000]
      transition-all duration-150
      hover:translate-x-1 hover:translate-y-1
      hover:shadow-[5px_5px_0px_#000]
    ">
      <div className="flex items-center gap-3 mb-4">
        <Icon size={22} strokeWidth={2.5} />
        <p className="text-sm font-bold uppercase">{title}</p>
      </div>
      <h2 className="text-4xl font-black">{value}</h2>
      <p className="text-xs mt-3 font-medium">{subtitle}</p>
    </div>
  );
};

/* =============================
   Admin Dashboard
============================= */

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [announcement, setAnnouncement] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);

      // --- Stats ---
      try {
        const statsRes = await fetch(`${BASE_URL}/api/admin/stats`);
        const statsData = await statsRes.json();
        setStats(statsData);
      } catch (err) {
        console.warn("Admin stats fetch error:", err);
      }

      // --- Recent Users ---
      try {
        const usersRes = await fetch(`${BASE_URL}/api/admin/recent-users`);
        const usersData = await usersRes.json();
        setRecentUsers(Array.isArray(usersData) ? usersData : []);
      } catch (err) {
        console.warn("Recent users fetch error:", err);
      }

      // --- Notifications ---
      try {
        const notifRes = await fetch(`${BASE_URL}/api/admin/notifications`);
        const notifData = await notifRes.json();
        setNotifications(Array.isArray(notifData) ? notifData : []);
      } catch (err) {
        console.warn("Admin notifications fetch error:", err);
      }

      // --- Announcement ---
      try {
        const announceRes = await fetch(`${BASE_URL}/api/announcements`);
        const announceData = await announceRes.json();

        if (Array.isArray(announceData) && announceData.length > 0) {
          setAnnouncement(
            announceData[0].message ||
            announceData[0].content ||
            announceData[0].text ||
            ""
          );
        } else if (announceData?.message) {
          setAnnouncement(announceData.message);
        }
      } catch (err) {
        console.warn("Announcement fetch error:", err);
      }

      setLoading(false);
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 p-6 sm:p-10 font-mono flex items-center justify-center">
        <p className="text-xl font-black animate-pulse">LOADING DASHBOARD...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6 sm:p-10 font-mono">
      <h1 className="text-4xl font-black mb-12 border-b-4 border-black inline-block">
        ADMIN DASHBOARD
      </h1>

      {/* ================= TOP STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <AdminCard
          title="Total Users"
          value={stats?.totalUsers ?? stats?.userCount ?? "—"}
          subtitle="+8% this month"
          icon={Users}
        />
        <AdminCard
          title="Active Orders"
          value={stats?.activeOrders ?? stats?.orderCount ?? "—"}
          subtitle="Updated today"
          icon={ShoppingCart}
        />
        <AdminCard
          title="Revenue"
          value={
            stats?.revenue
              ? `$${Number(stats.revenue).toLocaleString()}`
              : stats?.totalRevenue
              ? `$${Number(stats.totalRevenue).toLocaleString()}`
              : "—"
          }
          subtitle="+12% from last month"
          icon={DollarSign}
        />
      </div>

      {/* ================= LOWER GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ===== Recent Users ===== */}
        <div className="
          bg-white
          border-4 border-black
          p-8
          shadow-[8px_8px_0px_#000]
        ">
          <h3 className="text-xl font-black mb-6 flex items-center gap-3">
            <Users size={22} strokeWidth={2.5} />
            RECENT USERS
          </h3>

          {recentUsers.length === 0 ? (
            <p className="font-bold">No new users</p>
          ) : (
            <ul className="space-y-4 text-sm font-medium">
              {recentUsers.map((user, idx) => (
                <li
                  key={user.id ?? idx}
                  className="
                    bg-blue-200
                    border-2 border-black
                    p-4
                    shadow-[4px_4px_0px_#000]
                  "
                >
                  {user.name ?? user.fullName ?? user.username ?? "Unknown"}{" "}
                  — {user.email ?? "No email"}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ===== Admin Notifications ===== */}
        <div className="
          bg-blue-200
          border-4 border-black
          p-8
          shadow-[8px_8px_0px_#000]
        ">
          <h3 className="text-xl font-black mb-6 flex items-center gap-3">
            <Bell size={22} strokeWidth={2.5} />
            SYSTEM NOTIFICATIONS
          </h3>

          {notifications.length === 0 ? (
            <p className="font-bold">No alerts</p>
          ) : (
            <ul className="space-y-4 text-sm font-medium">
              {notifications.map((note, idx) => (
                <li
                  key={note.id ?? idx}
                  className="
                    bg-white
                    border-2 border-black
                    p-4
                    shadow-[4px_4px_0px_#000]
                  "
                >
                  {note.message || note.content || note.text}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ===== Announcement ===== */}
        <div className="
          bg-blue-400
          border-4 border-black
          p-8
          shadow-[8px_8px_0px_#000]
          lg:col-span-2
        ">
          <h3 className="text-xl font-black mb-4 flex items-center gap-3">
            <Megaphone size={22} strokeWidth={2.5} />
            ADMIN ANNOUNCEMENT
          </h3>

          <p className="text-sm font-medium leading-relaxed">
            {announcement || "No announcement available."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;