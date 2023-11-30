import React, { useState } from "react";
import {
  BookmarkSimple,
  ChatCircle,
  Heart,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import redHeart from "../../assets/icons/redHeart.svg";
import bookmark from "../../assets/icons/bookmark.svg";
import { DotsThree } from "@phosphor-icons/react/dist/ssr";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { detectLike, detectSave } from "../../services/appServices";
import {
  likePostAsync,
  removeLikedPostAsync,
  removeSavedPostAsync,
  savePostAsync,
} from "../../redux/features/app/appAsyncThunk";
import toast from "react-hot-toast";
import { socket } from "../../socket";

const SideButtons = ({ _id, likes, comments, saved, user }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const { loggedInUserId, loginStatus } = useSelector((state) => state.auth);
  const { reels } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    detectLike(likes, loggedInUserId, setLiked);
    detectSave(saved, loggedInUserId, setIsSaved);
  }, [reels]);

  const handleLike = () => {
    if (loginStatus === "success") {
      const data = {
        postId: _id,
        userId: loggedInUserId,
        type: "reel",
      };
      dispatch(likePostAsync(data));
      socket.emit("send-notification", {
        type: "like",
        userId: user._id,
      });
      setLiked(true);
    } else {
      toast.error("Login your account");
    }
  };

  const handleRemoveLike = () => {
    if (loginStatus === "success") {
      dispatch(
        removeLikedPostAsync({
          postId: _id,
          userId: loggedInUserId,
          type: "reel",
        })
      );
      setLiked(false);
    } else {
      toast.error("Login your account");
    }
  };

  const handleSavePost = () => {
    if (loginStatus !== "success") {
      return toast.error("Login your account");
    }

    const data = {
      postId: _id,
      userId: loggedInUserId,
      type: "reel",
    };

    dispatch(savePostAsync(data));
    setIsSaved(true);
  };

  const handleRemoveSaved = () => {
    if (loginStatus !== "success") {
      return toast.error("Login your account");
    }

    const data = {
      postId: _id,
      userId: loggedInUserId,
      type: "reel",
    };

    dispatch(removeSavedPostAsync(data));

    setIsSaved(false);
  };

  return (
    <div className="flex flex-col space-y-6 items-center justify-end text-text-primary max-h-[530px] h-full">
      <div className="flex flex-col justify-center space-y-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          {!liked ? (
            <Heart
              size={28}
              onClick={() => handleLike()}
              className="cursor-pointer"
            />
          ) : (
            <img
              onClick={() => handleRemoveLike()}
              src={redHeart}
              alt=""
              width={"28px"}
              className="cursor-pointer likedPost"
            />
          )}
          <span className="text-xs">
            {likes?.length > 0 ? likes.length : "Likes"}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <ChatCircle
            // onClick={() => handlePostView()}
            size={28}
            className="cursor-pointer"
          />
          <span className="text-xs">{comments?.length || comments}</span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <PaperPlaneTilt size={28} className="cursor-pointer" />
          <span className="text-xs">{faker.number.int(1000)}</span>
        </div>
      </div>
      <div className="w-[30px] flex flex-col items-center justify-center space-y-1">
        {!isSaved ? (
          <BookmarkSimple
            onClick={() => handleSavePost()}
            size={30}
            className="cursor-pointer"
          />
        ) : (
          <div className=" w-[30px] h-[30px] flex items-center justify-center">
            <img
              onClick={() => handleRemoveSaved()}
              src={bookmark}
              width={"26px"}
              className="likedPost cursor-pointer"
            />
          </div>
        )}
        <span className="text-xs">{saved?.length}</span>
      </div>
      <DotsThree size={28} className="cursor-pointer" />
      <div className="rounded-md overflow-hidden border border-text-primary cursor-pointer">
        <img
          src={faker.image.avatar()}
          alt=""
          width={28}
          className="hover:opacity-[0.5]"
        />
      </div>
    </div>
  );
};

export default SideButtons;
