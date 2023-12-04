import { DotsThree } from "@phosphor-icons/react";
import React from "react";
import Highlight from "../components/myprofile/Highlight";
import CreateHighlight from "../components/myprofile/CreateHighlight";
import MediaTab from "../components/myprofile/MediaTab";
import Post from "../components/profiles/Post";
import FollowButton from "../components/buttons/FollowButton";
import FollowingButton from "../components/buttons/FollowingButton";
import UserRecommendation from "../components/buttons/UserRecommendation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import MessageButton from "../components/buttons/MessageButton";
import { handleStartChat } from "../services/socket";
import { socket } from "../socket";
import {
  setNavModal,
  currentConversationStatusUpdate,
  updateCurrentConversation,
  toggleMobileMessage,
} from "../redux/features/app/appSlice";
import avatar from "../assets/images/avatar.jpg";
import NoPosts from "../components/profiles/NoPosts";
import NotFound from "./NotFound";

const Profile = () => {
  const [follow, setFollow] = useState(false);
  const [mediaTab, setMediaTab] = useState(1);
  const navigate = useNavigate();
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
  }, [unknownUserInfo]);

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

  if (unknownUserStatus === "pending") {
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

  const handleMessage = () => {
    const actions = {
      dispatch,
      currentConversationStatusUpdate,
      socket,
      updateCurrentConversation,
    };
    const data = {
      userId: unknownUserInfo.id,
      loggedInUserId,
    };
    dispatch(currentConversationStatusUpdate("pending"));
    dispatch(toggleMobileMessage(false));
    handleStartChat(actions, data);
    dispatch(setNavModal("messages"));
    navigate("/direct/inbox");
  };

  if (unknownUserStatus === "User not found!") {
    return <NotFound />;
  } else if (unknownUserStatus === "error" || !unknownUserStatus) {
    return <NotFound message="Something went wrong" />;
  }

  return (
    <div className="text-text-primary h-full overflow-y-auto">
      <div className="text-text-primary">
        <div className={`py-8 px-8`}>
          <div className="space-y-8 pb-8 max-[830px]:hidden">
            {/* // desktop view */}
            {/* Profile hero section */}
            <section className={`flex `}>
              <div className="flex justify-center items-center flex-[0.34] py-8">
                <div className="rounded-full overflow-hidden border-r border-hover-primary w-40 h-40">
                  <img
                    src={unknownUserAvatar || avatar}
                    alt=""
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-[0.66] space-y-5">
                <div className="flex items-center justify-start">
                  <h1 className="text-lg font-medium">
                    {unknownUserInfo?.username}
                  </h1>

                  {isLoggedIn && (
                    <div className="flex items-center space-x-3 pl-16">
                      {!follow ? (
                        <FollowButton handleFollowUser={handleFollowUser} />
                      ) : (
                        <FollowingButton
                          handleUnFollowUser={handleUnFollowUser}
                        />
                      )}
                      <MessageButton handleMessage={handleMessage} />
                      <UserRecommendation />
                      <DotsThree size={30} />
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-6 font-medium">
                    <h4>{unknownUserInfo?.posts} posts</h4>
                    <h4>{unknownUserInfo?.followers.length} followers</h4>
                    <h4>{unknownUserInfo?.following.length} following</h4>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold">
                    <h2>{unknownUserInfo?.name}</h2>
                  </div>

                  <div className="text-sm">
                    <h4 className="text-text-secondary">
                      {unknownUserInfo?.category}
                    </h4>
                    <p>{unknownUserInfo?.bio}</p>
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
                      src={unknownUserAvatar || avatar}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-grow space-y-2">
                  <div className="flex items-center space-x-4">
                    <h1 className="text-lg font-normal text-clip">
                      {unknownUserInfo?.username}
                    </h1>

                    <div className="flex items-center">
                      <DotsThree size={30} />
                    </div>
                  </div>
                  <div className="flex items-center justify-start space-x-2">
                    {!follow ? (
                      <FollowButton handleFollowUser={handleFollowUser} />
                    ) : (
                      <FollowingButton
                        handleUnFollowUser={handleUnFollowUser}
                      />
                    )}
                    <MessageButton handleMessage={handleMessage} />
                  </div>
                </div>
              </section>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold">
                <h2>{unknownUserInfo?.name}</h2>
              </div>

              <div className="text-sm">
                <h className="text-text-secondary">
                  {unknownUserInfo?.category}
                </h>
                <p className="text-clip">{unknownUserInfo?.bio}</p>
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
                    <span>{unknownUserInfo?.posts}</span>{" "}
                    <span className="text-text-secondary">posts</span>
                  </h4>
                  <h4 className="flex flex-col items-center justify-center leading-5">
                    <span>{unknownUserInfo?.followers.length}</span>{" "}
                    <span className="text-text-secondary">followers</span>
                  </h4>
                  <h4 className="flex flex-col items-center justify-center leading-5">
                    <span>{unknownUserInfo?.following.length}</span>{" "}
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
                  type={"profile"}
                />
              </div>
            </section>

            {/* Posts Section */}
            <section>
              <div
                className={`${
                  userPosts.length > 0 && mediaTab !== 3
                    ? ` ${
                        userPosts.filter((el) => el.type !== "post").length != 0
                          ? "grid"
                          : userPosts.filter((el) => el.type === "post")
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
                      return userPosts.length > 0 ? (
                        userPosts.map((el, idx) => (
                          <Post key={idx} {...el} postType="post" />
                        ))
                      ) : (
                        <NoPosts message={"Upload New Posts"} />
                      );
                    case 2:
                      return userPosts.filter((el) => el.type !== "post")
                        .length > 0 ? (
                        userPosts
                          .filter((el) => el.type !== "post")
                          .map((el, idx) => (
                            <Post key={idx} {...el} postType="reel" />
                          ))
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
    </div>
  );
};

export default Profile;

// {/* <div className="py-8 px-8 space-y-8">
//   {/* Profile hero section */}
//   <section className="flex">
//     <div className="flex justify-center items-center flex-[0.34] py-8">
//       <div className="rounded-full overflow-hidden border-r border-hover-primary">
//         <img
//           src={unknownUserAvatar || avatar}
//           alt={unknownUserInfo.username}
//           width={160}
//         />
//       </div>
//     </div>

//     <div className="flex-[0.66] space-y-5">
//       <div className="flex items-center justify-start">
//         <h1 className="text-lg font-medium">{unknownUserInfo.username}</h1>

//         {isLoggedIn && (
//           <div className="flex items-center space-x-3 pl-16">
//             {!follow ? (
//               <FollowButton handleFollowUser={handleFollowUser} />
//             ) : (
//               <FollowingButton handleUnFollowUser={handleUnFollowUser} />
//             )}
//             <MessageButton handleMessage={handleMessage} />
//             <UserRecommendation />
//             <DotsThree size={30} />
//           </div>
//         )}
//       </div>

//       <div>
//         <div className="flex items-center space-x-6 font-medium">
//           <h4>{unknownUserInfo.posts} posts</h4>
//           <h4>{unknownUserInfo.followers.length} followers</h4>
//           <h4>{unknownUserInfo.following.length} following</h4>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <div className="text-xs font-bold">
//           <h2>{unknownUserInfo.name}</h2>
//         </div>

//         <div className="text-sm">
//           <h4 className="text-text-secondary">{unknownUserInfo.category}</h4>
//           <p>{unknownUserInfo.bio}</p>
//           {/* <p className="mt-2 font-semibold">
//                   79 accounts reached in the last 30 days. View insights
//                 </p> */}
//         </div>
//       </div>
//     </div>
//   </section>

//   {/* Profile Highlights section */}
//   <section className="flex items-center px-14 space-x-10 overflow-x-auto w-full">
//     {[1, 2, 3, 4].map((el, idx) => (
//       <Highlight key={idx} />
//     ))}
//     <CreateHighlight />
//   </section>

//   {/* Media section */}
//   <section className="border-t border-hover-primary">
//     <div className="flex items-center justify-center">
//       <MediaTab
//         selected={mediaTab}
//         setSelected={setMediaTab}
//         type={"profile"}
//       />
//     </div>
//   </section>

//   {/* Posts Section */}
//   <section>
//     <div className={`${userPosts.length > 0 ? "grid grid-cols-3 gap-1" : ""}`}>
//       {(() => {
//         switch (mediaTab) {
//           case 1:
//             return userPosts.length > 0 ? (
//               userPosts.map((el, idx) => <Post key={idx} {...el} />)
//             ) : (
//               <NoPosts message={"No Posts Yet"} />
//             );
//           case 2:
//             return userPosts.filter((el) => el.type !== "post").length > 0 ? (
//               userPosts
//                 .filter((el) => el.type !== "post")
//                 .map((el, idx) => <Post key={idx} {...el} />)
//             ) : (
//               <NoPosts message={"No Reels Yet"} />
//             );
//           default:
//             return;
//         }
//       })()}
//     </div>
//   </section>
// </div> */}
