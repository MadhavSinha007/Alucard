import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  GraduationCap,
  Calendar,
  HandCoins,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Building2,
  ShieldCheck,
} from "lucide-react";
import FAQSection from "../components/layout/FAQSection";
import Footer from "../components/layout/HomeFooter";
import LoadingScreen from "../components/layout/LoadingScreen";

const FeatureCard = ({ title, text, icon: Icon }) => (
  <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000]">
    <div className="w-12 h-12 bg-blue-300 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] mb-4">
      <Icon size={20} strokeWidth={2.5} />
    </div>
    <h3 className="text-xl font-black mb-3">{title}</h3>
    <p className="font-medium text-sm leading-relaxed">{text}</p>
  </div>
);

const InfoStrip = ({ items }) => (
  <div className="grid md:grid-cols-3 gap-5">
    {items.map((item) => (
      <div
        key={item.title}
        className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_#000]"
      >
        <h3 className="text-xl font-black mb-3">{item.title}</h3>
        <p className="font-medium text-sm leading-relaxed">{item.text}</p>
      </div>
    ))}
  </div>
);

const HomePage = () => {
  const [offsetY, setOffsetY] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY * 0.12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (showLoader) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-blue-50 text-black font-mono overflow-x-hidden">
      <section className="relative border-b-4 border-black overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            transform: `translateY(${offsetY}px)`,
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #60a5fa 0, #60a5fa 4px, transparent 4px), radial-gradient(circle at 80% 30%, #93c5fd 0, #93c5fd 5px, transparent 5px), radial-gradient(circle at 60% 70%, #3b82f6 0, #3b82f6 4px, transparent 4px)",
            backgroundSize: "220px 220px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white border-4 border-black px-4 py-2 shadow-[4px_4px_0px_#000] mb-6">
                <Sparkles size={16} strokeWidth={2.5} />
                <span className="font-black text-sm">
                  OFFICIAL COLLEGE ALUMNI NETWORK
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] max-w-4xl">
                BUILD A
                <span className="inline-block bg-blue-400 px-3 mx-2 border-4 border-black shadow-[6px_6px_0px_#000]">
                  REAL
                </span>
                CONNECTION
                <br />
                WITH YOUR ALUMNI NETWORK.
              </h1>

              <p className="mt-8 text-lg font-medium max-w-2xl leading-relaxed">
                Discover alumni, request mentorship, attend events, support students,
                and grow a stronger college community through one shared portal.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-3 bg-blue-500 border-4 border-black px-8 py-4 font-black text-lg shadow-[8px_8px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000]"
                >
                  ENTER PORTAL
                  <ArrowRight size={18} strokeWidth={2.5} />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center gap-3 bg-white border-4 border-black px-8 py-4 font-black text-lg shadow-[8px_8px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#000]"
                >
                  REQUEST ACCESS
                </Link>
              </div>

              <div className="mt-8 grid sm:grid-cols-3 gap-4 max-w-2xl">
                {[
                  "MENTORSHIP CONNECTIONS",
                  "SMART EVENT RSVP",
                  "ALUMNI-LED DONATIONS",
                ].map((item) => (
                  <div
                    key={item}
                    className="bg-white border-4 border-black px-4 py-4 font-black text-sm shadow-[5px_5px_0px_#000]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-blue-300 border-4 border-black p-6 sm:p-8 shadow-[10px_10px_0px_#000] rotate-[-2deg]">
                <div className="grid grid-cols-2 gap-5">
                  <div className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_#000]">
                    <p className="text-3xl font-black">120+</p>
                    <p className="text-xs font-bold mt-2">ALUMNI CONNECTIONS</p>
                  </div>
                  <div className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_#000]">
                    <p className="text-3xl font-black">45+</p>
                    <p className="text-xs font-bold mt-2">MENTORSHIP MATCHES</p>
                  </div>
                  <div className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_#000]">
                    <p className="text-3xl font-black">20+</p>
                    <p className="text-xs font-bold mt-2">EVENTS HOSTED</p>
                  </div>
                  <div className="bg-white border-4 border-black p-5 shadow-[5px_5px_0px_#000]">
                    <p className="text-3xl font-black">₹50K+</p>
                    <p className="text-xs font-bold mt-2">STUDENT SUPPORT</p>
                  </div>
                </div>

                <div className="mt-6 bg-white border-4 border-black p-5 shadow-[5px_5px_0px_#000]">
                  <p className="text-sm font-black mb-3">
                    WHAT YOU CAN DO INSIDE THE PORTAL
                  </p>
                  <div className="space-y-3">
                    {[
                      "SEARCH AND CONNECT WITH VERIFIED ALUMNI",
                      "SEND AND ACCEPT MENTORSHIP REQUESTS",
                      "JOIN COLLEGE EVENTS WITH RSVP",
                      "SUPPORT SCHOLARSHIP AND DONATION DRIVES",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 size={16} strokeWidth={2.5} />
                        <span className="font-bold text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden md:block absolute -right-4 -bottom-6 bg-white border-4 border-black px-5 py-4 shadow-[8px_8px_0px_#000] rotate-[3deg]">
                <p className="font-black text-sm">STUDENT · ALUMNI · ADMIN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase font-bold mb-2">
            Portal Features
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-12 border-b-4 border-black inline-block">
            EVERYTHING IN ONE ALUMNI PORTAL
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            <FeatureCard
              title="ALUMNI DIRECTORY"
              text="Search verified alumni by batch, company, department, and professional role."
              icon={Users}
            />
            <FeatureCard
              title="MENTORSHIP"
              text="Students can request mentors and build direct learning connections with alumni."
              icon={GraduationCap}
            />
            <FeatureCard
              title="EVENTS"
              text="Attend meetups, workshops, mixers, and networking sessions with RSVP support."
              icon={Calendar}
            />
            <FeatureCard
              title="DONATIONS"
              text="Alumni can contribute to scholarships, student funds, and community initiatives."
              icon={HandCoins}
            />
          </div>
        </div>
      </section>

      <section className="bg-blue-100 border-y-4 border-black py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase font-bold mb-2">
            Built For Impact
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-12 border-b-4 border-black inline-block">
            WHY THIS PORTAL MATTERS
          </h2>

          <InfoStrip
            items={[
              {
                title: "FOR STUDENTS",
                text: "Find mentors, RSVP for events, and benefit from alumni support.",
              },
              {
                title: "FOR ALUMNI",
                text: "Give back through mentorship, donations, and networking opportunities.",
              },
              {
                title: "FOR ADMINS",
                text: "Manage users, verify join requests, create events, track donations, and generate reports.",
              },
            ]}
          />
        </div>
      </section>

      <section className="py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase font-bold mb-2">
            Use Cases
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-12 border-b-4 border-black inline-block">
            HOW THE COMMUNITY USES IT
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <FeatureCard
              title="CAREER GUIDANCE"
              text="Students can connect with alumni working in industry and get real advice on internships, jobs, and higher studies."
              icon={Briefcase}
            />
            <FeatureCard
              title="CAMPUS ENGAGEMENT"
              text="Departments can host mixers, masterclasses, and alumni meetups that bring the college network together."
              icon={Building2}
            />
            <FeatureCard
              title="VERIFIED ACCESS"
              text="Admins can verify join requests, manage roles, and keep the alumni network authentic and trusted."
              icon={ShieldCheck}
            />
          </div>
        </div>
      </section>

      <section className="bg-blue-100 border-y-4 border-black py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase font-bold mb-2">
            Community Promise
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-12 border-b-4 border-black inline-block">
            A NETWORK THAT KEEPS GROWING
          </h2>

          <InfoStrip
            items={[
              {
                title: "STAY CONNECTED",
                text: "Build long-term relationships across batches, departments, and career stages.",
              },
              {
                title: "GIVE BACK",
                text: "Create real impact through mentorship, scholarship support, and participation.",
              },
              {
                title: "GROW TOGETHER",
                text: "Strengthen the bond between students, alumni, and the college community over time.",
              },
            ]}
          />
        </div>
      </section>

      <FAQSection />
      <Footer />
    </div>
  );
};

export default HomePage;