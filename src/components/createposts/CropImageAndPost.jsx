import React, { useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../services/appServices";
import WritePost from "./WritePost";
import { useDispatch, useSelector } from "react-redux";
import ProfileLoader from "../loaders/ProfileLoader";
import SuccessPost from "./SuccessPost";
import { newPostAsync } from "../../redux/features/app/appAsyncThunk";

const CropImageAndPost = ({ setFile, file, fileName }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();
  const { loggedInUserId } = useSelector((state) => state.auth);
  const { postStatus } = useSelector((state) => state.app);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleNext = async () => {
    await getCroppedImg({ file, croppedArea, setCroppedImage });
  };

  const handleBack = () => {
    if (croppedImage) {
      setCroppedImage(null);
      setCroppedArea(null);
    } else {
      setFile(null);
    }
  };

  const handleShare = () => {
    const data = {
      description: inputText,
      file: croppedImage,
      user: loggedInUserId,
    };
    if (inputText.length === 0) {
      data.description = fileName;
    }
    dispatch(newPostAsync(data));
  };

  return (
    <div
      className={`${
        croppedImage
          ? postStatus === "success"
            ? "w-[380px]"
            : "w-[700px]"
          : "w-[380px]"
      } h-[420px] overflow-hidden flex flex-col rounded-xl bg-modal-bg`}
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
            <h4 className="text-base font-medium py-3">
              {!croppedImage ? "Crop" : "Create new post"}
            </h4>
            <span
              onClick={() => handleNext()}
              className="text-sm font-semibold py-3 text-text-link cursor-pointer"
            >
              {!croppedImage ? (
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
          <div className="relative flex flex-grow w-full overflow-hidden">
            {croppedImage && (
              <div className="w-[380px]">
                <img src={croppedImage} />
              </div>
            )}
            {croppedImage && (
              <div className="flex-grow overflow-y-auto">
                <WritePost setInputText={setInputText} inputText={inputText} />
              </div>
            )}
            {!croppedImage && (
              <Cropper
                image={URL.createObjectURL(file)}
                crop={crop}
                zoom={zoom}
                aspect={1 / 1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid={false} // You can customize appearance as needed
                objectFit="horizontal-cover"
                className="rounded-b-xl"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CropImageAndPost;
