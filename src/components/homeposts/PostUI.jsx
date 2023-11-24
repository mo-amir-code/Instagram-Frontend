import React from "react";

const PostUI = () => {
  return (
    <div className="w-[480px] uiEffect">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <div className="w-[35px] h-[35px] rounded-full bg-text-secondary" />
          <div className="flex flex-col items-start justify-center px-3 pt-1 space-y-1">
            <div className="w-36 h-[12px] bg-text-secondary rounded-md" />
            <div className="w-32 h-[8px] bg-text-secondary rounded-md" />
          </div>
        </div>
        <div className="flex items-center pt-1 justify-center">
          <div className="w-6 h-[8px] rounded-md bg-text-secondary" />
        </div>
      </div>

      {/* Content */}
      <div className="w-full h-[450px] bg-text-secondary mt-4 rounded-md" />

      {/* Post Buttons */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-6 ">
          <div className="w-[25px] h-[25px] rounded-full bg-text-secondary" />
          <div className="w-[25px] h-[25px] rounded-full bg-text-secondary" />
          <div className="w-[25px] h-[25px] rounded-full bg-text-secondary" />
        </div>
        <div className="w-[25px] h-[25px] rounded-full bg-text-secondary" />
      </div>

      {/* Post engagement informantion like likes, post description, etc */}

      <div className="mt-4 space-y-1">
        <div className="w-12 h-[10px] rounded-md bg-text-secondary" />
        <div className="w-32 h-[10px] rounded-md bg-text-secondary" />
      </div>

      <div className="w-full h-[16px] bg-text-secondary  rounded-md mt-4" />
    </div>
  );
};

export default PostUI;
