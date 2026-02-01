import React, { useState } from "react";
import { useFakeAuth } from "../../hooks/useFakeAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { login } = useFakeAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    graduationYear: "",
    degree: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(); // fake registration
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-gray-800 p-6 rounded-lg space-y-4"
      >
        <h1 className="text-xl font-semibold">Register</h1>

        <input
          name="name"
          placeholder="Full Name"
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          onChange={handleChange}
        />

        <input
          name="graduationYear"
          placeholder="Graduation Year"
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          onChange={handleChange}
        />

        <input
          name="degree"
          placeholder="Degree"
          className="w-full bg-black border border-gray-700 px-3 py-2 rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-white text-black py-2 rounded hover:bg-gray-200">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;