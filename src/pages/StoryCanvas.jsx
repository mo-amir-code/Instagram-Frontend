import React, { useRef } from "react";
import { useSelector } from "react-redux";
import StoryCanvas from "../components/storycanvas/StoryCanvas";

const StoryCanvasPage = () => {
  const { stories } = useSelector((state) => state.app);
  const { selected } = stories;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[400px] h-[580px] rounded-lg overflow-hidden storyShadow relative">
        <StoryCanvas imageUrl={selected} />
      </div>
    </div>
  );
};

export default StoryCanvasPage;
