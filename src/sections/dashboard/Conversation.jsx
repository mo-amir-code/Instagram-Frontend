import React, { useRef } from "react";
import {
  ArrowArcLeft,
  ArrowLeft,
  ImageSquare,
  Info,
  Phone,
  Smiley,
  VideoCamera,
} from "@phosphor-icons/react";
import EmojiPickerModal from "../../components/createposts/EmojiPickerModal";
import { useState } from "react";
import AudioRecord from "../../components/conversation/AudioRecord";
import { useEffect } from "react";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import {
  ImageMessage,
  MessageProgressBar,
  TextMessage,
  VideoMessage,
} from "../../components/conversation/MessageTypes";
import {
  sendingMessageStatusUpdate,
  setActive,
  setNavModal,
  toggleMobileMessage,
} from "../../redux/features/app/appSlice";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/images/avatar.jpg";

const Conversation = ({ conversationId, user }) => {
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRef = useRef(null);
  const messageRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUserId } = useSelector((state) => state.auth);
  const { directChat, width } = useSelector((state) => state.app);
  const { currentConversation, sendingMessageStatus } = directChat;

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSelectFile = (e) => {
    setSelectedFile(e.target.files[0]);
    // console.log(e.target.files[0]);
  };

  useEffect(() => {
    const audioElement = document.getElementById("audioElement");
    if (audioElement) {
      audioElement.load();
    }
  }, [audioURL]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [currentConversation, messageRef.current]);

  const handleSendMessage = () => {
    const data = {
      conversationId,
      type: "text",
      message: inputText,
      toUserId: user.id,
      fromUserId: loggedInUserId,
      loggedInUserId,
    };
    if (selectedFile) {
      if (selectedFile.type.split("/")[0] === "image") {
        data.type = "image";
      } else {
        data.type = "video";
      }
      data.message = selectedFile;
      console.log(data);
    }
    socket.emit("send-new-message", data);
    dispatch(sendingMessageStatusUpdate("pending"));
    setInputText("");
    setSelectedFile(null);
  };

  const handleUserProfileView = () => {
    navigate(`/${user.username}`);
    dispatch(setNavModal(null));
    dispatch(setActive(7));
  };

  const handleBack = () => {
    dispatch(toggleMobileMessage(true));
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="relative flex items-center justify-between text-text-primary p-4 border-b border-hover-primary">
        <div className="flex justify-start space-x-3">
          <div className="rounded-full overflow-hidden w-[45px] h-[45px]">
            <img
              src={user.avatar || avatar}
              alt={user.username}
              width={"45px"}
            />
          </div>
          <div className="flex flex-col items-center justify-start">
            <h4
              onClick={() => handleUserProfileView()}
              className="text-sm font-medium text-start cursor-pointer"
            >
              {user.username}
            </h4>
            <p className="text-xs text-start w-full text-text-secondary mt-[2px]">
              {user.name}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <button className="text-xs font-medium cursor-pointer">
            <Phone size={30} />
          </button>
          <button className="text-xs font-medium cursor-pointer">
            <VideoCamera size={30} />
          </button>
          <button className="text-xs font-medium cursor-pointer">
            <Info size={30} />
          </button>
        </div>
        {width <= 768 && (
          <button
            onClick={() => handleBack()}
            className=" absolute right-8 top-[120%] p-1 rounded-full overflow-hidden flex items-center justify-center bg-hover-primary hover:bg-text-secondary z-40"
          >
            <ArrowLeft size={14} />
          </button>
        )}
      </div>
      {/* End header */}

      {/* Conversation */}
      <section
        className="flex-grow p-5 flex flex-col h-64 overflow-auto"
        ref={messageRef}
      >
        {currentConversation.map((conv) => {
          switch (conv.type) {
            case "text":
              return (
                <TextMessage message={conv.message} incoming={conv.incoming} />
              );
            case "image":
              return (
                <ImageMessage message={conv.message} incoming={conv.incoming} />
              );
            case "video":
              return (
                <VideoMessage message={conv.message} incoming={conv.incoming} />
              );
          }
        })}
        {sendingMessageStatus === "pending" && <MessageProgressBar />}
      </section>
      {/* End conversation */}

      {/* Footer */}
      <div className="p-4 text-text-primary">
        <div className="rounded-full border border-hover-primary flex items-center px-5 relative">
          <button
            onClick={() => setOpenModal((prev) => !prev)}
            className="cursor-pointer"
          >
            <Smiley size={26} />
          </button>
          <div className="flex-grow">
            <input
              value={inputText}
              onChange={handleInputChange}
              onFocus={() => setOpenModal(false)}
              className="w-full bg-transparent outline-none px-3 py-[0.6rem]"
              placeholder="Message..."
            />
          </div>
          <div className="flex items-center justify-center space-x-3">
            {inputText.length > 0 || selectedFile ? (
              <button
                onClick={() => handleSendMessage()}
                className="cursor-pointer text-text-link text-sm  font-medium"
              >
                Send
              </button>
            ) : (
              <>
                <AudioRecord
                  recording={recording}
                  setRecording={setRecording}
                  audioChunks={audioChunks}
                  setAudioChunks={setAudioChunks}
                  setAudioURL={setAudioURL}
                />
                <>
                  <button
                    onClick={() => mediaRef.current.click()}
                    className="cursor-pointer"
                  >
                    <ImageSquare size={26} />
                  </button>
                  <input
                    type="file"
                    onChange={handleSelectFile}
                    ref={mediaRef}
                    accept="image/*"
                    className="hidden"
                  />
                </>
              </>
            )}
          </div>

          {/* Emoji Modal */}
          {openModal && (
            <div className="absolute left-6 bottom-[110%] h-64 overflow-auto slideModalUpToDown">
              <EmojiPickerModal setInputText={setInputText} perLine={7} />
            </div>
          )}
        </div>
      </div>
      {/* End footer */}
    </div>
  );
};

export default Conversation;
