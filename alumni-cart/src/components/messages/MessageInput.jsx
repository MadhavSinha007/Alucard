import React from "react";

const MessageInput = () => {
  return (
    <div className="border-t border-gray-800 p-4">
      <input
        className="w-full bg-gray-900 text-white px-4 py-2 rounded"
        placeholder="Type a message..."
      />
    </div>
  );
};

export default MessageInput;