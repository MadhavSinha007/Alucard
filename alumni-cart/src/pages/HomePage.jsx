import React from "react";
import { Link } from "react-router-dom";
import FAQSection from "../components/layout/FAQSection";
import HomeFooter from "../components/layout/HomeFooter";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-blue-50 text-black font-mono">

      {/* === HERO SECTION (CENTERED) === */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-28">

        <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-4xl">
          WE{" "}
          <span className="bg-blue-400 px-3 border-4 border-black shadow-[6px_6px_0px_#000]">
            CONNECT
          </span>
          <br />
          YOU WITH REAL ALUMNI.
        </h1>

        <p className="mt-8 text-lg font-medium max-w-2xl">
          Build mentorships. Discover opportunities. Attend events.
          Grow inside a powerful alumni network.
        </p>

        {/* CTA */}
        <div className="mt-12">
          <Link
            to="/login"
            className="
              inline-block
              bg-blue-500
              border-4 border-black
              px-10 py-4
              font-black text-lg
              shadow-[8px_8px_0px_#000]
              transition-all duration-150
              hover:translate-x-1 hover:translate-y-1
              hover:shadow-[4px_4px_0px_#000]
            "
          >
            LOGIN →
          </Link>
        </div>

        {/* Admin */}
        <div className="mt-6 text-sm font-bold">
          ADMIN?{" "}
          <Link to="/login" className="underline">
            ACCESS HERE
          </Link>
        </div>

      </section>

      {/* === FAQ FULL WIDTH SECTION === */}
      <section className="w-full bg-blue-100 border-t-4 border-black py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FAQSection />
        </div>
      </section>

      {/* === FOOTER === */}
      <div className="border-t-4 border-black">
        <HomeFooter />
      </div>

    </div>
  );
};

export default HomePage;
