import { Chat, Heart } from "@phosphor-icons/react";
import React from "react";
import { useSelector } from "react-redux";

const NtfAlert = () => {
  const { likesCount, commentsCount, isNewNotification } = useSelector(
    (state) => state.app.notification
  );
  return (
    <div className={"absolute -right-6 top-[0.4rem] z-30"}>
      {isNewNotification && (
        <div
          className={`relative flex items-center justify-center text-sm font-semibold text-text-primary space-x-3 bg-red-600 rounded-md p-2 ${
            isNewNotification ? "ntfIn" : "ntfOut"
          } `}
        >
          {/* likes */}

          {likesCount > 0 && (
            <div className="flex items-center justify-center space-x-1">
              <Heart size={20} />
              <span>{likesCount}</span>
            </div>
          )}

          {/* comments */}
          {commentsCount > 0 && (
            <div className="flex items-center justify-center space-x-1">
              <Chat size={20} />
              <span>{commentsCount}</span>
            </div>
          )}

          <div className="arrow-left absolute -left-6 top-2" />
        </div>
      )}
    </div>
  );
};

export default NtfAlert;
