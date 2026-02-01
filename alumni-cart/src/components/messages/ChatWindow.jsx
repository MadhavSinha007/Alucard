import React from "react";

const ChatWindow = ({ chat }) => {
  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a conversation
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">
        {chat.name}
      </h2>

      <div className="space-y-2 text-gray-300">
        <div>Hello 👋</div>
        <div>How are you?</div>
      </div>
    </div>
  );
};

export default ChatWindow;