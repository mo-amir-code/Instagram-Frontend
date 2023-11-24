import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiPickerModal = ({ setInputText, perLine }) => {
  const handleEmoji = (e) => {
    setInputText((prev) => prev + e.native);
  };

  return (
    <Picker
      data={data}
      onEmojiSelect={handleEmoji}
      perLine={perLine}
    />
  );
};

export default EmojiPickerModal;
