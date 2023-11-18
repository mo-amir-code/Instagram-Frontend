import React from "react";

const TextArea = ({setInputText, inputText}) => {

    const handleInputText = (e) => {
        setInputText(e.target.value);
    }
  return (
    <div className="mx-4">
      <textarea
        className="w-full bg-modal-bg outline-none placeholder-text-secondary"
        placeholder="Write a caption..."
        rows={7}
        maxLength={2000}
        value={inputText}
        onChange={handleInputText}
      />
    </div>
  );
};

export default TextArea;
