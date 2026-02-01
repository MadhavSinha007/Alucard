import React from "react";

const dummyChats = [
  { id: 1, name: "Rahul Sharma", last: "See you at the event" },
  { id: 2, name: "Ananya Gupta", last: "Thanks for the help!" },
];

const ChatList = ({ onSelect }) => {
  return (
    <div className="w-64 border-r border-gray-800">
      {dummyChats.map(chat => (
        <div
          key={chat.id}
          onClick={() => onSelect(chat)}
          className="p-4 cursor-pointer hover:bg-gray-900"
        >
          <p className="text-white font-medium">{chat.name}</p>
          <p className="text-sm text-gray-500">{chat.last}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;