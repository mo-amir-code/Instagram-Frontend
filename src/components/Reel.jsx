import { faker } from "@faker-js/faker";
import { ChatTeardropDots, Heart } from "@phosphor-icons/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postPageStatusToggle, resetPostPageInfo } from "../redux/features/app/appSlice";

const Reel = ({_id, file, likes, comments, description }) => {
  const { postPageInfo } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePostView = () => {
    if (postPageInfo?._id !== _id) {
      dispatch(resetPostPageInfo());
    }
    dispatch(postPageStatusToggle());
    navigate(`/p/${_id}`);
  };

  return (
    <div onClick={()=>handlePostView()} className="row-span-2 relative group cursor-pointer slideModalUpToDown">
      <video className="object-cover" autoPlay loop muted>
        <source src={file} />
      </video>
      <div className="absolute group-hover:flex hidden top-0 left-0 h-full w-full bg-black/20 justify-center items-center postsHoverSlideAnimation">
        <div className="text-text-primary flex items-center justify-between w-[45%]">
          <div className="flex items-center text-base font-semibold space-x-2">
            <Heart size={22} className="mt-[0.2rem]" />
            <span>{likes.length}</span>
          </div>
          <div className="flex items-center text-base font-semibold space-x-2">
            <ChatTeardropDots size={22} className="mt-[0.2rem]" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reel;
