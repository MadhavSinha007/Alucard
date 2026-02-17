import React, { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "Do you provide financial aid?",
    answer:
      "Yes, we offer need-based financial assistance for eligible participants.",
  },
  {
    question: "Is there an application deadline?",
    answer:
      "Applications are reviewed on a rolling basis. Early submission is recommended.",
  },
  {
    question:
      "How will this program help in my future career or college applications?",
    answer:
      "You’ll gain mentorship, hands-on experience, and leadership exposure that strengthens your academic and professional profile.",
  },
  {
    question: "Will I be able to balance this program with other commitments?",
    answer:
      "Yes. The program is designed to be flexible and manageable alongside school or work.",
  },
  {
    question: "What if I don't have a business idea?",
    answer:
      "No problem! We help you develop and refine ideas throughout the program.",
  },
  {
    question: "What is the application process like?",
    answer:
      "It includes an online application, short review, and a brief interview round.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-blue-50 py-20 px-6 md:px-16 font-mono">
      <div className="max-w-4xl mx-auto">

        {/* Label */}
        <p className="text-xs tracking-widest uppercase font-bold mb-2">
          FAQs
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-black mb-14 border-b-4 border-black inline-block">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        {/* FAQ List */}
        <div className="space-y-8">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="
                  bg-white
                  border-4 border-black
                  shadow-[8px_8px_0px_#000]
                "
              >
                {/* Question */}
                <button
                  onClick={() => toggle(index)}
                  className="
                    w-full
                    flex
                    justify-between
                    items-center
                    p-6
                    text-left
                    transition-all
                    duration-150
                    hover:bg-blue-200
                  "
                >
                  <div className="flex gap-4 items-start">
                    <span className="font-black text-lg">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-lg md:text-xl font-bold leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`
                      border-2 border-black
                      p-2
                      bg-blue-400
                      shadow-[4px_4px_0px_#000]
                      transition-transform
                      duration-200
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  >
                    <ChevronDown size={18} strokeWidth={3} />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`
                    overflow-hidden
                    transition-all
                    duration-300
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

        {/* CTA */}
        <div className="mt-16">
          <p className="text-sm font-bold mb-6">
            Still have more questions?
          </p>

          <button className="
            bg-blue-400
            border-4 border-black
            px-8 py-3
            font-black
            shadow-[6px_6px_0px_#000]
            transition-all duration-150
            hover:translate-x-1 hover:translate-y-1
            hover:shadow-[3px_3px_0px_#000]
            flex items-center gap-3
          ">
            <MessageCircle size={18} strokeWidth={2.5} />
            CONTACT US
          </button>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
