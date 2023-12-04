import React from "react";
import { ChatTeardropDots, Heart } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import {
  postPageStatusToggle,
  resetPostPageInfo,
} from "../../redux/features/app/appSlice";
import { useNavigate } from "react-router-dom";

function Post({ _id, file, likes, comments, description, type }) {
  const { postPageInfo, width } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePostView = () => {
    if (postPageInfo?._id !== _id) {
      dispatch(resetPostPageInfo());
    }
    dispatch(postPageStatusToggle(true));
    navigate(`/p/${_id}`);
  };

  return (
    <div
      onClick={() => handlePostView()}
      className="relative group cursor-pointer slideModalUpToDown overflow-hidden border border-text-secondary flex justify-center items-center responivePosts max-w-[20rem] max-h-[20rem]"
    >
      {type === "post" ? (
        <img src={file} alt={description} className="object-cover" />
      ) : (
        <div className="flex items-center justify-center">
          <video className="object-cover" muted>
            <source src={file} />
          </video>
        </div>
      )}
      <div className="absolute top-0 left-0 h-full w-full bg-black/20 group-hover:flex hidden justify-center items-center postsHoverSlideAnimation">
        <div
          className={`text-text-primary ${
            width < 1280 ? "text-sm font-medium" : "text-base font-semibold"
          } flex items-center justify-between ${
            width < 1280 ? "space-x-2" : "space-x-3"
          }`}
        >
          <div className={`flex items-center space-x-1 `}>
            <Heart size={width < 1280 ? 16 : 22} className="mt-[0.2rem]" />
            <span>{likes.length}</span>
          </div>
          <div className={`flex items-center space-x-1`}>
            <ChatTeardropDots
              size={width < 1280 ? 16 : 22}
              className="mt-[0.2rem]"
            />
            <span>{comments || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
