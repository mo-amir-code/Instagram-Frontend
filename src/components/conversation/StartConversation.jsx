import { MessengerLogo } from "@phosphor-icons/react";
import React from "react";

const StartConversation = ({ setOpenModal }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white space-y-3">
      <div className="p-4 rounded-full border-2 border-text-primary">
        <MessengerLogo size={60} />
      </div>
      <div className="space-y-1 flex flex-col items-center justify-center">
        <h4 className="text-xl font-medium">Your Messages</h4>
        <p className="text-text-secondary text-sm text-center">
          Send private photos and messages to a friend
        </p>
        <div className="pt-3">
          <button
            onClick={() => setOpenModal(true)}
            className="px-5 py-2 rounded-lg bg-text-link"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartConversation;
