import { CaretDown } from "@phosphor-icons/react";
import React from "react";

const FollowingButton = ({handleUnFollowUser}) => {
  return (
    <button onClick={()=>handleUnFollowUser()} className="bg-profile-button-bg flex items-center rounded-lg text-text-primary text-sm font-semibold py-2 px-5">
      <span className="mr-1">Following</span>
      <CaretDown />
    </button>
  );
};

export default FollowingButton;
