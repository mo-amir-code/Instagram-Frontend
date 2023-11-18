import React from "react";
import IconButton from "../../components/buttons/IconButton";
import { CaretDown, NotePencil } from "@phosphor-icons/react";
import Tabs from "../../components/message/Tabs";
import Chat from "../../components/message/Chat";

const Message = () => {
  return (
    <section className="flex flex-col bg-bg-primary w-[400px] h-screen rounded-lg border-r border-hover-primary slideModal">
      {/* Header */}
      <div className="p-6 mt-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-text-primary">
          <h4 className="text-xl font-bold">mr_aamir0_1</h4>
          <CaretDown />
        </div>
        <IconButton children={<NotePencil size={28} />} />
      </div>

      {/* Tabs */}
      <Tabs />

      {/* Chats */}
      <section className="flex flex-col py-3 overflow-y-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, idx) => (
          <Chat key={idx} />
        ))}
      </section>
    </section>
  );
};

export default Message;
