import React, { useEffect, useRef, useState } from "react";
import {
  BookmarkSimple,
  ChatCircle,
  DotsThree,
  Heart,
  PaperPlaneTilt,
  Smiley,
} from "@phosphor-icons/react";
import {
  calculateUploadedTime,
  detectFollow,
  detectLike,
  detectSave,
} from "../../services/appServices";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import EmojiPickerModal from "../createposts/EmojiPickerModal";
import redHeart from "../../assets/icons/redHeart.svg";
import bookmark from "../../assets/icons/bookmark.svg";
import toast from "react-hot-toast";
import {
  followUserAsync,
  likePostAsync,
  postCommentAsync,
  removeLikedPostAsync,
  removeSavedPostAsync,
  savePostAsync,
  unFollowUserAsync,
} from "../../redux/features/app/appAsyncThunk";
import {
  postPageStatusToggle,
  resetPostPageInfo,
} from "../../redux/features/app/appSlice";
import { useNavigate } from "react-router-dom";
import { unFollowingUser, updateFollowing } from "../../redux/features/Auth/authSlice";

const Post = ({
  _id,
  user,
  file,
  description,
  comments,
  likes,
  saved,
  type,
  createdAt,
}) => {
  const { loginStatus, loggedInUserId, following } = useSelector(
    (state) => state.auth
  );
  const { changes } = useSelector((state) => state.app);
  const [inputComment, setInputComment] = useState("");
  const [emojiModal, setEmojiModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [followButton, setFollowButton] = useState(false);
  const [follow, setFollow] = useState(false);
  const dispatch = useDispatch();
  const commentRef = useRef();
  const navigate = useNavigate();
  const { postPageInfo } = useSelector((state) => state.app);

  useEffect(() => {
    detectLike(likes, loggedInUserId, setLiked);
    detectSave(saved, loggedInUserId, setIsSaved);
    if (user._id !== loggedInUserId) {
      setFollowButton(true);
    }
    detectFollow(following, user._id, setFollow);
  }, []);

  useEffect(() => {
    if (_id === changes) {
      commentRef.current.value = "";
    }
    if (user._id === changes) {
      setFollow(true);
    }
    if (changes?.id && changes?.type) {
      setFollow(false);
    }
  }, [changes]);

  const handleComment = (e) => {
    setInputComment(e.target.value);
  };

  const handleLike = () => {
    if (loginStatus === "success") {
      dispatch(likePostAsync({ postId: _id, userId: loggedInUserId }));
      setLiked(true);
    } else {
      toast.error("Login your account");
    }
  };

  const handleRemoveLike = () => {
    if (loginStatus === "success") {
      dispatch(removeLikedPostAsync({ postId: _id, userId: loggedInUserId }));
      setLiked(false);
    } else {
      toast.error("Login your account");
    }
  };

  const handlePostComment = () => {
    if (loginStatus !== "success") {
      return toast.error("Login your account");
    } else if (inputComment.length === 0) {
      return toast.error("Please enter atleast one word");
    }

    const data = {
      postId: _id,
      comment: {
        user: loggedInUserId,
        comment: inputComment,
      },
    };

    dispatch(postCommentAsync(data));
  };

  const handleSavePost = () => {
    if (loginStatus !== "success") {
      return toast.error("Login your account");
    }

    const data = {
      postId: _id,
      userId: loggedInUserId,
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
    };

    dispatch(removeSavedPostAsync(data));

    setIsSaved(false);
  };

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
  };

  const handlePostView = () => {
    if (postPageInfo?._id !== _id) {
      dispatch(resetPostPageInfo());
    }
    dispatch(postPageStatusToggle());
    navigate(`/p/${_id}`);
  };

  const handleUserProfile = () => {
    navigate(`${user.username}`);
  };

  return (
    <div className="w-[480px] flex flex-col text-white space-y-2 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start space-x-3">
          <div className="rounded-full overflow-hidden w-[35px] h-[35px]">
            <img src={user.avatar} alt={user.name} width={"35px"} />
          </div>
          <div className="flex flex-col items-center justify-start">
            <h4 className="text-sm font-medium">
              <span
                onClick={() => handleUserProfile()}
                className="cursor-pointer"
              >
                {user.username}
              </span>{" "}
              •{" "}
              <span className="font-normal text-text-secondary">
                {calculateUploadedTime(createdAt)}
              </span>
              {loginStatus === "success" && followButton && (
                <>
                  <span> • </span>
                  <span className="text-sm text-text-link font-medium pl-1 cursor-pointer">
                    {follow ? (
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
            <p className="text-xs text-start w-full">Original Audio</p>
          </div>
        </div>
        <div className="cursor-pointer">
          <DotsThree size={22} />
        </div>
      </div>
      <div
        className={`border border-text-secondary ${
          type === "post" ? "h-[480px]" : "h-[570px]"
        } rounded-sm flex items-center justify-center cursor-pointer`}
      >
        <img src={file} alt={user.name} className="object-cover" />
      </div>
      <div className="space-y-1">
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
            <ChatCircle
              onClick={() => handlePostView()}
              size={26}
              className="cursor-pointer"
            />
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
        <div className="flex items-center justify-start space-x-1 text-sm font-medium">
          <p>{likes.length}</p>
          <span className="">likes</span>
        </div>
        <div>
          <p className="text-sm font-light cursor-pointer">
            <span className="font-medium">{user.username}</span> {description}
          </p>
          {/* <p className="text-sm font-medium text-text-tag">
            #free #scheme #yojana #modi #government #female #india
          </p> */}
        </div>
      </div>
      {comments !== 0 && (
        <p
          onClick={() => handlePostView()}
          className="text-text-secondary text-sm font-normal cursor-pointer"
        >
          View all {comments} comments
        </p>
      )}
      <div className="flex w-full items-center relative">
        <TextareaAutosize
          ref={commentRef}
          type="text"
          onChange={handleComment}
          value={inputComment}
          onFocus={() => {
            setEmojiModal(false);
          }}
          className="w-full bg-transparent outline-none text-xs font-medium"
          placeholder="Add a comment..."
          minRows={1}
          maxRows={5}
        />
        <div className="flex items-center justify-center space-x-2">
          <span
            onClick={() => handlePostComment()}
            className="text-sm text-text-link font-medium cursor-pointer"
          >
            {" "}
            Post
          </span>
          <Smiley
            onClick={() => setEmojiModal((prev) => !prev)}
            size={18}
            className="cursor-pointer"
          />
        </div>
        {emojiModal && (
          <div className="absolute right-0 bottom-[120%] h-[300px] overflow-hidden rounded-lg">
            <EmojiPickerModal setInputText={setInputComment} perLine={6} />
          </div>
        )}
      </div>
      <hr className="h-[0.1px]" />
    </div>
  );
};

export default Post;
