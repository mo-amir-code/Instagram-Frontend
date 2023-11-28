import React, { useEffect, useState } from "react";
import {
  BookmarkSimple,
  ChatCircle,
  Heart,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import redHeart from "../../assets/icons/redHeart.svg";
import bookmark from "../../assets/icons/bookmark.svg";
import { useDispatch, useSelector } from "react-redux";
import { detectLike, detectSave } from "../../services/appServices";
import toast from "react-hot-toast";
import {
  likePostAsync,
  removeLikedPostAsync,
  removeSavedPostAsync,
  savePostAsync,
} from "../../redux/features/app/appAsyncThunk";
import { socket } from "../../socket";

const PostIcons = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const { postPageInfo } = useSelector((state) => state.app);
  const { loggedInUserId, loginStatus } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    detectLike(postPageInfo.likes, loggedInUserId, setLiked);
    detectSave(postPageInfo.saved, loggedInUserId, setIsSaved);
  }, []);

  const handleLike = () => {
    if (loginStatus === "success") {
      const data = {
        postId: postPageInfo._id,
        userId: loggedInUserId,
        type: "post",
      };
      if (postPageInfo.type === "reel") {
        data.type = "reel";
      }
      dispatch(likePostAsync(data));
      socket.emit("send-notification", {
        type: "like",
        userId: postPageInfo.user._id,
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
          postId: postPageInfo._id,
          userId: loggedInUserId,
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
      postId: postPageInfo._id,
      userId: loggedInUserId,
      type: "post",
    };

    if (postPageInfo.type === "reel") {
      data.type = "reel";
    }

    dispatch(savePostAsync(data));
    setIsSaved(true);
  };

  const handleRemoveSaved = () => {
    if (loginStatus !== "success") {
      return toast.error("Login your account");
    }

    const data = {
      postId: postPageInfo._id,
      userId: loggedInUserId,
      type: "post",
    };

    if (postPageInfo.type === "reel") {
      data.type = "reel";
    }

    dispatch(removeSavedPostAsync(data));

    setIsSaved(false);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {!liked ? (
          <Heart
            size={26}
            onClick={() => handleLike()}
            className="cursor-pointer"
          />
        ) : (
          <img
            onClick={handleRemoveLike}
            src={redHeart}
            alt=""
            width={"26px"}
            className="cursor-pointer likedPost"
          />
        )}
        <ChatCircle size={26} className="cursor-pointer" />
        <PaperPlaneTilt size={26} className="cursor-pointer" />
      </div>
      <div>
        {!isSaved ? (
          <BookmarkSimple
            onClick={() => handleSavePost()}
            size={26}
            className="cursor-pointer"
          />
        ) : (
          <img
            onClick={() => handleRemoveSaved()}
            src={bookmark}
            width={"24px"}
            className="likedPost cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostIcons;
