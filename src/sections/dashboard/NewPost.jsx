import { Image, Video, X } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  resetPostStatus,
  toggleNewPostModal,
} from "../../redux/features/app/appSlice";
import InputButton from "../../components/buttons/InputButton";
import CropImageAndPost from "../../components/createposts/CropImageAndPost";
import CropVideoAndPost from "../../components/createposts/CropVideoAndPost";

const NewPost = () => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileName, setFileName] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetPostStatus());
  }, []);

  return (
    <section className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm text-text-primary">
      {!file ? (
        <div className="bg-modal-bg w-[380px] h-[380px] rounded-xl relative">
          <div className="flex items-center justify-center border-b border-text-secondary">
            <h4 className="font-medium py-3">Create new post</h4>
          </div>
          <div className="flex items-center justify-center pt-20 mr-12 -rotate-2 ">
            <div className="relative">
              <Image size={80} />
              <Video
                size={80}
                className="absolute rotate-6 top-6 left-12 bg-modal-bg p-0"
              />
            </div>
          </div>
          <div className="mt-5">
            <p className="text-xl text-center py-2 font-normal ">
              Drag photos and videos here
            </p>
          </div>
          <InputButton
            setFile={setFile}
            setFileName={setFileName}
            setFileType={setFileType}
          />
        </div>
      ) : (
        <>
          {fileType === "image" && (
            <CropImageAndPost
              file={file}
              setFile={setFile}
              fileName={fileName}
            />
          )}
          {fileType === "video" && (
            <CropVideoAndPost
              file={file}
              setFile={setFile}
              fileName={fileName}
            />
          )}
        </>
      )}
      <button
        className="absolute top-6 right-6"
        onClick={() => {
          dispatch(toggleNewPostModal());
          dispatch(resetPostStatus());
          setFile(null);
          setFileName(null);
        }}
      >
        <X size={22} />
      </button>
    </section>
  );
};

export default NewPost;
