import React from "react";
import { ChatTeardropDots, Heart } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { postPageStatusToggle, resetPostPageInfo } from "../redux/features/app/appSlice";
import { useNavigate } from "react-router-dom";

function Post({_id, file, likes, comments, description }) {
  const { postPageInfo } = useSelector((state)=>state.app);
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
    <div onClick={()=>handlePostView()} className="relative group cursor-pointer slideModalUpToDown">
      <img src={file} alt={description} className="w-96 h-72 object-cover" />
      <div className="absolute top-0 left-0 h-full w-full bg-black/20 group-hover:flex hidden justify-center items-center postsHoverSlideAnimation">
        <div className="text-text-primary flex items-center justify-between w-[45%]">
          <div className="flex items-center text-base font-semibold space-x-2">
            <Heart size={22} className="mt-[0.2rem]" />
            <span>{likes.length}</span>
          </div>
          <div className="flex items-center text-base font-semibold space-x-2">
            <ChatTeardropDots size={22} className="mt-[0.2rem]" />
            <span>{comments || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
