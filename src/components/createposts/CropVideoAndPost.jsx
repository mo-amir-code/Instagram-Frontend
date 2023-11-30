import React, { useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import WritePost from "./WritePost";
import { useDispatch, useSelector } from "react-redux";
import ProfileLoader from "../loaders/ProfileLoader";
import SuccessPost from "./SuccessPost";
import { newVideoPostAsync } from "../../redux/features/app/appAsyncThunk";
import { useRef } from "react";

const CropVideoAndPost = ({ setFile, file, fileName }) => {
  const [inputText, setInputText] = useState("");
  const [videoUrl, setVideoUrl] = useState(URL.createObjectURL(file));
  const [isPlay, setIsPlay] = useState(false);
  const dispatch = useDispatch();
  const { loggedInUserId } = useSelector((state) => state.auth);
  const { postStatus } = useSelector((state) => state.app);
  const videoRef = useRef();

  const handleNext = async () => {};

  const handleBack = () => {
    setFile(null);
  };

  const handleShare = () => {
    const formData = new FormData();
    formData.append("video", file);
    formData.append("description", inputText);
    formData.append("user", loggedInUserId);

    if (inputText.length === 0) {
      data.description = fileName;
    }
    dispatch(newVideoPostAsync(formData));
  };

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlay) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlay(!isPlay);
    }
  };

  return (
    <div>
      <div
        className={`${
          file
            ? "w-[700px] h-[520px] max-[730px]:w-[380px] max-[730px]:h-auto max-[730px]:mt-96 max-[1000px]:mt-24 max-[1000px]:mb-6"
            : "w-[380px] h-[420px]"
        } overflow-hidden flex flex-col rounded-xl bg-modal-bg`}
      >
        <div
          className={`flex items-center ${
            postStatus === "error" || postStatus === null
              ? "justify-between"
              : "justify-center"
          } border-b border-text-secondary px-4`}
        >
          {postStatus === "error" || postStatus === null ? (
            <>
              <ArrowLeft
                onClick={() => handleBack()}
                size={22}
                className="cursor-pointer"
              />
              <h4 className="text-base font-medium py-3">Create new reel</h4>
              <span
                onClick={() => handleNext()}
                className="text-sm font-semibold py-3 text-text-link cursor-pointer"
              >
                {!file ? (
                  "Next"
                ) : (
                  <button onClick={() => handleShare()}>Share</button>
                )}
              </span>
            </>
          ) : (
            <span className="text-base font-medium py-3">
              {postStatus === "success" ? "Shared" : "Sharing"}
            </span>
          )}
        </div>
        {postStatus === "pending" ? (
          <div className="flex-grow flex items-center justify-center">
            <ProfileLoader />
          </div>
        ) : postStatus === "success" ? (
          <SuccessPost />
        ) : (
          <>
            <div className="relative flex flex-grow w-full overflow-hidden max-[730px]:flex-col">
              <div className="w-[380px] flex justify-center">
                <video
                  ref={videoRef}
                  width={300}
                  className="object-cover cursor-pointer"
                  autoPlay
                  onClick={handlePlayToggle}
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
              {file && (
                <div className="flex-grow overflow-y-auto pb-4">
                  <WritePost
                    setInputText={setInputText}
                    inputText={inputText}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CropVideoAndPost;
