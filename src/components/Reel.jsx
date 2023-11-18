import { faker } from "@faker-js/faker";
import { ChatTeardropDots, Heart } from "@phosphor-icons/react";
import React from "react";

const Reel = ({file, likes, comments, description}) => {
  return (
    <div className="row-span-2 relative group cursor-pointer slideModalUpToDown">
      <img
        src={file}
        alt={description}
        className="w-96 h-[36.5rem] object-cover"
      />
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
