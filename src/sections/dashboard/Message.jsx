import React, { useEffect, useState } from "react";
import IconButton from "../../components/buttons/IconButton";
import { CaretDown, NotePencil } from "@phosphor-icons/react";
import Tabs from "../../components/message/Tabs";
import Chat from "../../components/message/Chat";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations, selectExistingConversation } from "../../redux/features/app/appSlice";
import { socket } from "../../socket";
import toast from "react-hot-toast";

const Message = () => {
  const [conversationTab, setConversationTab] = useState(1);
  const { username, loggedInUserId } = useSelector((state) => state.auth);
  const { directChat } = useSelector((state) => state.app);
  const { conversations } = directChat;
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.emit("fetch-conversations", { loggedInUserId }, (data) => {
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

  const handleClick = ({id, userId}) => {
    socket.emit("select-existing-conversation", {id, userId}, (data) => {
      dispatch(selectExistingConversation(data));
    })
  }

  return (
    <section className="flex flex-col bg-bg-primary w-[400px] h-screen rounded-lg border-r border-hover-primary slideModal">
      {/* Header */}
      <div className="p-6 mt-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-text-primary">
          <h4 className="text-xl font-bold">{username}</h4>
          <CaretDown />
        </div>
        <IconButton children={<NotePencil size={28} />} />
      </div>

      {/* Tabs */}
      <Tabs setSelected={setConversationTab} selected={conversationTab} />

      {/* Chats */}
      <section className="flex flex-col py-3 overflow-y-auto">
        {(() => {
          switch (conversationTab) {
            case 1:
              return conversations.map((el, idx) => (
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
              return conversations.map((el, idx) => (
                <Chat
                  key={idx}
                  {...el.user}
                  conversationId={el.conversationId}
                  unread={el.unread}
                  convs={true}
                  handleClick={handleClick}
                />
              ));
          }
        })()}
      </section>
    </section>
  );
};

export default Message;
