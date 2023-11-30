import React, { useEffect, useRef, useState } from "react";
import { GearSix } from "@phosphor-icons/react";
import Highlight from "../components/myprofile/Highlight";
import CreateHighlight from "../components/myprofile/CreateHighlight";
import MediaTab from "../components/myprofile/MediaTab";
import EditProfileButton from "../components/buttons/EditProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyUserAsync } from "../redux/features/user/userSlice";
import ProfileLoader from "../components/loaders/ProfileLoader";
import { fetchMyUserPostAsync } from "../redux/features/app/appAsyncThunk";
import EditProfile from "./EditProfile";
import avatar from "../assets/images/avatar.jpg";
import NoPosts from "../components/profiles/NoPosts";
import SavedPosts from "../components/profiles/SavedPosts";
import Post from "../components/profiles/Post";
import { useParams } from "react-router-dom";

const MyProfile = () => {
  const [mediaTab, setMediaTab] = useState(1);
  const { loggedInUserId } = useSelector((state) => state.auth);
  const { userInfo, userAvatar, status, width } = useSelector(
    (state) => state.user
  );
  const { myUserPosts, myUserSaved } = useSelector((state) => state.app);
  const [editProfile, setEditProfile] = useState(false);
  const dispatch = useDispatch();
  const { profile } = useParams();

  useEffect(() => {
    if (!userInfo || userInfo?.username !== profile) {
      dispatch(fetchMyUserAsync(loggedInUserId));
    }
    dispatch(fetchMyUserPostAsync(loggedInUserId));
  }, []);

  if (status === "pending" || !userInfo) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <ProfileLoader />
      </div>
    );
  }

  return (
    <div className={`h-full max-w-7xl overflow-y-auto`}>
      {!editProfile ? (
        <div className="text-text-primary">
          <div className={`py-8 px-8`}>
            <div className="space-y-8 pb-8 max-[830px]:hidden">
              {/* // desktop view */}
              {/* Profile hero section */}
              <section className={`flex `}>
                <div className="flex justify-center items-center flex-[0.34] py-8">
                  <div className="rounded-full overflow-hidden border-r border-hover-primary ${} w-40 h-40">
                    <img
                      src={userAvatar || avatar}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-[0.66] space-y-5">
                  <div className="flex items-center justify-start">
                    <h1 className="text-lg font-medium">
                      {userInfo?.username}
                    </h1>

                    <div className="flex items-center space-x-3 pl-16">
                      <EditProfileButton setEditProfile={setEditProfile} />
                      {/* <MessageButton /> */}
                      <GearSix size={30} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-6 font-medium">
                      <h4>{userInfo?.posts} posts</h4>
                      <h4>{userInfo?.followers.length} followers</h4>
                      <h4>{userInfo?.following.length} following</h4>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-bold">
                      <h2>{userInfo?.name}</h2>
                    </div>

                    <div className="text-sm">
                      <h4 className="text-text-secondary">
                        {userInfo?.category}
                      </h4>
                      <p>{userInfo?.bio}</p>
                      {/* <p className="mt-2 font-semibold">
                  79 accounts reached in the last 30 days. View insights
                </p> */}
                    </div>
                  </div>
                </div>
              </section>
              {/* Profile Highlights section */}
              <section className="flex  items-center px-14 space-x-10 overflow-x-auto">
                {[1, 2, 3, 4].map((el, idx) => (
                  <Highlight key={idx} mode={"desktop"} />
                ))}
                <CreateHighlight mode={"desktop"} />
              </section>
            </div>

            <div className="space-y-2 max-[830px]:block hidden">
              {/* // mobile view */}
              <div>
                <section className={`flex space-x-4`}>
                  <div className="flex justify-center items-center py-8">
                    <div className="rounded-full overflow-hidden border-r border-hover-primary w-14 h-14">
                      <img
                        src={userAvatar || avatar}
                        alt=""
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-grow space-y-2">
                    <div className="flex items-center space-x-4">
                      <h1 className="text-lg font-normal text-clip">
                        {userInfo?.username}
                      </h1>

                      <div className="flex items-center">
                        <GearSix size={30} />
                      </div>
                    </div>
                    <EditProfileButton setEditProfile={setEditProfile} />
                  </div>
                </section>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold">
                  <h2>{userInfo?.name}</h2>
                </div>

                <div className="text-sm">
                  <h className="text-text-secondary">{userInfo?.category}</h>
                  <p className="text-clip">{userInfo?.bio}</p>
                </div>
              </div>

              <div className="space-y-6 pt-4">
                {/* Profile Highlights section */}
                <section className="flex  items-center space-x-4 overflow-x-auto">
                  {[1, 2].map((el, idx) => (
                    <Highlight key={idx} mode="mobile" />
                  ))}
                  <CreateHighlight mode={"mobile"} />
                </section>

                <div>
                  <div className="flex items-center justify-around space-x-6 text-sm font-normal border-t border-hover-primary py-3">
                    <h4 className="flex flex-col items-center justify-center leading-5">
                      <span>{userInfo?.posts}</span>{" "}
                      <span className="text-text-secondary">posts</span>
                    </h4>
                    <h4 className="flex flex-col items-center justify-center leading-5">
                      <span>{userInfo?.followers.length}</span>{" "}
                      <span className="text-text-secondary">followers</span>
                    </h4>
                    <h4 className="flex flex-col items-center justify-center leading-5">
                      <span>{userInfo?.following.length}</span>{" "}
                      <span className="text-text-secondary">following</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* Media section */}
              <section className="border-t  border-hover-primary">
                <div className="flex items-center justify-center">
                  <MediaTab
                    selected={mediaTab}
                    setSelected={setMediaTab}
                    type={"myProfile"}
                  />
                </div>
              </section>

              {/* Posts Section */}
              <section>
                <div
                  className={`${
                    myUserPosts.length > 0 && mediaTab !== 3
                      ? ` ${
                          myUserPosts.filter((el) => el.type !== "post")
                            .length != 0
                            ? "grid"
                            : myUserPosts.filter((el) => el.type === "post")
                                .length > 0 &&
                              mediaTab === 1 &&
                              "grid"
                        } grid-cols-3 gap-1`
                      : null
                  } `}
                >
                  {(() => {
                    switch (mediaTab) {
                      case 1:
                        return myUserPosts.length > 0 ? (
                          myUserPosts.map((el, idx) => (
                            <Post key={idx} {...el} />
                          ))
                        ) : (
                          <NoPosts message={"Upload New Posts"} />
                        );
                      case 2:
                        return myUserPosts.filter((el) => el.type !== "post")
                          .length > 0 ? (
                          myUserPosts
                            .filter((el) => el.type !== "post")
                            .map((el, idx) => <Post key={idx} {...el} />)
                        ) : (
                          <NoPosts message={"Upload New Reels"} />
                        );
                      default:
                        return myUserSaved.length > 0 ? (
                          <SavedPosts myUserSaved={myUserSaved} />
                        ) : (
                          <NoPosts message={"No Saved Posts"} />
                        );
                    }
                  })()}
                </div>
              </section>
            </div>
          </div>
        </div>
      ) : (
        <EditProfile setEditProfile={setEditProfile} />
      )}
    </div>
  );
};

export default MyProfile;
