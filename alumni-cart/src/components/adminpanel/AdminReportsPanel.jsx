import React, { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Download,
  BarChart3,
  Wallet,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const REPORT_KEY = "fake_admin_reports";
const USER_KEY = "fake_admin_users";
const DONATION_KEY = "fake_donations";

const COLORS = [
  "#93c5fd",
  "#60a5fa",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#bfdbfe",
];

const Card = ({ title, value, subtitle, icon: Icon }) => (
  <div className="bg-blue-200 border-4 border-black p-5 shadow-[6px_6px_0px_#000]">
    <div className="flex items-center gap-3 mb-3">
      <Icon size={20} strokeWidth={2.5} />
      <p className="text-sm font-black uppercase">{title}</p>
    </div>
    <h3 className="text-3xl font-black">{value}</h3>
    <p className="text-xs font-bold mt-2">{subtitle}</p>
  </div>
);

const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString()}`;

const monthLabel = (dateStr) => {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "Unknown";
  return d.toLocaleString("en-US", { month: "short" });
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white border-4 border-black px-4 py-3 shadow-[4px_4px_0px_#000] font-mono">
      <p className="font-black text-sm mb-1">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="font-bold text-sm">
          {entry.name.toUpperCase()}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

const AdminReportsPanel = () => {
  const [message, setMessage] = useState("");

  const reports = JSON.parse(localStorage.getItem(REPORT_KEY) || "[]");
  const users = JSON.parse(localStorage.getItem(USER_KEY) || "[]");
  const donations = JSON.parse(localStorage.getItem(DONATION_KEY) || "[]");

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 2500);
    return () => clearTimeout(timer);
  }, [message]);

  const analytics = useMemo(() => {
    const totalUsers = users.length;
    const students = users.filter((u) => u.role === "student").length;
    const alumni = users.filter((u) => u.role === "alumni").length;
    const admins = users.filter((u) => u.role === "admin").length;

    const totalDonations = donations.reduce(
      (sum, d) => sum + Number(d.amount || 0),
      0
    );

    const avgDonation = donations.length
      ? Math.round(totalDonations / donations.length)
      : 0;

    const donationByMonthMap = {};
    donations.forEach((donation) => {
      const label = monthLabel(donation.createdAt);
      donationByMonthMap[label] =
        (donationByMonthMap[label] || 0) + Number(donation.amount || 0);
    });

    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const donationTrend = monthOrder
      .filter((m) => donationByMonthMap[m] !== undefined)
      .map((m) => ({
        month: m,
        amount: donationByMonthMap[m],
      }));

    const deptMap = {};
    users.forEach((user) => {
      const dept = user.department || "Unknown";
      deptMap[dept] = (deptMap[dept] || 0) + 1;
    });

    const departmentDistribution = Object.entries(deptMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

    const walletTrend = monthOrder.map((m) => ({
      month: m,
      incoming: donationByMonthMap[m] || 0,
      balance: monthOrder
        .slice(0, monthOrder.indexOf(m) + 1)
        .reduce((sum, month) => sum + (donationByMonthMap[month] || 0), 0),
    }));

    return {
      totalUsers,
      students,
      alumni,
      admins,
      totalDonations,
      avgDonation,
      donationTrend,
      departmentDistribution,
      walletTrend,
    };
  }, [users, donations]);

  const generateReport = (type) => {
    const summary =
      type === "USERS"
        ? `TOTAL USERS: ${analytics.totalUsers} · STUDENTS: ${analytics.students} · ALUMNI: ${analytics.alumni}`
        : type === "DONATIONS"
        ? `TOTAL DONATIONS: ${formatCurrency(
            analytics.totalDonations
          )} · AVERAGE: ${formatCurrency(analytics.avgDonation)}`
        : `WALLET BALANCE SNAPSHOT: ${formatCurrency(
            analytics.totalDonations
          )}`;

    const report = {
      id: `report_${Date.now()}`,
      type,
      createdAt: new Date().toISOString(),
      summary,
    };

    localStorage.setItem(REPORT_KEY, JSON.stringify([report, ...reports]));
    setMessage(`${type} REPORT GENERATED SUCCESSFULLY`);
  };

  const downloadReport = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      overview: {
        totalUsers: analytics.totalUsers,
        students: analytics.students,
        alumni: analytics.alumni,
        admins: analytics.admins,
        totalDonations: analytics.totalDonations,
        avgDonation: analytics.avgDonation,
      },
      donationTrend: analytics.donationTrend,
      walletTrend: analytics.walletTrend,
      departmentDistribution: analytics.departmentDistribution,
      recentReports: reports,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `admin-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setMessage("REPORT DOWNLOADED SUCCESSFULLY");
  };

  return (
    <div className="bg-blue-100 border-4 border-black p-8 shadow-[8px_8px_0px_#000] relative">
      {message && (
        <div className="fixed top-6 right-6 z-50 animate-[popIn_.25s_ease-out]">
          <div className="bg-green-300 border-4 border-black px-5 py-4 shadow-[8px_8px_0px_#000] font-mono flex items-center gap-3">
            <CheckCircle2 size={20} strokeWidth={2.5} />
            <span className="font-black text-sm">{message}</span>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes popIn {
            0% {
              transform: scale(0.85) translateY(-8px);
              opacity: 0;
            }
            100% {
              transform: scale(1) translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black">REPORTS & ANALYTICS</h2>
          <p className="font-bold text-sm mt-2">
            TRACK USERS, DONATIONS, WALLET FLOW, AND PLATFORM ACTIVITY
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => generateReport("USERS")}
            className="bg-blue-500 border-4 border-black px-5 py-3 font-black shadow-[4px_4px_0px_#000] flex items-center gap-2"
          >
            <Users size={16} strokeWidth={2.5} />
            USER REPORT
          </button>

          <button
            onClick={() => generateReport("DONATIONS")}
            className="bg-blue-500 border-4 border-black px-5 py-3 font-black shadow-[4px_4px_0px_#000] flex items-center gap-2"
          >
            <Wallet size={16} strokeWidth={2.5} />
            DONATION REPORT
          </button>

          <button
            onClick={() => generateReport("WALLET")}
            className="bg-blue-500 border-4 border-black px-5 py-3 font-black shadow-[4px_4px_0px_#000] flex items-center gap-2"
          >
            <TrendingUp size={16} strokeWidth={2.5} />
            WALLET REPORT
          </button>

          <button
            onClick={downloadReport}
            className="bg-white border-4 border-black px-5 py-3 font-black shadow-[4px_4px_0px_#000] flex items-center gap-2"
          >
            <Download size={16} strokeWidth={2.5} />
            DOWNLOAD
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Card
          title="Total Users"
          value={analytics.totalUsers}
          subtitle={`${analytics.students} students · ${analytics.alumni} alumni`}
          icon={Users}
        />
        <Card
          title="Wallet Balance"
          value={formatCurrency(analytics.totalDonations)}
          subtitle="Current donation-backed fund balance"
          icon={Wallet}
        />
        <Card
          title="Average Donation"
          value={formatCurrency(analytics.avgDonation)}
          subtitle="Average payment value"
          icon={BarChart3}
        />
        <Card
          title="Saved Reports"
          value={reports.length}
          subtitle="Generated and stored locally"
          icon={FileText}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000]">
          <h3 className="text-lg font-black mb-4">DONATION TREND</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.donationTrend}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="4 4" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#111827", fontSize: 12, fontWeight: 700 }}
                  axisLine={{ stroke: "#000" }}
                  tickLine={{ stroke: "#000" }}
                />
                <YAxis
                  tick={{ fill: "#111827", fontSize: 12, fontWeight: 700 }}
                  axisLine={{ stroke: "#000" }}
                  tickLine={{ stroke: "#000" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="amount"
                  name="Donations"
                  fill="#2563eb"
                  stroke="#000"
                  strokeWidth={2}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000]">
          <h3 className="text-lg font-black mb-4">WALLET GROWTH</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.walletTrend}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="4 4" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#111827", fontSize: 12, fontWeight: 700 }}
                  axisLine={{ stroke: "#000" }}
                  tickLine={{ stroke: "#000" }}
                />
                <YAxis
                  tick={{ fill: "#111827", fontSize: 12, fontWeight: 700 }}
                  axisLine={{ stroke: "#000" }}
                  tickLine={{ stroke: "#000" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="balance"
                  name="Wallet"
                  stroke="#1d4ed8"
                  strokeWidth={4}
                  dot={{ r: 5, fill: "#60a5fa", stroke: "#000", strokeWidth: 2 }}
                  activeDot={{ r: 7, fill: "#2563eb", stroke: "#000", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000]">
          <h3 className="text-lg font-black mb-4">DEPARTMENT DISTRIBUTION</h3>
          <div className="h-72">
            {analytics.departmentDistribution.length === 0 ? (
              <div className="h-full flex items-center justify-center font-black">
                NO USER DATA AVAILABLE
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.departmentDistribution}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                    innerRadius={45}
                    label
                    stroke="#000"
                    strokeWidth={2}
                  >
                    {analytics.departmentDistribution.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      return (
                        <div className="bg-white border-4 border-black px-4 py-3 shadow-[4px_4px_0px_#000] font-mono">
                          <p className="font-black text-sm">
                            {payload[0].name.toUpperCase()}
                          </p>
                          <p className="font-bold text-sm">
                            USERS: {payload[0].value}
                          </p>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_#000]">
          <h3 className="text-lg font-black mb-4">RECENT REPORTS</h3>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {reports.length === 0 ? (
              <div className="bg-blue-50 border-4 border-black p-4 font-black">
                NO REPORTS GENERATED YET.
              </div>
            ) : (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-blue-50 border-4 border-black p-4 shadow-[3px_3px_0px_#000]"
                >
                  <p className="font-black">{report.type} REPORT</p>
                  <p className="font-bold text-sm mt-2">{report.summary}</p>
                  <p className="font-bold text-xs mt-2 text-gray-700">
                    {new Date(report.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPanel;