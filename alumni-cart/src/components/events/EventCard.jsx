import React from "react";

const formatDate = (value) => {
  if (!value) return "DATE TBD";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString();
};

const EventCard = ({ event, canRSVP, hasRSVPed, onRSVP, onCancelRSVP, role }) => {
  return (
    <div
      className="
        bg-blue-200
        border-4 border-black
        p-6
        shadow-[8px_8px_0px_#000]
        font-mono
        transition-all duration-150
        hover:translate-x-1 hover:translate-y-1
        hover:shadow-[4px_4px_0px_#000]
      "
    >
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="bg-white border-2 border-black px-3 py-1 text-xs font-black">
          {(event.audience || "both").toUpperCase()}
        </span>

        {hasRSVPed && (
          <span className="bg-green-300 border-2 border-black px-3 py-1 text-xs font-black">
            RSVP CONFIRMED
          </span>
        )}
      </div>

      <h3 className="text-xl font-black mb-3">
        {event.title.toUpperCase()}
      </h3>

      <p className="font-medium mb-5 leading-relaxed">
        {event.description}
      </p>

      <div className="space-y-2 font-bold text-sm border-t-4 border-black pt-3 mb-5">
        <p>DATE: {formatDate(event.date)}</p>
        <p>LOCATION: {event.location || "TBD"}</p>
        <p>RSVP COUNT: {event.rsvpCount || 0}</p>
      </div>

      {canRSVP && (
        <div className="flex gap-3">
          {hasRSVPed ? (
            <button
              onClick={() => onCancelRSVP(event.id)}
              className="
                bg-red-400
                border-4 border-black
                px-5 py-2
                font-black
                shadow-[4px_4px_0px_#000]
                transition-all duration-150
                hover:translate-x-1 hover:translate-y-1
                hover:shadow-[2px_2px_0px_#000]
              "
            >
              CANCEL RSVP
            </button>
          ) : (
            <button
              onClick={() => onRSVP(event.id)}
              className="
                bg-blue-500
                border-4 border-black
                px-5 py-2
                font-black
                shadow-[4px_4px_0px_#000]
                transition-all duration-150
                hover:translate-x-1 hover:translate-y-1
                hover:shadow-[2px_2px_0px_#000]
              "
            >
              RSVP NOW
            </button>
          )}
        </div>
      )}

      {role === "admin" && (
        <p className="font-black text-xs mt-4">
          ORGANIZER: {(event.organizerUid || "UNKNOWN").toUpperCase()}
        </p>
      )}
    </div>
  );
};

export default EventCard;