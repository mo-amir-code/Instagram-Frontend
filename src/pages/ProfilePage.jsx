import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MyProfile from "./MyProfile";
import Profile from "./Profile";

const ProfilePage = () => {
  const { profile } = useParams();
  const { username } = useSelector((state) => state.auth);

  return (
    <>
      {username?.toString() === profile.toString() ? (
        <MyProfile />
      ) : (
        <Profile />
      )}
    </>
  );
};

export default ProfilePage;
