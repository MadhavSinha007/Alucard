import React from "react";

const EventCard = ({ event }) => {
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
      <h3 className="text-xl font-black mb-3">
        {event.title.toUpperCase()}
      </h3>

      <p className="font-medium mb-4">
        {event.description}
      </p>

      <div className="flex justify-between font-bold text-sm border-t-4 border-black pt-3">
        <span>{event.date}</span>
        <span>{event.location}</span>
      </div>
    </div>
  );
};

export default EventCard;
