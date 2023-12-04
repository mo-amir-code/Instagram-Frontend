import { faker } from "@faker-js/faker";
import { ChatTeardropDots, Heart } from "@phosphor-icons/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  postPageStatusToggle,
  resetPostPageInfo,
} from "../redux/features/app/appSlice";

const Reel = ({ _id, file, likes, comments, description }) => {
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
      className="row-span-2 relative group flex justify-center items-center cursor-pointer slideModalUpToDown border border-text-secondary overflow-hidden"
    >
      <video className="object-cover" autoPlay loop muted>
        <source src={file} />
      </video>
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
};

export default Reel;
