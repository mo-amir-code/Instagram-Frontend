import React from "react";
import postUploaded from "../../assets/loaders/postUploaded.svg";

const SuccessPost = () => {
  return (
    <div className="flex-grow w-full flex items-center justify-center pr-6">
      <div className="mb-3 flex flex-col items-center justify-center" >
        <img src={postUploaded} alt="post uploaded" className="w-28" />
        <span className="text-xl font-medium ml-10 my-4" >Your post has been shared.</span>
      </div>
    </div>
  );
};

export default SuccessPost;
