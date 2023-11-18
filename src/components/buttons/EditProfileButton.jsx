import React from "react";

const EditProfileButton = ({setEditProfile}) => {
  return (
    <button onClick={()=>setEditProfile(true)} className="bg-profile-button-bg rounded-lg text-text-primary text-sm font-semibold py-2 px-4">
      Edit profile
    </button>
  );
};

export default EditProfileButton;
