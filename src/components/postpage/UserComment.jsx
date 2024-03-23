import React, { useState } from "react";
import { faker } from "@faker-js/faker";
import { Heart } from "@phosphor-icons/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commentDisLikeAsync,
  commentLikeAsync,
} from "../../redux/features/app/appAsyncThunk";
import redHeart from "../../assets/icons/redheart.svg";
import { detectLike } from "../../services/appServices";
import toast from "react-hot-toast";

const UserComment = ({ comment }) => {
  const [viewReply, setViewReply] = useState(false);
  const [commentLike, setCommentLike] = useState(false);
  const { postPageInfo } = useSelector((state) => state.app);
  const { loggedInUserId, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (comment.reply.length > 0) {
      setViewReply(true);
    }
    detectLike(comment.likes, loggedInUserId, setCommentLike);
  }, [postPageInfo]);

  const handleCommentLike = () => {
    if (!isLoggedIn) {
      return toast.error("Login your account");
    }
    const data = {
      commentPostId: postPageInfo._id,
      likedCommentId: comment._id,
      user: loggedInUserId,
    };
    dispatch(commentLikeAsync(data));
  };

  const handleCommentDisLike = () => {
    if (!isLoggedIn) {
      return toast.error("Login your account");
    }
    const data = {
      commentPostId: postPageInfo._id,
      unLikedCommentId: comment._id,
      user: loggedInUserId,
    };
    dispatch(commentDisLikeAsync(data));
  };

  return (
    <div className="flex flex-col">
      {/* comment */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* profile image */}
          <div>
            <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
              <img
                src={comment.user.avatar}
                alt={comment.user.username}
                width={"30px"}
              />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <p className="font-medium">
              {comment.user.username}{" "}
              <span className="font-normal ml-2">{comment.comment}</span>
            </p>
          </div>
        </div>
        <div className="cursor-pointer flex items-center space-x-2">
          {comment.likes.length > 0 && (
            <span className="text-xs text-text-secondary -translate-y-[1px]">
              {comment.likes.length}
            </span>
          )}
          {commentLike ? (
            <img
              src={redHeart}
              onClick={() => handleCommentDisLike()}
              width={14}
              className="likedPost"
            />
          ) : (
            <Heart onClick={() => handleCommentLike()} size={14} />
          )}
        </div>
      </div>
      {/* reply */}
      <div className="px-12 pt-2">
        {comment.reply.length > 0 && (
          <span
            onClick={() => setViewReply((prev) => !prev)}
            className="text-xs font-medium text-text-secondary cursor-pointer"
          >
            {" "}
            <span>____</span>{" "}
            {viewReply
              ? "Hide replies"
              : `View replies (${comment.reply.length})`}
          </span>
        )}
        {viewReply && (
          <div className="space-y-3 py-4">
            {[1, 2, 3, 4, 5].map((el) => (
              <div key={el} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* profile image */}
                  <div>
                    <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                      <img src={faker.image.avatar()} alt="" width={"30px"} />
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <p className="font-medium">
                      mr_aamir0_1{" "}
                      <span className="font-normal ml-2">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit.
                      </span>
                    </p>
                  </div>
                </div>
                <div className="cursor-pointer">
                  <Heart size={14} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserComment;
