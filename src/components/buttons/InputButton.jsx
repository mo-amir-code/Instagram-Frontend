import React, { useRef, useState } from "react";
import { convertVideoToBase64 } from "../../services/appServices";

const InputButton = ({ setFile, setFileName, setFileType }) => {
  const inputRef = useRef();

  const handleSelectFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    if (e.target.files[0].type.split("/")[0] === "image") {
      setFileType("image");
    } else {
      setFileType("video");
    }
  };

  return (
    <div className="flex items-center justify-center py-4 mx-auto">
      <input
        ref={inputRef}
        type="file"
        onChange={handleSelectFile}
        accept="image/*, video/*"
        className="hidden absolute"
      />
      <button
        onClick={() => inputRef.current.click()}
        className="bg-text-link text-sm font-medium py-[6px] px-3 rounded-lg"
      >
        Select from computer
      </button>
    </div>
  );
};

export default InputButton;
