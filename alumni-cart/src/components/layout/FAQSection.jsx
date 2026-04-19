import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  MessageCircle,
  GraduationCap,
  HandCoins,
  Calendar,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const faqGroups = {
  all: [
    {
      icon: Users,
      question: "Who can use the alumni portal?",
      answer:
        "Students, alumni, and administrators can use the portal. Each role gets a different dashboard and features based on access level.",
    },
    {
      icon: Calendar,
      question: "Can users join events directly from the portal?",
      answer:
        "Yes. Eligible users can RSVP to events directly from the events page and manage their participation from there.",
    },
    {
      icon: Users,
      question: "What if an alumni account does not exist yet?",
      answer:
        "Alumni can submit an access request with personal details and proof documents. The admin verifies the data and creates the account.",
    },
  ],
  students: [
    {
      icon: GraduationCap,
      question: "How does mentorship work for students?",
      answer:
        "Students can search mentors, send mentorship requests, and start messaging once the request is accepted by an alumni mentor.",
    },
    {
      icon: Calendar,
      question: "Can students attend alumni events?",
      answer:
        "Yes, if the event is marked for students or for both students and alumni, students can RSVP and participate.",
    },
    {
      icon: Users,
      question: "What benefits do students get from the portal?",
      answer:
        "Students can build alumni connections, get guidance, attend events, and benefit from scholarships and community support.",
    },
  ],
  alumni: [
    {
      icon: HandCoins,
      question: "Can alumni donate through the portal?",
      answer:
        "Yes. Alumni can contribute to scholarship funds, student activities, and college initiatives through the donation system.",
    },
    {
      icon: GraduationCap,
      question: "How do alumni support students?",
      answer:
        "Alumni can accept mentorship requests, message students, participate in events, and contribute through donations and networking.",
    },
    {
      icon: Users,
      question: "Can alumni who passed out long ago still join?",
      answer:
        "Yes. They can submit a request to join the network, upload proof documents, and get verified by the admin team.",
    },
  ],
};

const tabs = [
  { key: "all", label: "ALL" },
  { key: "students", label: "STUDENTS" },
  { key: "alumni", label: "ALUMNI" },
];

const FAQSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();

  const faqs = useMemo(() => faqGroups[activeTab] || [], [activeTab]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-blue-50 py-20 px-6 md:px-10 font-mono">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-widest uppercase font-bold mb-2">FAQs</p>

        <h2 className="text-4xl md:text-5xl font-black mb-6 border-b-4 border-black inline-block">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <p className="font-bold text-sm md:text-base max-w-2xl mb-10">
          Browse common questions by audience type and understand how the portal works.
        </p>

        <div className="flex flex-wrap gap-4 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setOpenIndex(0);
              }}
              className={`
                border-4 border-black px-5 py-2 font-black text-sm
                shadow-[4px_4px_0px_#000] transition-all duration-150
                ${
                  activeTab === tab.key
                    ? "bg-white shadow-[6px_6px_0px_#000]"
                    : "bg-blue-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;

            return (
              <div
                key={index}
                className="bg-white border-4 border-black shadow-[8px_8px_0px_#000]"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-6 text-left transition-all duration-150 hover:bg-blue-200"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 bg-blue-300 border-4 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] flex-shrink-0">
                      <Icon size={18} strokeWidth={2.5} />
                    </div>

                    <div>
                      <span className="font-black text-sm block mb-1">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`
                      border-2 border-black p-2 bg-blue-400 shadow-[4px_4px_0px_#000]
                      transition-transform duration-200
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  >
                    <ChevronDown size={18} strokeWidth={3} />
                  </div>
                </button>

                <div
                  className={`
                    overflow-hidden transition-all duration-300
                    ${isOpen ? "max-h-96 p-6 pt-0" : "max-h-0"}
                  `}
                >
                  <div className="border-t-4 border-black pt-6">
                    <p className="text-sm md:text-base font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <p className="text-sm font-bold mb-6">
            Need portal access or still have questions?
          </p>

          <button
            onClick={() => navigate("/login")}
            className="
              bg-blue-400 border-4 border-black px-8 py-3 font-black
              shadow-[6px_6px_0px_#000]
              transition-all duration-150
              hover:translate-x-1 hover:translate-y-1
              hover:shadow-[3px_3px_0px_#000]
              flex items-center gap-3
            "
          >
            <MessageCircle size={18} strokeWidth={2.5} />
            GO TO PORTAL
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;