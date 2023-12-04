import { Plus } from "@phosphor-icons/react";
import React from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import eAvatar from "../../assets/images/avatar.jpg";

const YourStory = ({ selectStory }) => {
  const { avatar, username } = useSelector((state) => state.auth);
  const mediaRef = useRef();

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    selectStory(file);
  };

  return (
    <div
      onClick={() => mediaRef.current.click()}
      className="flex flex-col text-white items-center justify-center space-y-1"
    >
      <div className="relative">
        <div
          style={{ border: `2px solid red` }}
          className="rounded-full p-[2px] cursor-pointer overflow-hidden"
        >
          <div className="flex justify-center items-center rounded-full overflow-hidden w-[60px] h-[60px] max-[440px]:w-[50px] max-[440px]:h-[50px]">
            <img
              src={avatar || eAvatar}
              alt={username}
              className="w-[60px] max-[440px]:w-[50px]"
            />
          </div>
        </div>
        <span className="absolute bottom-0 right-0 rounded-full flex items-center justify-center p-1 bg-bg-blue font-extrabold border border-bg-primary ">
          <Plus size={12} />
          <input
            ref={mediaRef}
            onChange={handleChangeFile}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </span>
      </div>
      <p className="text-xs">Your Story</p>
    </div>
  );
};

export default YourStory;
