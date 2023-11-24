import React from "react";
import { Play } from "@phosphor-icons/react";

const PlayButton = ({ isPlay, handlePlayToggle }) => {
  return (
    <div
      onClick={() => handlePlayToggle()}
      className={`absolute ${isPlay === null && "hidden"}  ${
        !isPlay && "playBgIn"
      } ${
        isPlay && "playBgOut"
      } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bg-primary/60 w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer text-text-primary`}
    >
      <Play
        size={40}
        className={`${isPlay === null && "opacity-0"}  ${!isPlay && "playIn"} ${
          isPlay && "playOut"
        } `}
      />
    </div>
  );
};

export default PlayButton;
