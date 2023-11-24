import React from "react";
import { useState } from "react";
import { useRef } from "react";

const TextMessage = ({ message, incoming }) => {
  const bubbleStyle = incoming
    ? "bg-gray-300 text-gray-800 float-left"
    : "bg-blue-500 text-white float-right";

  return (
    <div>
      <div
        className={`relative max-w-md mx-2 my-2 px-4 py-2 ${
          incoming ? "rounded-r-lg" : "rounded-l-lg"
        } rounded-t-lg shadow-lg ${bubbleStyle}`}
      >
        <p className="text-sm">{message}</p>
        <div
          className={`triangle_topLeft absolute top-[100%] ${
            incoming ? "left-0" : "right-0"
          } `}
          style={{
            width: 0,
            height: 0,
            borderTop: `10px solid ${incoming ? "#D1D5DB" : "#3B82F6"}`,
            borderRight: incoming ? "10px solid transparent" : "none",
            borderLeft: incoming ? "none" : "10px solid transparent",
          }}
        />
      </div>
    </div>
  );
};

const ImageMessage = ({ message, incoming }) => {
  const bubbleStyle = incoming
    ? "bg-gray-300 text-gray-800 float-left"
    : "bg-blue-500 text-white float-right";

  return (
    <div>
      <div
        className={`relative max-w-[15rem] mx-2 my-2 px-4 py-2 ${
          incoming ? "rounded-r-lg" : "rounded-l-lg"
        } rounded-t-lg shadow-lg ${bubbleStyle}`}
      >
        <div className="text-sm">
          <img src={message} alt={message} />
        </div>
        <div
          className={`triangle_topLeft absolute top-[100%] ${
            incoming ? "left-0" : "right-0"
          } `}
          style={{
            width: 0,
            height: 0,
            borderTop: `10px solid ${incoming ? "#D1D5DB" : "#3B82F6"}`,
            borderRight: incoming ? "10px solid transparent" : "none",
            borderLeft: incoming ? "none" : "10px solid transparent",
          }}
        />
      </div>
    </div>
  );
};

const VideoMessage = ({ message, incoming }) => {
  const [isPlay, setIsPlay] = useState(null);
  const videoRef = useRef(null);
  const bubbleStyle = incoming
    ? "bg-gray-300 text-gray-800 float-left"
    : "bg-blue-500 text-white float-right";

  const handleVideo = () => {
    if (videoRef.current) {
      if (isPlay) {
        videoRef.current.pause();
        setIsPlay(false);
      } else {
        videoRef.current.play();
        setIsPlay(true);
      }
    }
  };

  return (
    <div>
      <div
        className={`relative max-w-md mx-2 my-2 px-4 py-2 ${
          incoming ? "rounded-r-lg" : "rounded-l-lg"
        } rounded-t-lg shadow-lg ${bubbleStyle}`}
      >
        <video ref={videoRef} className="text-sm" onClick={handleVideo}>
          <source src={message} />
        </video>
        <div
          className={`triangle_topLeft absolute top-[100%] ${
            incoming ? "left-0" : "right-0"
          } `}
          style={{
            width: 0,
            height: 0,
            borderTop: `10px solid ${incoming ? "#D1D5DB" : "#3B82F6"}`,
            borderRight: incoming ? "10px solid transparent" : "none",
            borderLeft: incoming ? "none" : "10px solid transparent",
          }}
        />
      </div>
    </div>
  );
};

const MessageProgressBar = () => {
  return (
    <div>
      <div
        className={`relative max-w-md mx-2 my-2 px-4 py-2 rounded-l-lg rounded-t-lg shadow-lg float-right`}
      >
        <div className="loader" />
        <div
          className={`triangle_topLeft absolute top-[100%] right-0`}
          style={{
            width: 0,
            height: 0,
            borderTop: `10px solid #D1D5DB`,
            borderRight: "10px solid transparent",
          }}
        />
      </div>
    </div>
  );
};

export { TextMessage, ImageMessage, VideoMessage, MessageProgressBar };
