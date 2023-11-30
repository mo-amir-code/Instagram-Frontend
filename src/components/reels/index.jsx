import React from "react";
import Video from "./Video";
import SideButtons from "./SideButtons";

const index = ({ likes, comments, saved, ...data }) => {
  return (
    <div className="h-screen w-full py-[3.5%]">
      <div className="h-full w-full flex items-center justify-center space-x-8">
        <Video {...data} />
          <SideButtons
            likes={likes}
            comments={comments}
            saved={saved}
            {...data}
          />
      </div>
    </div>
  );
};

export default index;
