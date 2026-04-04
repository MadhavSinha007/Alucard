import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://localhost:8080";

const EditProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, userData, role } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    department: "",
    batch: "",
    designation: "",
    currentCompany: "",
    phone: "",
    bio: "",
    skills: "",
    linkedIn: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Guard — only ADMIN or own profile
  const canEdit =
    role === "ADMIN" ||
    (role === "ALUMNI" && (userData?.uid === id || user?.uid === id));

  useEffect(() => {
    if (!user) return;
    if (!canEdit) {
      navigate(-1);
      return;
    }
    const fetchProfile = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch(`${BASE_URL}/api/alumni/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setForm({
          fullName:       data.fullName       || data.name        || "",
          department:     data.department     || data.branch      || "",
          batch:          data.batch          || data.graduationYear || "",
          designation:    data.designation    || data.currentRole || "",
          currentCompany: data.currentCompany || data.company     || "",
          phone:          data.phone          || "",
          bio:            data.bio            || "",
          skills:         data.skills         || data.expertise   || "",
          linkedIn:       data.linkedIn       || data.linkedin    || "",
        });
      } catch (err) {
        console.error("Fetch profile error:", err);
        setError("FAILED TO LOAD PROFILE");
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user, id, canEdit]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`${BASE_URL}/api/alumni/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSuccess(true);
      setTimeout(() => navigate(`/alumni/${id}`), 1200);
    } catch (err) {
      console.error("Save error:", err);
      setError("FAILED TO SAVE — TRY AGAIN");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono">
        <p className="text-xl font-black animate-pulse">LOADING...</p>
      </div>
    );
  }

  const Field = ({ label, name, type = "text", placeholder }) => (
    <div>
      <label className="block font-black text-xs mb-2 uppercase">{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder || label}
        className="w-full border-4 border-black px-4 py-3 font-bold bg-white focus:outline-none focus:bg-blue-50 shadow-[3px_3px_0px_#000]"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50 font-mono p-6 sm:p-10">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 font-black text-sm mb-8 hover:underline"
      >
        <ArrowLeft size={16} strokeWidth={2.5} /> BACK
      </button>

      <div className="max-w-2xl mx-auto">

        <div className="inline-block bg-yellow-300 border-4 border-black px-6 py-4 shadow-[6px_6px_0px_#000] mb-8">
          <h1 className="text-2xl font-black">EDIT PROFILE</h1>
          {role === "ADMIN" && user?.uid !== id && (
            <p className="text-xs font-bold mt-1">EDITING AS ADMIN</p>
          )}
        </div>

        {error && (
          <div className="bg-red-400 border-4 border-black p-4 font-black text-sm mb-6 shadow-[4px_4px_0px_#000]">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-400 border-4 border-black p-4 font-black text-sm mb-6 shadow-[4px_4px_0px_#000]">
            ✅ SAVED! REDIRECTING...
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_#000] space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Full Name"       name="fullName"       placeholder="ARJUN SHARMA" />
            <Field label="Department"      name="department"     placeholder="COMPUTER SCIENCE" />
            <Field label="Batch Year"      name="batch"          placeholder="2020" />
            <Field label="Designation"     name="designation"    placeholder="SOFTWARE ENGINEER" />
            <Field label="Current Company" name="currentCompany" placeholder="GOOGLE" />
            <Field label="Phone"           name="phone"          type="tel" placeholder="+91 XXXXXXXXXX" />
          </div>

          <div>
            <label className="block font-black text-xs mb-2 uppercase">Skills / Expertise</label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="REACT, NODE.JS, PYTHON (COMMA SEPARATED)"
              className="w-full border-4 border-black px-4 py-3 font-bold bg-white focus:outline-none focus:bg-blue-50 shadow-[3px_3px_0px_#000]"
            />
          </div>

          <div>
            <label className="block font-black text-xs mb-2 uppercase">LinkedIn URL</label>
            <input
              name="linkedIn"
              value={form.linkedIn}
              onChange={handleChange}
              placeholder="HTTPS://LINKEDIN.COM/IN/..."
              className="w-full border-4 border-black px-4 py-3 font-bold bg-white focus:outline-none focus:bg-blue-50 shadow-[3px_3px_0px_#000]"
            />
          </div>

          <div>
            <label className="block font-black text-xs mb-2 uppercase">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              placeholder="WRITE A SHORT BIO..."
              className="w-full border-4 border-black px-4 py-3 font-bold bg-white focus:outline-none focus:bg-blue-50 shadow-[3px_3px_0px_#000] resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="
              w-full flex items-center justify-center gap-2
              bg-yellow-300 border-4 border-black
              py-4 font-black text-sm
              shadow-[6px_6px_0px_#000]
              hover:translate-x-1 hover:translate-y-1
              hover:shadow-[3px_3px_0px_#000]
              transition-all disabled:opacity-60
            "
          >
            <Save size={16} strokeWidth={2.5} />
            {saving ? "SAVING..." : "SAVE CHANGES"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;