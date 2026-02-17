import React from "react";
import { Link } from "react-router-dom";
import FAQSection from "../components/layout/FAQSection";
import HomeFooter from "../components/layout/HomeFooter";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-hidden">
      {/* === Soft Gradient Blobs (Subtle) === */}
      <div className="pointer-events-none absolute top-[-140px] right-[-140px] w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] bg-lime-400 rounded-full blur-[160px] opacity-10"></div>
      <div className="pointer-events-none absolute bottom-[-180px] left-[-180px] w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] bg-yellow-300 rounded-full blur-[180px] opacity-10"></div>

      {/* === Hero Section === */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24">
        <div className="grid md:grid-cols-2 items-center gap-12 md:gap-16">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              We <span className="italic font-light">connect</span> you with
              <br />
              real alumni.
            </h1>

            <p className="mt-5 sm:mt-6 text-gray-500 text-base sm:text-lg max-w-md leading-relaxed">
              Build meaningful mentorships, explore career opportunities,
              attend exclusive events, and grow with a powerful alumni network.
            </p>

            {/* CTA */}
            <div className="mt-8 sm:mt-10 flex items-center gap-6">
              <Link
                to="/login"
                className="group inline-flex items-center gap-3 bg-black text-white px-6 sm:px-7 py-3 rounded-full font-medium transition-all duration-300 hover:opacity-90"
              >
                Login
                <span className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* Admin Access */}
            <div className="mt-5 sm:mt-6 text-sm text-gray-400">
              Admin access?{" "}
              <Link
                to="/login"
                className="text-black font-medium hover:underline"
              >
                Login here
              </Link>
            </div>
          </div>

          {/* Right Spacer (future illustration) */}
          <div className="hidden md:block" />
        </div>
      </section>

      {/* === FAQ Section === */}
      <section className="mt-8 sm:mt-12 md:mt-16">
        <FAQSection />
      </section>

      {/* === Footer === */}
      <HomeFooter />
    </div>
  );
};

export default HomePage;