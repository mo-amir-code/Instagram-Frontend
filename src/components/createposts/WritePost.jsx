import { faker } from "@faker-js/faker";
import React, { useState } from "react";
import TextArea from "./TextArea";
import EmojiPickerModal from "./EmojiPickerModal";
import { Smiley } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import eAvatar from "../../assets/images/avatar.jpg"

const WritePost = ({ setInputText, inputText }) => {
  const [emojiModal, setEmojiModal] = useState(false);
  const { username, avatar } = useSelector((state) => state.auth);

  return (
    <section className="w-full flex flex-col justify-start writePostSlide">
      <div className="flex justify-start items-center space-x-3 py-4 mt-1 px-4">
        <div className="rounded-full overflow-hidden w-[28px] h-[28px]">
          <img src={avatar || eAvatar} alt={username} className="w-[28px]" />
        </div>
        <h4 className="text-sm font-semibold">{username}</h4>
      </div>
      <TextArea setInputText={setInputText} inputText={inputText} />
      <div className="flex items-center justify-between px-4 text-xs text-text-secondary ">
        <Smiley
          size={20}
          className="cursor-pointer"
          onClick={() => setEmojiModal((prev) => !prev)}
        />
        <span>{inputText.length}/2,000</span>
      </div>
      {emojiModal && (
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 py-4">
            <EmojiPickerModal setInputText={setInputText} perLine={7} />
          </div>
        </div>
      )}
    </section>
  );
};

export default WritePost;
