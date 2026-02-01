import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-black border border-gray-800 rounded-lg p-5 hover:border-gray-600 transition">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">
          {event.title}
        </h3>

        <p className="text-sm text-gray-400">
          {event.description}
        </p>

        <div className="flex justify-between text-xs text-gray-500 pt-3">
          <span>{event.date}</span>
          <span>{event.location}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;