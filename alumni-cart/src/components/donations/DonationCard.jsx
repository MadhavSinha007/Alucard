import React, { useState } from "react";

const STORAGE_KEY = "fake_donations";

const DonationCard = ({ onDonationComplete }) => {
  const [amount, setAmount] = useState("1000");
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo@example.com");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const quickAmounts = [500, 1000, 2500, 5000];

  const handleDonate = () => {
    if (!amount || Number(amount) <= 0) return;

    setLoading(true);
    setSuccess("");

    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      const newDonation = {
        id: `don_${Date.now()}`,
        fundName: "Alumni Scholarship Fund",
        donorName: name || "Anonymous Donor",
        donorEmail: email || "no-email@example.com",
        amount: Number(amount),
        paymentMethod,
        status: "SUCCESS",
        createdAt: new Date().toISOString(),
        transactionId: `TXN${Date.now()}`,
      };

      const updated = [newDonation, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      setLoading(false);
      setSuccess(`PAYMENT SUCCESSFUL • TXN ID: ${newDonation.transactionId}`);
      setAmount("1000");

      onDonationComplete?.();
    }, 1200);
  };

  return (
    <div className="bg-blue-200 border-4 border-black p-6 shadow-[8px_8px_0px_#000] font-mono">
      <div className="mb-6">
        <h3 className="text-2xl font-black mb-2">
          ALUMNI SCHOLARSHIP FUND
        </h3>
        <p className="font-medium">
          Support students through scholarships, financial aid, and academic opportunities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-black mb-2">
              DONOR NAME
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none focus:bg-blue-50"
              placeholder="ENTER YOUR NAME"
            />
          </div>

          <div>
            <label className="block text-sm font-black mb-2">
              EMAIL
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none focus:bg-blue-50"
              placeholder="ENTER YOUR EMAIL"
              type="email"
            />
          </div>

          <div>
            <label className="block text-sm font-black mb-2">
              DONATION AMOUNT
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none focus:bg-blue-50"
              placeholder="ENTER AMOUNT"
              type="number"
              min="1"
            />
          </div>

          <div>
            <p className="text-sm font-black mb-2">QUICK AMOUNTS</p>
            <div className="flex flex-wrap gap-3">
              {quickAmounts.map((value) => (
                <button
                  key={value}
                  onClick={() => setAmount(String(value))}
                  className="bg-white border-4 border-black px-4 py-2 font-black text-sm shadow-[4px_4px_0px_#000] transition-all duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
                >
                  ₹{value}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="bg-blue-100 border-4 border-black p-5 shadow-[6px_6px_0px_#000]">
          <h4 className="text-lg font-black mb-4">
            PAYMENT DETAILS
          </h4>

          <div className="mb-5">
            <label className="block text-sm font-black mb-2">
              PAYMENT METHOD
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full bg-white border-4 border-black px-4 py-3 font-bold focus:outline-none"
            >
              <option>UPI</option>
              <option>CARD</option>
              <option>NET BANKING</option>
              <option>WALLET</option>
            </select>
          </div>

          <div className="bg-white border-4 border-black p-4 mb-5">
            <p className="font-bold text-sm mb-2">SUMMARY</p>
            <div className="space-y-2 text-sm font-bold">
              <div className="flex justify-between">
                <span>FUND</span>
                <span>SCHOLARSHIP</span>
              </div>
              <div className="flex justify-between">
                <span>AMOUNT</span>
                <span>₹{Number(amount || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>PLATFORM FEE</span>
                <span>₹0</span>
              </div>
              <div className="border-t-4 border-black pt-2 flex justify-between font-black">
                <span>TOTAL</span>
                <span>₹{Number(amount || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleDonate}
            disabled={loading}
            className={`w-full border-4 border-black px-6 py-3 font-black shadow-[4px_4px_0px_#000] transition-all duration-150 ${
              loading
                ? "bg-yellow-300 cursor-not-allowed"
                : "bg-blue-500 hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]"
            }`}
          >
            {loading ? "PROCESSING PAYMENT..." : `PAY ₹${Number(amount || 0).toLocaleString()} NOW`}
          </button>

          {success && (
            <div className="mt-4 bg-green-300 border-4 border-black p-4 font-black text-sm shadow-[4px_4px_0px_#000]">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationCard;