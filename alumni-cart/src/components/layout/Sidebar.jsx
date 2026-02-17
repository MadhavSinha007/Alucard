import React from "react";
import { NavLink } from "react-router-dom";
import { useFakeAuth } from "../../hooks/useFakeAuth";

const Sidebar = () => {
  const { user } = useFakeAuth();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Alumni Directory", path: "/alumni" },
    { name: "Events", path: "/events" },
    { name: "Mentorship", path: "/mentorship" },
    { name: "Messages", path: "/messages" },
    { name: "Donations", path: "/donations" },
  ];

  if (user?.role === "admin") {
    links.push({ name: "Admin Panel", path: "/admin" });
  }

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 px-6 py-10 flex flex-col">

      {/* Section Label */}
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest text-gray-500">
          Navigation
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-gray-100 text-black"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Spacer */}
      <div className="mt-auto pt-10 text-xs text-gray-400">
        Alumni Cart © {new Date().getFullYear()}
      </div>

    </aside>
  );
};

export default Sidebar;