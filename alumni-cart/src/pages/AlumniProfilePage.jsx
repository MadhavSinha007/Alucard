import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Building2,
  GraduationCap,
  Mail,
  Phone,
  Briefcase,
  Link as LinkIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://localhost:8080";

const AlumniProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userData, role } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) return;

    const fetchProfile = async () => {
      try {
        const token = await user.getIdToken();
        let res;

        // preferred endpoint for your current backend
        res = await fetch(`${BASE_URL}/api/alumni/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // fallback
        if (!res.ok) {
          res = await fetch(`${BASE_URL}/api/alumni/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, id]);

  const normalizedRole = role?.toUpperCase?.() || userData?.role?.toUpperCase?.();
  const canEdit =
    normalizedRole === "ADMIN" ||
    (normalizedRole === "ALUMNI" && (userData?.uid === id || user?.uid === id));

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

  const fullName = profile.fullName || profile.name || "Unknown";
  const batch = profile.batch || profile.graduationYear || "—";
  const department = profile.department || profile.branch || "—";
  const designation = profile.designation || profile.currentRole || profile.role;
  const company = profile.currentCompany || profile.company;
  const expertise = profile.skills || profile.expertise || profile.designation || "";
  const donations = Number(profile.totalDonation || 0).toLocaleString();

  return (
    <div className="min-h-screen bg-blue-50 font-mono p-6 sm:p-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 font-black text-sm mb-8 hover:underline"
      >
        <ArrowLeft size={16} strokeWidth={2.5} /> BACK TO DIRECTORY
      </button>

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-blue-300 border-4 border-black p-8 shadow-[8px_8px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-24 h-24 bg-blue-500 border-4 border-black flex items-center justify-center font-black text-4xl shadow-[4px_4px_0px_#000] flex-shrink-0">
            {fullName[0]?.toUpperCase() || "?"}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-black mb-1">
              {fullName.toUpperCase()}
            </h1>

            <p className="font-bold text-sm text-gray-700 mb-2">
              BATCH {batch} · {department}
            </p>

            {designation && (
              <div className="inline-block bg-white border-2 border-black px-3 py-1 text-xs font-black shadow-[2px_2px_0px_#000]">
                {designation.toUpperCase()}
              </div>
            )}

            {company && (
              <p className="font-bold text-sm mt-3">
                {company}
              </p>
            )}
          </div>

          {canEdit && (
            <button
              onClick={() => navigate(`/alumni/${id}/edit`)}
              className="flex items-center gap-2 bg-yellow-300 border-4 border-black px-5 py-2 font-black text-sm shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all flex-shrink-0"
            >
              <Pencil size={14} strokeWidth={2.5} /> EDIT
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {company && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase">
                <Building2 size={14} strokeWidth={2.5} /> Current Company
              </div>
              <p className="font-bold">{company}</p>
            </div>
          )}

          {department && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase">
                <GraduationCap size={14} strokeWidth={2.5} /> Department
              </div>
              <p className="font-bold">{department}</p>
            </div>
          )}

          {profile.email && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000]">
              <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase">
                <Mail size={14} strokeWidth={2.5} /> Email
              </div>
              <p className="font-bold break-all">{profile.email}</p>
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

          {profile.linkedInUrl && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] sm:col-span-2">
              <div className="flex items-center gap-2 mb-2 font-black text-xs uppercase">
                <LinkIcon size={14} strokeWidth={2.5} /> LinkedIn
              </div>
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline break-all"
              >
                {profile.linkedInUrl}
              </a>
            </div>
          )}

          {expertise && (
            <div className="bg-blue-200 border-4 border-black p-6 shadow-[6px_6px_0px_#000] sm:col-span-2">
              <div className="flex items-center gap-2 mb-3 font-black text-xs uppercase">
                <Briefcase size={14} strokeWidth={2.5} /> Skills / Expertise
              </div>

              <div className="flex flex-wrap gap-2">
                {String(expertise)
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((skill, i) => (
                    <span
                      key={i}
                      className="bg-white border-2 border-black px-3 py-1 text-xs font-black shadow-[2px_2px_0px_#000]"
                    >
                      {skill.toUpperCase()}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {profile.bio && (
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_#000] sm:col-span-2">
              <p className="font-black text-xs uppercase mb-3">BIO</p>
              <p className="font-medium text-sm leading-relaxed">
                {profile.bio}
              </p>
            </div>
          )}
        </div>

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
            <p className="text-3xl font-black">₹{donations}</p>
            <p className="text-xs font-bold mt-1">DONATED</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfilePage;