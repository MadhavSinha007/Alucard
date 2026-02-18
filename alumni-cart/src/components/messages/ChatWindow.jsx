import React from "react";

const ChatWindow = ({ chat }) => {
  if (!chat) {
    return (
      <div className="
        flex-1
        flex items-center justify-center
        bg-blue-50
        font-mono font-black
        text-lg
      ">
        SELECT A CONVERSATION
      </div>
    );
  }

  return (
    <div className="
      flex-1
      bg-blue-50
      p-8
      font-mono
    ">
      <div className="
        mb-6
        bg-blue-300
        border-4 border-black
        p-4
        shadow-[6px_6px_0px_#000]
      ">
        <h2 className="text-xl font-black">
          {chat.name.toUpperCase()}
        </h2>
      </div>

      <div className="space-y-4 font-bold">

        <div className="
          inline-block
          bg-white
          border-4 border-black
          px-4 py-2
          shadow-[4px_4px_0px_#000]
        ">
          HELLO 👋
        </div>

        <div className="
          inline-block
          bg-blue-200
          border-4 border-black
          px-4 py-2
          shadow-[4px_4px_0px_#000]
        ">
          HOW ARE YOU?
        </div>

      </div>
    </div>
  );
};

export default ChatWindow;
