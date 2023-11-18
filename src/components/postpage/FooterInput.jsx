import { Smiley } from "@phosphor-icons/react";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import EmojiPickerModal from "../createposts/EmojiPickerModal";

const FooterInput = ({
  emojiModal,
  setEmojiModal,
  setInputComment,
  commentRef,
  inputComment,
  handleComment,
  handlePostComment,
}) => {


    

  return (
    <div className="flex w-full items-center relative border-t border-hover-primary pt-3">
      <TextareaAutosize
        ref={commentRef}
        type="text"
        value={inputComment}
        onChange={handleComment}
        onFocus={() => {
          setEmojiModal(false);
        }}
        className="w-full bg-transparent outline-none text-xs font-medium"
        placeholder="Add a comment..."
        minRows={1}
        maxRows={4}
      />
      <div className="flex items-center justify-center space-x-2">
        <span
          onClick={() => handlePostComment()}
          className="text-sm text-text-link font-medium cursor-pointer"
        >
          {" "}
          Post
        </span>
        <Smiley
          onClick={() => setEmojiModal((prev) => !prev)}
          size={18}
          className="cursor-pointer"
        />
      </div>
      {emojiModal && (
        <div className="absolute right-0 bottom-[120%] h-[300px] overflow-hidden rounded-lg">
          <EmojiPickerModal setInputText={setInputComment} perLine={6} />
        </div>
      )}
    </div>
  );
};

export default FooterInput;
