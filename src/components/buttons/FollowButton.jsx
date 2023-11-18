import React from "react";

const FollowButton = ({handleFollowUser}) => {
  return (
    <button onClick={()=>handleFollowUser()} className="bg-text-link rounded-lg text-text-primary text-sm font-semibold py-2 px-5">
      Follow
    </button>
  );
};

export default FollowButton;
