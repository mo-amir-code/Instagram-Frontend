import React, { useEffect, useState } from "react";
import IconButton from "../../components/buttons/IconButton";
import { CaretDown, NotePencil } from "@phosphor-icons/react";
import Tabs from "../../components/message/Tabs";
import Chat from "../../components/message/Chat";
import { useDispatch, useSelector } from "react-redux";
import {
  currentConversationStatusUpdate,
  fetchConversations,
  selectExistingConversation,
  setPrimaryGeneralConvs,
  toggleMobileMessage,
} from "../../redux/features/app/appSlice";
import { socket } from "../../socket";
import toast from "react-hot-toast";
import { filterConversations } from "../../services/appServices";

const Message = ({ setOpenModal }) => {
  const [conversationTab, setConversationTab] = useState(1);
  const { username, loggedInUserId, following } = useSelector(
    (state) => state.auth
  );
  const { directChat, width } = useSelector((state) => state.app);
  const { conversations, primaryConversations, generalConversations } =
    directChat;
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("datatttattata");
    socket?.emit("fetch-conversations", { loggedInUserId }, (data) => {
      // console.log(data);/
      if (data.status) {
        toast.error(data.message);
      } else {
        dispatch(fetchConversations(data));
      }
    });

    return () => {
      socket?.off("fetch-conversations");
    };
  }, []);

  useEffect(() => {
    // conversations filtering
    if (conversations.length > 0) {
      const convs = filterConversations(conversations, following);
      dispatch(setPrimaryGeneralConvs(convs));
    }
  }, [conversations]);

  const handleClick = ({ id, userId }) => {
    dispatch(currentConversationStatusUpdate("pending"));
    dispatch(toggleMobileMessage(false));
    socket.emit("select-existing-conversation", { id, userId }, (data) => {
      dispatch(selectExistingConversation(data));
    });
  };

  return (
    <section
      className={`flex flex-col bg-bg-primary ${
        width <= 768 ? "w-full" : "w-[400px]"
      } h-full rounded-lg border-r border-hover-primary slideModal`}
    >
      {/* Header */}
      <div className="p-6 mt-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-text-primary">
          <h4 className="text-xl font-bold">{username}</h4>
          <CaretDown />
        </div>
        <div onClick={() => setOpenModal(true)}>
          <IconButton children={<NotePencil size={28} />} />
        </div>
      </div>

      {/* Tabs */}
      <Tabs setSelected={setConversationTab} selected={conversationTab} />

      {/* Chats */}
      <section className="flex flex-col py-3 overflow-y-auto">
        {(() => {
          switch (conversationTab) {
            case 1:
              return primaryConversations.map((el, idx) => (
                <Chat
                  key={idx}
                  {...el.user}
                  convId={el.conversationId}
                  unread={el.unread}
                  convs={true}
                  handleClick={handleClick}
                />
              ));
            case 2:
              return generalConversations.map((el, idx) => (
                <Chat
                  key={idx}
                  {...el.user}
                  convId={el.conversationId}
                  unread={el.unread}
                  convs={true}
                  handleClick={handleClick}
                />
              ));
            default:
              return <></>;
          }
        })()}
      </section>
    </section>
  );
};

export default Message;
