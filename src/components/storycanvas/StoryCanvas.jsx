import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import {
  DownloadSimple,
  PencilSimpleLine,
  Sticker,
  TextAa,
  X,
} from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { selectStoryFile } from "../../redux/features/app/appSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const colors = [
  {
    code: "#b8ac0d",
  },
  {
    code: "#b8760d",
  },
  {
    code: "#91063b",
  },
  {
    code: "#66097d",
  },
  {
    code: "#3361c4",
  },
  {
    code: "#0fa649",
  },
  {
    code: "#000000",
  },
  {
    code: "#ffffff",
  },
];

const StoryCanvas = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [text, setText] = useState(null);
  const [textColor, setTextColor] = useState("#ffffff");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = new fabric.Canvas("canvasId", {
      width: 400,
      height: 580,
    });

    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        const canvasAspectRatio = canvas.width / canvas.height;
        const imageAspectRatio = img.width / img.height;

        if (canvasAspectRatio > imageAspectRatio) {
          img.scaleToWidth(canvas.width);
        } else {
          img.scaleToHeight(canvas.height);
        }
        canvas.add(img);
      },
      { crossOrigin: "anonymous" }
    );
  }, [imageUrl]);

  const handleClose = () => {
    dispatch(selectStoryFile({ file: null }));
    navigate(-1);
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleSelectTextColor = (color) => {
    setTextColor(color);
  };

  const handleAddText = () => {
    setText(null);
    setIsButtonActive(false);
  };

  return (
    <>
      <canvas id="canvasId" ref={canvasRef} />

      {/* Canvas buttons */}
      {!isButtonActive && (
        <div className="absolute left-0 top-0 w-full flex items-center justify-between text-white font-semibold bg-gradient-to-b from-black/75">
          <button onClick={() => handleClose()} className="p-3">
            <X size={30} />
          </button>
          <div className="flex items-center justify-end p-3 space-x-5">
            <button>
              <DownloadSimple size={30} />
            </button>
            <button>
              <Sticker size={30} />
            </button>
            <button>
              <PencilSimpleLine size={30} />
            </button>
            <button
              onClick={() => {
                setIsButtonActive(true);
                setText("");
              }}
            >
              <TextAa size={30} />
            </button>
          </div>
        </div>
      )}

      {/* Add text */}
      {text !== null && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 text-text-primary">
          <div className="relative w-full h-full flex items-center justify-center">
            <input
              type="text"
              onChange={handleOnChange}
              value={text}
              style={{ color: textColor, placeholder: textColor }}
              className="outline-none bg-transparent font-[anton]"
              autoFocus
              placeholder="Type here..."
            />
            <style>
              {`
          input::placeholder {
            color: ${textColor};
          }
        `}
            </style>
            <div className="absolute right-4 top-20 flex flex-col items-center space-y-3">
              <span
                onClick={() => {
                  handleAddText();
                }}
                className="text-sm font-bold cursor-pointer"
              >
                Done
              </span>
              {colors.map((color) => (
                <span
                  onClick={() => handleSelectTextColor(color.code)}
                  style={{ backgroundColor: color.code }}
                  className="w-6 h-6 rounded-full border cursor-pointer border-black"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StoryCanvas;
