import React, { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  Clock,
  User,
  HandCoins,
  Users,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

const BASE_URL = "http://localhost:8080";

/* =============================
   Reusable Brutal Card
============================= */

const BrutalCard = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <div className="
      bg-blue-400
      border-4 border-black
      p-6
      shadow-[8px_8px_0px_#000]
      transition-all duration-150
      hover:translate-x-1 hover:translate-y-1
      hover:shadow-[4px_4px_0px_#000]
    ">
      <div className="flex items-center gap-3 mb-3">
        <Icon size={22} strokeWidth={2.5} />
        <p className="text-sm font-bold uppercase">{title}</p>
      </div>
      <h2 className="text-3xl font-black">{value}</h2>
      <p className="text-xs mt-2 font-medium">{subtitle}</p>
    </div>
  );
};

/* =============================
   Dashboard
============================= */

const UserDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [mentorship, setMentorship] = useState(null);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({
    totalDonations: "$0",
    eventsAttended: 0,
    mentorshipSessions: 0,
    upcomingEvents: 0,
    nextEventName: "—",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch mentorship requests (same endpoint used in MentorshipPage)
        const mentorRes = await fetch(`${BASE_URL}/api/mentorship/my-requests`);
        const mentorData = await mentorRes.json();

        // Pick the first upcoming/pending mentorship as "next session"
        if (mentorData && mentorData.length > 0) {
          const next = mentorData[0];
          setMentorship({
            date: next.date || next.scheduledDate || "TBD",
            time: next.time || next.scheduledTime || "TBD",
            studentName: next.studentName || next.requesterName || "Unknown",
            department: next.department || next.branch || "N/A",
          });
          setStats((prev) => ({
            ...prev,
            mentorshipSessions: mentorData.length,
          }));
        }
      } catch (err) {
        console.error("Mentorship fetch error:", err);
      }

      try {
        // Fetch events (same endpoint used in EventList)
        const eventsRes = await fetch(`${BASE_URL}/api/events`);
        const eventsData = await eventsRes.json();

        const upcoming = eventsData.filter(
          (e) => new Date(e.date || e.eventDate) >= new Date()
        );

        setStats((prev) => ({
          ...prev,
          eventsAttended: eventsData.length - upcoming.length,
          upcomingEvents: upcoming.length,
          nextEventName: upcoming[0]?.name || upcoming[0]?.title || "—",
        }));
      } catch (err) {
        console.error("Events fetch error:", err);
      }

      try {
        // Fetch donations if your backend has this route
        const donationsRes = await fetch(`${BASE_URL}/api/donations/my-donations`);
        const donationsData = await donationsRes.json();

        const total = Array.isArray(donationsData)
          ? donationsData.reduce((sum, d) => sum + (d.amount || 0), 0)
          : donationsData?.totalAmount || 0;

        setStats((prev) => ({
          ...prev,
          totalDonations: `$${total.toLocaleString()}`,
        }));
      } catch (err) {
        // Silently skip if endpoint doesn't exist yet
        console.warn("Donations endpoint not available:", err);
      }

      try {
        // Fetch notifications if your backend has this route
        const notifRes = await fetch(`${BASE_URL}/api/notifications`);
        const notifData = await notifRes.json();
        setNotifications(Array.isArray(notifData) ? notifData : []);
      } catch (err) {
        console.warn("Notifications endpoint not available:", err);
        setNotifications([]);
      }

      try {
        // Fetch dashboard message / announcement
        const msgRes = await fetch(`${BASE_URL}/api/announcements`);
        const msgData = await msgRes.json();

        // Handle both array response and single object
        if (Array.isArray(msgData) && msgData.length > 0) {
          setMessage(msgData[0].message || msgData[0].content || msgData[0].text || "");
        } else if (msgData?.message) {
          setMessage(msgData.message);
        }
      } catch (err) {
        console.warn("Announcements endpoint not available:", err);
      }

      setLoading(false);
    };

    fetchData();
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
        ALUMNI DASHBOARD
      </h1>

      {/* ================= TOP STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <BrutalCard
          title="Total Donations"
          value={stats.totalDonations}
          subtitle="Supporting student funds"
          icon={HandCoins}
        />
        <BrutalCard
          title="Events Attended"
          value={stats.eventsAttended}
          subtitle="Since graduation"
          icon={Users}
        />
        <BrutalCard
          title="Mentorship Sessions"
          value={stats.mentorshipSessions}
          subtitle="Active requests"
          icon={GraduationCap}
        />
        <BrutalCard
          title="Upcoming Events"
          value={stats.upcomingEvents}
          subtitle={`Next: ${stats.nextEventName}`}
          icon={Calendar}
        />
      </div>

      {/* ================= BOTTOM GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ===== Next Mentorship ===== */}
        <div className="
          bg-white
          border-4 border-black
          p-8
          shadow-[8px_8px_0px_#000]
        ">
          <h3 className="text-xl font-black mb-6 flex items-center gap-3">
            <Calendar size={22} strokeWidth={2.5} />
            NEXT MENTORSHIP
          </h3>

          {!mentorship ? (
            <p className="font-bold">No upcoming session</p>
          ) : (
            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-center gap-3">
                <Calendar size={18} />
                <span>{mentorship.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} />
                <span>{mentorship.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <User size={18} />
                <span>
                  {mentorship.studentName} ({mentorship.department})
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ===== Notifications ===== */}
        <div className="
          bg-blue-200
          border-4 border-black
          p-8
          shadow-[8px_8px_0px_#000]
        ">
          <h3 className="text-xl font-black mb-6 flex items-center gap-3">
            <Bell size={22} strokeWidth={2.5} />
            NOTIFICATIONS
          </h3>

          {notifications.length === 0 ? (
            <p className="font-bold">No notifications</p>
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

        {/* ===== Message / Announcement ===== */}
        <div className="
          bg-blue-400
          border-4 border-black
          p-8
          shadow-[8px_8px_0px_#000]
          lg:col-span-2
        ">
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

export default UserDashboard;