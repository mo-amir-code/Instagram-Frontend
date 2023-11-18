import { UserPlus } from "@phosphor-icons/react";
import React from "react";

const UserRecommendation = () => {
  return (
    <button className="bg-profile-button-bg rounded-lg text-text-primary text-sm font-semibold py-2 px-2">
      <UserPlus />
    </button>
  );
};

export default UserRecommendation;
