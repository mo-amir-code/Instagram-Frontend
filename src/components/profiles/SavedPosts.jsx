import React from "react";
import Post from "../Post";
import Reel from "../Reel";

const SavedPosts = ({ myUserSaved }) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {myUserSaved.map((saved, idx) => {
        if (saved.type === "post") {
          return <Post key={idx} {...saved} />;
        } else {
          return <Reel key={idx} {...saved} />;
        }
      })}
    </div>
  );
};

export default SavedPosts;
