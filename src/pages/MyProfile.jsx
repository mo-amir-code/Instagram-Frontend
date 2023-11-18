import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { GearSix } from "@phosphor-icons/react";
import Highlight from "../components/myprofile/Highlight";
import CreateHighlight from "../components/myprofile/CreateHighlight";
import MediaTab from "../components/myprofile/MediaTab";
import Post from "../components/Post";
import EditProfileButton from "../components/buttons/EditProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyUserAsync } from "../redux/features/user/userSlice";
import ProfileLoader from "../components/loaders/ProfileLoader";
import IsLoggedInLoader from "../components/loaders/IsLoggedInLoader";
import { fetchMyUserPostAsync } from "../redux/features/app/appAsyncThunk";
import EditProfile from "./EditProfile";

const MyProfile = () => {
  const { loggedInUserId } = useSelector((state) => state.auth);
  const { userInfo, userAvatar } = useSelector((state) => state.user);
  const { myUserPosts } = useSelector((state) => state.app);
  const [editProfile, setEditProfile] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyUserAsync(loggedInUserId));
    dispatch(fetchMyUserPostAsync(loggedInUserId));
  }, []);

  if (!userInfo) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ProfileLoader />
      </div>
    );
  }

  return (
    <>
      {!editProfile?<div className="text-text-primary">
        <div className="py-8 px-8 space-y-8">
          {/* Profile hero section */}
          <section className="flex">
            <div className="flex justify-center items-center flex-[0.34] py-8">
              <div className="rounded-full overflow-hidden border-r border-hover-primary w-[160px] h-[160px]">
                <img src={userAvatar} alt="" width={160} />
              </div>
            </div>

            <div className="flex-[0.66] space-y-5">
              <div className="flex items-center justify-start">
                <h1 className="text-lg font-medium">{userInfo.username}</h1>

                <div className="flex items-center space-x-3 pl-16">
                  <EditProfileButton setEditProfile={setEditProfile} />
                  <GearSix size={30} />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-6 font-medium">
                  <h4>{userInfo.posts} posts</h4>
                  <h4>{userInfo.followers.length} followers</h4>
                  <h4>{userInfo.following.length} following</h4>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold">
                  <h2>{userInfo.name}</h2>
                </div>

                <div className="text-sm">
                  <h4 className="text-text-secondary">{userInfo.category}</h4>
                  <p>{userInfo.bio}</p>
                  {/* <p className="mt-2 font-semibold">
                  79 accounts reached in the last 30 days. View insights
                </p> */}
                </div>
              </div>
            </div>
          </section>

          {/* Profile Highlights section */}
          <section className="flex items-center px-14 space-x-10 overflow-x-auto w-full">
            {[1, 2, 3, 4].map((el, idx) => (
              <Highlight key={idx} />
            ))}
            <CreateHighlight />
          </section>

          {/* Media section */}
          <section className="border-t border-hover-primary">
            <div className="flex items-center justify-center">
              <MediaTab />
            </div>
          </section>

          {/* Posts Section */}
          <section>
            <div className="grid grid-cols-3 gap-1">
              {myUserPosts.map((post, idx) => (
                <Post key={idx} {...post} />
              ))}
            </div>
          </section>
        </div>
      </div>:<EditProfile setEditProfile={setEditProfile} />}
    </>
  );
};

export default MyProfile;
