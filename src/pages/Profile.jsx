import { DotsThree } from "@phosphor-icons/react";
import React from "react";
import Highlight from "../components/myprofile/Highlight";
import CreateHighlight from "../components/myprofile/CreateHighlight";
import MediaTab from "../components/myprofile/MediaTab";
import Post from "../components/Post";
import FollowButton from "../components/buttons/FollowButton";
import FollowingButton from "../components/buttons/FollowingButton";
import UserRecommendation from "../components/buttons/UserRecommendation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserAsync } from "../redux/features/user/userSlice";
import ProfileLoader from "../components/loaders/ProfileLoader";
import {
  fetchUserPostAsync,
  followUserAsync,
  unFollowUserAsync,
} from "../redux/features/app/appAsyncThunk";
import { useState } from "react";
import { detectFollow } from "../services/appServices";
import {
  unFollowingUser,
  updateFollowing,
} from "../redux/features/Auth/authSlice";

const Profile = () => {
  const [follow, setFollow] = useState(false);
  const { unknownUserStatus, unknownUserInfo, unknownUserAvatar } = useSelector(
    (state) => state.user
  );
  const { userPosts, changes } = useSelector((state) => state.app);
  const { isLoggedIn, following, loggedInUserId } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const { profile } = useParams();

  useEffect(() => {
    if (unknownUserInfo?.username != profile) {
      dispatch(fetchUserAsync(profile));
      dispatch(fetchUserPostAsync(profile));
    }
    detectFollow(following, unknownUserInfo?.id, setFollow);
  }, []);

  useEffect(() => {
    if (unknownUserInfo) {
      if (unknownUserInfo.id === changes) {
        setFollow(true);
      }
      if (changes?.id && changes?.type) {
        setFollow(false);
      }
    }
  }, [changes]);

  if (unknownUserStatus === "pending" || !unknownUserStatus) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ProfileLoader />
      </div>
    );
  }

  const handleFollowUser = () => {
    const data = {
      postUserName: unknownUserInfo.username,
      postUser: unknownUserInfo.id,
      user: loggedInUserId,
    };
    dispatch(followUserAsync(data));
    dispatch(updateFollowing(unknownUserInfo.id));
    setFollow(true);
  };

  const handleUnFollowUser = () => {
    const data = {
      postUserName: unknownUserInfo.username,
      postUser: unknownUserInfo.id,
      user: loggedInUserId,
    };
    dispatch(unFollowUserAsync(data));
    dispatch(unFollowingUser(unknownUserInfo.id));
  };

  return (
    <div className="text-text-primary">
      <div className="py-8 px-8 space-y-8">
        {/* Profile hero section */}
        <section className="flex">
          <div className="flex justify-center items-center flex-[0.34] py-8">
            <div className="rounded-full overflow-hidden border-r border-hover-primary">
              <img
                src={unknownUserAvatar}
                alt={unknownUserInfo.username}
                width={160}
              />
            </div>
          </div>

          <div className="flex-[0.66] space-y-5">
            <div className="flex items-center justify-start">
              <h1 className="text-lg font-medium">
                {unknownUserInfo.username}
              </h1>

              {isLoggedIn && (
                <div className="flex items-center space-x-3 pl-16">
                  {!follow ? (
                    <FollowButton handleFollowUser={handleFollowUser} />
                  ) : (
                    <FollowingButton handleUnFollowUser={handleUnFollowUser} />
                  )}
                  <UserRecommendation />
                  <DotsThree size={30} />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-6 font-medium">
                <h4>{unknownUserInfo.posts} posts</h4>
                <h4>{unknownUserInfo.followers.length} followers</h4>
                <h4>{unknownUserInfo.following.length} following</h4>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold">
                <h2>{unknownUserInfo.name}</h2>
              </div>

              <div className="text-sm">
                <h4 className="text-text-secondary">
                  {unknownUserInfo.category}
                </h4>
                <p>{unknownUserInfo.bio}</p>
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
            {userPosts.map((el, idx) => (
              <Post key={idx} {...el} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
