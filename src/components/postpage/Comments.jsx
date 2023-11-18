import React from "react";
import UserComment from "./UserComment";

const Comments = ({ description, user, comments }) => {
  return (
    <div className="flex-grow py-3 space-y-6 flex flex-col overflow-y-auto px-4">
      {/* Post User Description */}
      <div className="flex items-center space-x-4">
        {/* profile image */}
        <div className="flex items-start h-full pt-2 justify-center">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden bg-red-600">
            <img src={user.avatar} alt={user.username} width={"30px"} />
          </div>
        </div>
        <div className="flex items-center text-sm">
          <p className="font-medium">
            {user.username}{" "}
            <span className="font-normal ml-2">{description}</span>
          </p>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-4">
        {comments.map((el, idx) => (
          <UserComment key={idx} comment={el} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
