import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fake_donations";

const DonationHistory = ({ refreshKey }) => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setDonations(stored);
  }, [refreshKey]);

  const totalDonated = useMemo(() => {
    return donations.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }, [donations]);

  return (
    <div className="bg-blue-100 border-4 border-black p-6 shadow-[8px_8px_0px_#000] font-mono">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h3 className="text-xl font-black">
          DONATION HISTORY
        </h3>

        <div className="bg-white border-4 border-black px-4 py-2 font-black shadow-[4px_4px_0px_#000]">
          TOTAL DONATED: ₹{totalDonated.toLocaleString()}
        </div>
      </div>

      {donations.length === 0 ? (
        <div className="bg-white border-4 border-black p-4 font-bold">
          NO DONATIONS YET.
        </div>
      ) : (
        <div className="space-y-4">
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_#000]"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h4 className="font-black text-lg mb-1">
                    {donation.fundName.toUpperCase()}
                  </h4>

                  <p className="font-bold text-sm">
                    DONOR: {donation.donorName.toUpperCase()}
                  </p>

                  <p className="font-bold text-sm mt-1">
                    METHOD: {donation.paymentMethod}
                  </p>

                  <p className="font-bold text-xs mt-2 text-gray-700 break-all">
                    TXN ID: {donation.transactionId}
                  </p>

                  <p className="font-bold text-xs mt-1 text-gray-700">
                    {new Date(donation.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <div className="inline-block bg-blue-200 border-4 border-black px-4 py-2 font-black shadow-[3px_3px_0px_#000]">
                    ₹{Number(donation.amount).toLocaleString()}
                  </div>

                  <p className="mt-3 text-sm font-black">
                    STATUS: {donation.status}
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

export default DonationHistory;