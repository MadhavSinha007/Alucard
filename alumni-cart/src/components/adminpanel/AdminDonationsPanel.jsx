import React, { useMemo } from "react";

const DONATION_KEY = "fake_donations";

const AdminDonationsPanel = () => {
  const donations = JSON.parse(localStorage.getItem(DONATION_KEY) || "[]");

  const summary = useMemo(() => {
    const total = donations.reduce(
      (sum, donation) => sum + Number(donation.amount || 0),
      0
    );
    return {
      total,
      count: donations.length,
    };
  }, [donations]);

  return (
    <div className="bg-blue-200 border-4 border-black p-8 shadow-[8px_8px_0px_#000]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-black">DONATIONS & PAYMENTS</h2>

        <div className="bg-white border-4 border-black px-4 py-2 font-black shadow-[4px_4px_0px_#000]">
          ₹{summary.total.toLocaleString()} · {summary.count} PAYMENTS
        </div>
      </div>

      {donations.length === 0 ? (
        <div className="bg-white border-4 border-black p-4 font-black">
          NO DONATION RECORDS FOUND.
        </div>
      ) : (
        <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_#000]"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <p className="font-black text-lg">
                    {donation.donorName?.toUpperCase() || "UNKNOWN DONOR"}
                  </p>
                  <p className="font-bold text-sm">
                    {donation.donorEmail || "NO EMAIL"}
                  </p>
                  <p className="font-bold text-sm mt-2">
                    METHOD: {donation.paymentMethod || "UNKNOWN"}
                  </p>
                  <p className="font-bold text-xs mt-1 break-all">
                    TXN ID: {donation.transactionId || "N/A"}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <div className="inline-block bg-blue-100 border-4 border-black px-4 py-2 font-black shadow-[3px_3px_0px_#000]">
                    ₹{Number(donation.amount || 0).toLocaleString()}
                  </div>
                  <p className="text-sm font-black mt-3">
                    {donation.status || "SUCCESS"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDonationsPanel;