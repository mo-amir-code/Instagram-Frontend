import React, { useRef, useState } from "react";
import PostIcons from "./PostIcons";
import FooterInput from "./FooterInput";
import {
  calculateUploadedTime,
  fullUploadWord,
} from "../../services/appServices";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { postCommentAsync } from "../../redux/features/app/appAsyncThunk";

const Footer = ({ likes, time }) => {
  const [emojiModal, setEmojiModal] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const commentRef = useRef();
  const { loginStatus, loggedInUserId } = useSelector((state) => state.auth);
  const { postPageInfo } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    setInputComment(e.target.value);
  };

  const handlePostComment = () => {
    if (loginStatus !== "success") {
      return toast.error("Login your account");
    } else if (inputComment.length === 0) {
      return toast.error("Please enter atleast one word");
    }

    const data = {
      postId: postPageInfo._id,
      comment: {
        user: loggedInUserId,
        comment: inputComment,
      },
    };

    dispatch(postCommentAsync(data));
    setInputComment("");
  };

  const props = {
    emojiModal,
    setEmojiModal,
    inputComment,
    setInputComment,
    commentRef,
    handleComment,
    handlePostComment,
  };

  return (
    <div className="py-3 px-4 space-y-3">
      <PostIcons />
      <div className="flex flex-col justify-start text-sm font-medium">
        <p>{likes} likes</p>
        <p className="text-[0.7rem] font-normal text-text-secondary">
          {fullUploadWord(calculateUploadedTime(time))} AGO
        </p>
      </div>
      <FooterInput {...props} />
    </div>
  );
};

export default Footer;
