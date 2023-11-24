import React, { Suspense, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import Speaker from "./Speaker";
import PlayButton from "./PlayButton";
import { useEffect } from "react";
import {
  followUserAsync,
  unFollowUserAsync,
} from "../../redux/features/app/appAsyncThunk";
import {
  unFollowingUser,
  updateFollowing,
} from "../../redux/features/Auth/authSlice";
import { detectFollow } from "../../services/appServices";
import { Link } from "react-router-dom";
import ReelUI from "./ReelUI";

const Video = ({ file, user, description }) => {
  const [isPlay, setIsPlay] = useState(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);
  const videoRef = useRef();

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlay) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlay(!isPlay);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
          setIsPlay(entry.isIntersecting);
          if (entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.2 } // Adjust the threshold as needed
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    // Cleanup: Stop observing when the component unmounts
    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={targetRef}
      className="w-[300px] h-full rounded-md overflow-hidden flex items-center justify-center videoShadow relative"
    >
      <Suspense fallback={<ReelUI />}>
        <video
          onClick={handlePlayToggle}
          ref={videoRef}
          className="object-cover"
          autoPlay={isPlay}
          loop
        >
          <source src={file} />
        </video>
      </Suspense>
      <VideoDetails user={user} description={description} />
      <Speaker videoRef={videoRef} />
      <PlayButton
        videoRef={videoRef}
        handlePlayToggle={handlePlayToggle}
        isPlay={isPlay}
      />
    </div>
  );
};

const VideoDetails = ({ user, description }) => {
  const [follow, setFollow] = useState(false);
  const [followButton, setFollowButton] = useState(false);
  const { isLoggedIn, loggedInUserId, following } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    detectFollow(following, user._id, setFollow);
    if (user._id !== loggedInUserId && isLoggedIn) {
      setFollowButton(true);
    }
  }, []);

  const handleUserProfile = () => {};

  const handleFollowUser = () => {
    const data = {
      postUserName: user.username,
      postUser: user._id,
      user: loggedInUserId,
    };
    dispatch(followUserAsync(data));
    dispatch(updateFollowing(user._id));
    setFollow(true);
  };

  const handleUnFollowUser = () => {
    const data = {
      postUserName: user.username,
      postUser: user._id,
      user: loggedInUserId,
    };
    dispatch(unFollowUserAsync(data));
    dispatch(unFollowingUser(user._id));
    setFollow(false);
  };

  return (
    <div className="absolute bottom-0 left-0 px-4 py-2">
      <div className="text-text-primary space-y-4">
        <div className="flex items-center justify-start space-x-3">
          <div className="rounded-full overflow-hidden w-[35px] h-[35px]">
            <img src={user?.avatar} alt={user?.username} width={"35px"} />
          </div>
          <div className="flex flex-col items-center justify-start">
            <h4 className="text-sm font-medium space-x-1">
              <span
                onClick={() => handleUserProfile()}
                className="cursor-pointer"
              >
                <Link to={`/${user.username}`}>{user?.username}</Link>
              </span>
              {followButton && (
                <>
                  <span> • </span>
                  <span className="text-sm text-text-primary py-1 px-2 rounded-lg border-[2px] border-hover-primary font-medium cursor-pointer">
                    {isLoggedIn && follow ? (
                      <span onClick={() => handleUnFollowUser()}>
                        Following
                      </span>
                    ) : (
                      <span onClick={() => handleFollowUser()}>Follow</span>
                    )}
                  </span>
                </>
              )}
            </h4>
          </div>
        </div>
        <div>
          <p className="text-sm">
            {description.slice(0, 15)}{" "}
            <span className="text-text-secondary cursor-pointer">...more</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Video;
