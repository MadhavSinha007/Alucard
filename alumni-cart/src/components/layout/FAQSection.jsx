import React, { useState } from "react";

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
    <section className="bg-black text-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <p className="text-xs sm:text-sm text-gray-400 mb-2 tracking-widest uppercase">
          FAQs
        </p>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 leading-tight">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="space-y-6 sm:space-y-8">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-b border-gray-800 pb-6 sm:pb-8"
              >
                {/* Question */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-start sm:items-center text-left gap-4 group"
                >
                  <div className="flex gap-3 sm:gap-4">
                    <span className="text-gray-500 text-sm sm:text-base font-medium min-w-[32px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-base sm:text-lg md:text-xl font-medium group-hover:text-gray-300 transition">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Icon */}
                  <div
                    className={`min-w-[36px] h-9 w-9 rounded-full border border-gray-700 flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-white text-black rotate-180"
                        : "bg-transparent text-white"
                    }`}
                  >
                    +
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "max-h-96 opacity-100 mt-4 sm:mt-6"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed sm:ml-10">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 sm:mt-16">
          <p className="text-gray-400 text-sm sm:text-base mb-4">
            Still have more questions?
          </p>

          <button className="bg-white text-black text-sm sm:text-base px-6 sm:px-7 py-2.5 sm:py-3 rounded-full hover:bg-gray-200 transition duration-300">
            Reach out to us →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;