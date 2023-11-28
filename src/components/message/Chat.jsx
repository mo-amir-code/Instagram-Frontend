import React from "react";
import { faker } from "@faker-js/faker";
// import { X } from "@phosphor-icons/react";
import eAvatar from "../../assets/images/avatar.jpg";

const Chat = ({
  convId,
  id,
  avatar,
  username,
  name,
  handleClick,
  unread,
  convs,
}) => {
  return (
    <div
      onClick={() => handleClick({ id: convId, userId: id })}
      className={`relative flex items-center justify-between text-text-primary py-2 px-6 ${
        convs ? "hover:bg-hover-primary" : "hover:bg-black/75"
      } transition duration-200 cursor-pointer`}
    >
      {/* {console.log(id, convId)} */}
      <div className="flex justify-start space-x-3">
        <div className="rounded-full overflow-hidden w-[45px] h-[45px]">
          <img src={avatar || eAvatar} alt={username} width={"45px"} />
        </div>
        <div className="flex flex-col items-center justify-start">
          <h4 className="text-sm font-medium text-start">{username}</h4>
          <p className="text-xs text-start w-full text-text-secondary mt-[2px]">
            {name}
          </p>
        </div>
      </div>
      {/* <div className="cursor-pointer">
        <button className="text-xs font-medium">
          <X size={20} />
        </button>
      </div> */}
      <span
        className={`absolute right-4 top-[32%] bg-[#3B82F6] rounded-full w-[20px] h-[20px] flex items-center justify-center text-xs font-semibold text-text-primary ${
          unread > 0 ? "scaleIn" : "scaleOut"
        }`}
      >
        {unread}
      </span>
    </div>
  );
};

export default Chat;
