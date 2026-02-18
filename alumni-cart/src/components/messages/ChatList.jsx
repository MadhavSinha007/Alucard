import React from "react";

const dummyChats = [
  { id: 1, name: "Rahul Sharma", last: "See you at the event" },
  { id: 2, name: "Ananya Gupta", last: "Thanks for the help!" },
];

const ChatList = ({ onSelect }) => {
  return (
    <div className="
      w-72
      bg-blue-200
      border-r-4 border-black
      font-mono
    ">
      {dummyChats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelect(chat)}
          className="
            p-5
            border-b-4 border-black
            cursor-pointer
            transition-all duration-150
            hover:bg-blue-400
          "
        >
          <p className="font-black text-sm">
            {chat.name.toUpperCase()}
          </p>
          <p className="text-xs font-bold">
            {chat.last}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
