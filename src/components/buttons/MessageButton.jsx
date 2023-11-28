import React from "react";

const MessageButton = ({handleMessage}) => {
  return (
    <button onClick={()=>handleMessage()} className="bg-profile-button-bg flex items-center rounded-lg text-text-primary text-sm font-semibold py-2 px-3">
      <span className="mr-1">Message</span>
    </button>
  );
};

export default MessageButton;
