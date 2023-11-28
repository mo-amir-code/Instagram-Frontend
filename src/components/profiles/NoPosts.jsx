import { Camera } from "@phosphor-icons/react";
import React from "react";

const NoPosts = ({message}) => {
  return (
    <div className="p-10 flex flex-col items-center justify-center w-full space-y-3">
      <div className="p-6 rounded-full border-2 border-hover-primary text-hover-primary">
        <Camera size={40} />
      </div>
      <p className="text-3xl font-bold">{message}</p>
    </div>
  );
};

export default NoPosts;
