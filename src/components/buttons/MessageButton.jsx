import React from "react";

const MessageButton = ({handleUnFollowUser}) => {
  return (
    <button onClick={()=>handleUnFollowUser()} className="bg-profile-button-bg flex items-center rounded-lg text-text-primary text-sm font-semibold py-2 px-3">
      <span className="mr-1">Message</span>
    </button>
  );
};

export default MessageButton;
