import React, { useMemo } from "react";
import { Users, GraduationCap, HandCoins, FileText } from "lucide-react";

const USER_KEY = "fake_admin_users";
const DONATION_KEY = "fake_donations";
const REPORT_KEY = "fake_admin_reports";

const StatCard = ({ title, value, subtitle, icon: Icon }) => (
  <div className="bg-blue-400 border-4 border-black p-6 shadow-[8px_8px_0px_#000]">
    <div className="flex items-center gap-3 mb-3">
      <Icon size={22} strokeWidth={2.5} />
      <p className="text-sm font-black uppercase">{title}</p>
    </div>
    <h2 className="text-3xl font-black">{value}</h2>
    <p className="text-xs mt-2 font-bold">{subtitle}</p>
  </div>
);

const AdminOverview = () => {
  const users = JSON.parse(localStorage.getItem(USER_KEY) || "[]");
  const donations = JSON.parse(localStorage.getItem(DONATION_KEY) || "[]");
  const reports = JSON.parse(localStorage.getItem(REPORT_KEY) || "[]");

  const totals = useMemo(() => {
    const totalDonation = donations.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const studentCount = users.filter((u) => u.role === "student").length;
    const alumniCount = users.filter((u) => u.role === "alumni").length;

    return {
      totalUsers: users.length,
      totalDonation,
      studentCount,
      alumniCount,
      reportCount: reports.length,
    };
  }, [users, donations, reports]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
      <StatCard
        title="Total Users"
        value={totals.totalUsers}
        subtitle={`${totals.studentCount} students · ${totals.alumniCount} alumni`}
        icon={Users}
      />
      <StatCard
        title="Total Donations"
        value={`₹${totals.totalDonation.toLocaleString()}`}
        subtitle="Tracked from payment activity"
        icon={HandCoins}
      />
      <StatCard
        title="Alumni Network"
        value={totals.alumniCount}
        subtitle="Registered alumni users"
        icon={GraduationCap}
      />
      <StatCard
        title="Reports"
        value={totals.reportCount}
        subtitle="Generated admin reports"
        icon={FileText}
      />
    </div>
  );
};

export default AdminOverview;