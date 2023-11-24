import { SpeakerHigh, SpeakerSimpleSlash } from "@phosphor-icons/react";
import React, { useState } from "react";

const Speaker = ({ videoRef }) => {
  const [muted, setMuted] = useState(false);

  const handleMute = () => {
    if (videoRef.current) {
      if (muted) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
      setMuted(!muted);
    }
  };

  return (
    <div
      onClick={() => handleMute()}
      className="absolute right-2 top-2 w-[40px] h-[40px] rounded-full bg-modal-bg flex items-center justify-center text-text-primary cursor-pointer"
    >
      {muted ? <SpeakerSimpleSlash size={15} /> : <SpeakerHigh size={15} />}
    </div>
  );
};

export default Speaker;
