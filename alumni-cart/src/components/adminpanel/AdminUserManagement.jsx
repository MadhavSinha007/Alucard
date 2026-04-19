import React, { useState } from "react";

const USER_KEY = "fake_admin_users";

const AdminUserManagement = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateUser = () => {
    if (!fullName.trim() || !email.trim() || !department.trim() || !batch.trim()) {
      setMessage("PLEASE FILL ALL REQUIRED FIELDS.");
      return;
    }

    const users = JSON.parse(localStorage.getItem(USER_KEY) || "[]");

    const newUser = {
      id: `user_${Date.now()}`,
      uid: `user_${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      role,
      department: department.trim(),
      batch: batch.trim(),
      status: "active",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(USER_KEY, JSON.stringify([newUser, ...users]));

    setFullName("");
    setEmail("");
    setRole("student");
    setDepartment("");
    setBatch("");
    setMessage("USER CREATED SUCCESSFULLY.");
  };

  return (
    <div className="bg-blue-200 border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
      <h2 className="text-2xl font-black mb-6">CREATE USER</h2>

      <div className="grid gap-4">
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="FULL NAME"
          className="w-full bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="EMAIL"
          className="w-full bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none"
          >
            <option value="student">STUDENT</option>
            <option value="alumni">ALUMNI</option>
            <option value="admin">ADMIN</option>
          </select>

          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="DEPARTMENT"
            className="bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none"
          />

          <input
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            placeholder="BATCH"
            className="bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none"
          />
        </div>

        <button
          onClick={handleCreateUser}
          className="mt-2 bg-blue-500 border-4 border-black px-6 py-3 font-black shadow-[6px_6px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_#000]"
        >
          CREATE USER
        </button>

        {message && (
          <div className="bg-white border-4 border-black px-4 py-3 font-black shadow-[4px_4px_0px_#000]">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;