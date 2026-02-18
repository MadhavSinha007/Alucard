import React from "react";

const MessageInput = () => {
  return (
    <div className="
      bg-blue-200
      border-t-4 border-black
      p-6
      font-mono
    ">
      <div className="flex gap-4">

        <input
          className="
            flex-1
            bg-white
            border-4 border-black
            px-4 py-3
            font-bold
            focus:outline-none
            focus:bg-blue-50
          "
          placeholder="TYPE A MESSAGE..."
        />

        <button
          className="
            bg-blue-500
            border-4 border-black
            px-6
            font-black
            shadow-[4px_4px_0px_#000]
            transition-all duration-150
            hover:translate-x-1 hover:translate-y-1
            hover:shadow-[2px_2px_0px_#000]
          "
        >
          SEND
        </button>

      </div>
    </div>
  );
};

export default MessageInput;
