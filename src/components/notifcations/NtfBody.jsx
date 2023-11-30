import React from "react";
import LikeNtf from "./LikeNtf";
import CmtNtf from "./CmtNtf";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  postPageStatusToggle,
  setActive,
  setNavModal,
} from "../../redux/features/app/appSlice";

const NtfBody = ({ ntfs, forTime }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserView = ({ username }) => {
    navigate(`/${username}`);
    dispatch(setActive(7));
    dispatch(setNavModal(null));
  };

  const handlePostView = ({ postId }) => {
    navigate(`/p/${postId}`);
    // dispatch(setNavModal(null));
    dispatch(postPageStatusToggle(true));
  };

  return (
    <section className="flex flex-col text-text-primary px-6 pb-4 space-y-2 border-b border-hover-primary">
      <h4 className="text-base font-bold">{forTime}</h4>
      {/* notifications */}
      <div className="flex flex-col">
        {ntfs.map((ntf, idx) => {
          if (ntf.type === "like") {
            return (
              <LikeNtf
                key={idx}
                {...ntf}
                handlePostView={handlePostView}
                handleUserView={handleUserView}
              />
            );
          } else {
            return (
              <CmtNtf
                key={idx}
                {...ntf}
                handlePostView={handlePostView}
                handleUserView={handleUserView}
              />
            );
          }
        })}
      </div>
    </section>
  );
};

export default NtfBody;
