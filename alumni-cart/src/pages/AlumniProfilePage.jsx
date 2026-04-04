import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Building2, GraduationCap, Mail, Phone, Briefcase } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://localhost:8080";

const AlumniProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userData, role } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${BASE_URL}/api/alumni/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user, id]);

  // Can edit if ADMIN or if this is your own profile
  const canEdit =
    role === "ADMIN" ||
    (role === "ALUMNI" && (userData?.uid === id || user?.uid === id));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono">
        <p className="text-xl font-black animate-pulse">LOADING PROFILE...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono">
        <div className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_#000] text-center">
          <p className="text-xl font-black mb-4">PROFILE NOT FOUND</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-300 border-4 border-black px-6 py-2 font-black shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all"
          >
            GO BACK
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 font-mono p-6 sm:p-10">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 font-black text-sm mb-8 hover:underline"
      >
        <ArrowLeft size={16} strokeWidth={2.5} /> BACK TO DIRECTORY
      </button>

      <div className="max-w-3xl mx-auto space-y-8">

        {/* Hero Card */}
        <div className="bg-blue-300 border-4 border-black p-8 shadow-[8px_8px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-blue-500 border-4 border-black flex items-center justify-center font-black text-4xl shadow-[4px_4px_0px_#000] flex-shrink-0">
            {(profile.fullName || profile.name || "?")[0].toUpperCase()}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-black mb-1">
              {(profile.fullName || profile.name || "UNKNOWN").toUpperCase()}
            </h1>
            <p className="font-bold text-sm text-gray-700 mb-2">
              BATCH {profile.batch || profile.graduationYear || "—"} · {profile.department || profile.branch || "—"}
            </p>
            {(profile.designation || profile.currentRole) && (
              <div className="inline-block bg-white border-2 border-black px-3 py-1 text-xs font-black shadow-[2px_2px_0px_#000]">
                {(profile.designation || profile.currentRole).toUpperCase()}
              </div>
            )}
          </div>

          {canEdit && (
            <button
              onClick={() => navigate(`/alumni/${id}/edit`)}
              className="
                flex items-center gap-2
                bg-yellow-300 border-4 border-black
                px-5 py-2 font-black text-sm
                shadow-[4px_4px_0px_#000]
                hover:translate-x-1 hover:translate-y-1
                hover:shadow-[2px_2px_0px_#000]
                transition-all flex-shrink-0
              "
            >
              <Pencil size={14} strokeWidth={2.5} /> EDIT
            </button>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {(profile.currentCompany || profile.company) && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase">
                <Building2 size={14} strokeWidth={2.5} /> Current Company
              </div>
              <p className="font-bold">{profile.currentCompany || profile.company}</p>
            </div>
          )}

          {(profile.department || profile.branch) && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase">
                <GraduationCap size={14} strokeWidth={2.5} /> Department
              </div>
              <p className="font-bold">{profile.department || profile.branch}</p>
            </div>
          )}

          {profile.email && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase">
                <Mail size={14} strokeWidth={2.5} /> Email
              </div>
              <p className="font-bold">{profile.email}</p>
            </div>
          )}

          {profile.phone && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase">
                <Phone size={14} strokeWidth={2.5} /> Phone
              </div>
              <p className="font-bold">{profile.phone}</p>
            </div>
          )}

          {(profile.skills || profile.expertise) && (
            <div className="bg-blue-200 border-4 border-black p-6 shadow-[6px_6px_0px_#000] sm:col-span-2">
              <div className="flex items-center gap-2 mb-3 font-black text-xs uppercase">
                <Briefcase size={14} strokeWidth={2.5} /> Skills / Expertise
              </div>
              <div className="flex flex-wrap gap-2">
                {(profile.skills || profile.expertise || "")
                  .split(",")
                  .map((s, i) => s.trim())
                  .filter(Boolean)
                  .map((skill, i) => (
                    <span key={i} className="bg-white border-2 border-black px-3 py-1 text-xs font-black shadow-[2px_2px_0px_#000]">
                      {skill.toUpperCase()}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {profile.bio && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] sm:col-span-2">
              <p className="font-black text-xs uppercase mb-3">BIO</p>
              <p className="font-medium text-sm leading-relaxed">{profile.bio}</p>
            </div>
          )}

        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-blue-400 border-4 border-black p-6 shadow-[6px_6px_0px_#000] text-center">
            <p className="text-3xl font-black">{profile.eventAttended || 0}</p>
            <p className="text-xs font-bold mt-1">EVENTS</p>
          </div>
          <div className="bg-blue-400 border-4 border-black p-6 shadow-[6px_6px_0px_#000] text-center">
            <p className="text-3xl font-black">{profile.mentorshipSession || 0}</p>
            <p className="text-xs font-bold mt-1">MENTORSHIPS</p>
          </div>
          <div className="bg-blue-400 border-4 border-black p-6 shadow-[6px_6px_0px_#000] text-center">
            <p className="text-3xl font-black">₹{Number(profile.totalDonation || 0).toLocaleString()}</p>
            <p className="text-xs font-bold mt-1">DONATED</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AlumniProfilePage;