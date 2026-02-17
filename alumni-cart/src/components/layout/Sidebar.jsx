import React from "react";
import { NavLink } from "react-router-dom";
import { useFakeAuth } from "../../hooks/useFakeAuth";
import {
  LayoutDashboard,
  Users,
  Calendar,
  GraduationCap,
  MessageSquare,
  HandCoins,
  Shield,
} from "lucide-react";

const Sidebar = () => {
  const { user } = useFakeAuth();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Alumni Directory", path: "/alumni", icon: Users },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Mentorship", path: "/mentorship", icon: GraduationCap },
    { name: "Messages", path: "/messages", icon: MessageSquare },
    { name: "Donations", path: "/donations", icon: HandCoins },
  ];

  if (user?.role === "admin") {
    links.push({ name: "Admin Panel", path: "/admin", icon: Shield });
  }

  return (
    <aside className="w-72 min-h-screen bg-blue-400 border-r-4 border-black p-6 font-mono flex flex-col">

      {/* Title */}
      <div className="mb-10 border-b-4 border-black pb-4">
        <h2 className="text-xl font-black">NAVIGATION</h2>
      </div>

      {/* Links */}
      <nav className="flex flex-col gap-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.name}
              to={link.path}
              end
              className={({ isActive }) =>
                `
                flex items-center gap-3
                px-4 py-3
                border-4 border-black
                font-bold text-sm
                transition-all duration-150
                ${
                  isActive
                    ? "bg-white shadow-[6px_6px_0px_#000]"
                    : "bg-blue-200 shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
                }
              `
              }
            >
              <Icon size={18} strokeWidth={2.5} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-10 border-t-4 border-black text-xs font-bold">
        ALUMNI CART © {new Date().getFullYear()}
      </div>
    </aside>
  );
};

export default Sidebar;
