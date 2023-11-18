import { BellRinging } from "@phosphor-icons/react";
import React from "react";
import TodayNtf from "../../components/notifcations/TodayNtf";
import ThisWeek from "../../components/notifcations/ThisWeek";
import ThisMonth from "../../components/notifcations/ThisMonth";

const Notification = () => {
  return (
    <section className="flex flex-col bg-bg-primary w-[400px] h-screen rounded-lg border-r border-hover-primary text-text-primary overflow-y-auto slideModal">
      {/* Header */}
      <div className="px-6 pt-6 pb-3 flex justify-between items-center">
        <h4 className="text-2xl font-bold">Notifications</h4>
        <BellRinging size={26} className="cursor-pointer" />
      </div>

      {/* Notifications */}
      <div className="space-y-4" >
        <TodayNtf />
        <ThisWeek />
        <ThisMonth/>
      </div>
    </section>
  );
};

export default Notification;
