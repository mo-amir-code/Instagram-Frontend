import React from "react";
import { calculateUploadedTime } from "../../services/appServices";
import avatar from "../../assets/images/avatar.jpg"

const CmtNtf = ({ postId, thumbnail, contentType, user, message, createdAt,handleUserView, handlePostView }) => {
  return (
    <div className="flex items-center justify-between text-text-primary py-2 px-2 hover:bg-hover-primary rounded-lg transition duration-200 cursor-pointer space-x-2">
      <div onClick={()=>handleUserView({username:user.username})} className="flex justify-center items-center space-x-3">
        <div className="flex items-center justify-center">
          <div className="rounded-full overflow-hidden w-[45px] h-[45px] flex items-center justify-centerr">
            <img src={user?.avatar || avatar} alt={user?.username} width={"45px"} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-start">
          <h4 className="text-sm font-medium text-start">
            {user?.username}{" "}
            <span className="font-normal">commented: {message} on your {contentType}</span>
          </h4>
          <p className="text-xs text-start w-full text-text-secondary mt-[2px]">
            {calculateUploadedTime(createdAt)}
          </p>
        </div>
      </div>
      <div onClick={()=>handlePostView({postId})} className="cursor-pointer">
        <img src={thumbnail} alt={contentType} width={"40px"} />
        {/* <button className="text-sm font-semibold bg-text-link text-text-primary py-[0.4rem] px-5 rounded-lg">
          Follow
        </button> */}
      </div>
    </div>
  );
};

export default CmtNtf;
