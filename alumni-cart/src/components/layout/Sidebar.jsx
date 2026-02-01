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

  if (user.role === "admin") {
    links.push({ name: "Admin Panel", path: "/admin" });
  }

  return (
    <aside className="w-64 min-h-screen bg-black border-r border-gray-800 p-6">
      <nav className="space-y-6">
        <h2 className="text-xs text-gray-500 uppercase tracking-wide">
          Navigation
        </h2>

        <ul className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded transition ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;