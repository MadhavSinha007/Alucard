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

  useEffect(() => {
    // 🔥 Replace endpoints with your real backend routes
    const fetchData = async () => {
      try {
        const [notifRes, mentorRes, messageRes] = await Promise.all([
          fetch("/api/notifications"),
          fetch("/api/next-mentorship"),
          fetch("/api/dashboard-message"),
        ]);

        const notifData = await notifRes.json();
        const mentorData = await mentorRes.json();
        const messageData = await messageRes.json();

        setNotifications(notifData);
        setMentorship(mentorData);
        setMessage(messageData.message);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6 sm:p-10 font-mono">
      <h1 className="text-4xl font-black mb-12 border-b-4 border-black inline-block">
        ALUMNI DASHBOARD
      </h1>

      {/* ================= TOP STATS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <BrutalCard
          title="Total Donations"
          value="$2,450"
          subtitle="Supporting student funds"
          icon={HandCoins}
        />
        <BrutalCard
          title="Events Attended"
          value="8"
          subtitle="Since graduation"
          icon={Users}
        />
        <BrutalCard
          title="Mentorship Sessions"
          value="14"
          subtitle="Guided 5 students"
          icon={GraduationCap}
        />
        <BrutalCard
          title="Upcoming Events"
          value="2"
          subtitle="Next: Alumni Meetup"
          icon={Calendar}
        />
      </div>

      {/* ================= BOTTOM GRID ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ===== Mentorship (Dynamic) ===== */}
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

        {/* ===== Notifications (Dynamic) ===== */}
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
              {notifications.map((note) => (
                <li
                  key={note.id}
                  className="
                    bg-white
                    border-2 border-black
                    p-4
                    shadow-[4px_4px_0px_#000]
                  "
                >
                  {note.message}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ===== Message For You (Dynamic) ===== */}
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
            {message || "No message available."}
          </p>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
