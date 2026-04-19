import React from "react";
import { Shield, FileText, Mail, GraduationCap, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-400 border-t-4 border-black px-6 py-12 font-mono">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-black mb-3">ALUMNI CART</h3>
              <p className="font-bold text-sm leading-relaxed">
                A college alumni platform for mentorship, donations, events,
                networking, and long-term student support.
              </p>
            </div>

            <div>
              <p className="text-sm font-black mb-4">PORTAL FEATURES</p>
              <div className="space-y-3 text-sm font-bold">
                <div className="flex items-center gap-2">
                  <Users size={16} strokeWidth={2.5} />
                  ALUMNI DIRECTORY
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} strokeWidth={2.5} />
                  MENTORSHIP
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} strokeWidth={2.5} />
                  EVENTS & RSVP
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-black mb-4">QUICK LINKS</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-blue-200 border-2 border-black px-4 py-2 font-bold text-sm shadow-[4px_4px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
                >
                  <Shield size={16} strokeWidth={2.5} />
                  PRIVACY
                </Link>

                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-blue-200 border-2 border-black px-4 py-2 font-bold text-sm shadow-[4px_4px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
                >
                  <FileText size={16} strokeWidth={2.5} />
                  TERMS
                </Link>

                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-blue-200 border-2 border-black px-4 py-2 font-bold text-sm shadow-[4px_4px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
                >
                  <Mail size={16} strokeWidth={2.5} />
                  CONTACT
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center font-bold text-sm">
          © {new Date().getFullYear()} ALUMNI PORTAL — ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
};

export default Footer;