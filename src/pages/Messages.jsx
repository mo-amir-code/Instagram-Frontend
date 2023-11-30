import React from "react";
import Message from "../sections/dashboard/Message";
import Conversation from "../sections/dashboard/Conversation";
import { useDispatch, useSelector } from "react-redux";
import StartConversation from "../components/conversation/StartConversation";
import NewMessageModal from "../sections/dashboard/NewMessageModal";
import ProfileLoader from "../components/loaders/ProfileLoader";
import { useState } from "react";
import { useEffect } from "react";
import { socket } from "../socket";
import {
  recievedNewMessage,
  sendingMessageStatusUpdate,
} from "../redux/features/app/appSlice";
import toast from "react-hot-toast";

const Messages = () => {
  const [openNewMessageModal, setOpenNewMessageModal] = useState(false);
  const [newMessageSelected, setNewMessageSelected] = useState(null);
  const { directChat, width, mobileMessage } = useSelector(
    (state) => state.app
  );
  const { loggedInUserId } = useSelector((state) => state.auth);
  const { currentConversationStatus, currentConversationUser } = directChat;
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("recieved-new-message", (data) => {
      dispatch(recievedNewMessage(data));
      // console.log(data);
      if (
        data.conversationId.toString() ===
          currentConversationUser?.conversationId.toString() &&
        data.loggedInUserId.toString() !== loggedInUserId
      ) {
        socket.emit("mark-message-as-read", {
          convId: data.conversationId,
          msgId: data.message.id,
        });
      }
    });
    socket?.on("error", (data) => {
      toast.error(data.message);
      dispatch(sendingMessageStatusUpdate("error"));
    });
    return () => {
      socket?.off("recieved-new-message");
    };
  });

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {(mobileMessage || width > 768) && (
        <Message setOpenModal={setOpenNewMessageModal} />
      )}

      {(width > 768 || (width <= 768 && !mobileMessage)) && (
        <section className="flex-grow h-full">
          {currentConversationStatus === "success" ? (
            <Conversation {...currentConversationUser} />
          ) : currentConversationStatus === "pending" ? (
            <div className="flex w-full h-full items-center justify-center">
              <ProfileLoader />
            </div>
          ) : (
            <StartConversation setOpenModal={setOpenNewMessageModal} />
          )}
        </section>
      )}

      <NewMessageModal
        open={openNewMessageModal}
        setOpen={setOpenNewMessageModal}
        selected={newMessageSelected}
        setSelected={setNewMessageSelected}
      />
    </div>
  );
};

export default Messages;
