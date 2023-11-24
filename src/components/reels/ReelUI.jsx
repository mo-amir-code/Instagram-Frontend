import React from "react";

const ReelUI = () => {
  return (
    <div className="w-full h-screen py-[3.5%] flex justify-center items-center">
      <div className="w-[300px] h-full rounded-md overflow-hidden flex items-center justify-center videoShadow relative">
        <div className="absolute bottom-2 left-0 px-4 py-2">
          <div className="text-text-primary space-y-4">
            <div className="flex items-center justify-start space-x-3">
              <div className="rounded-full overflow-hidden w-[35px] h-[35px] bg-text-secondary uiEffect"></div>
              <div className="flex flex-col items-center justify-start h-4 w-32 rounded-lg bg-text-secondary uiEffect"></div>
            </div>
            <div className="w-28 h-3 rounded-lg bg-text-secondary uiEffect"></div>
            <div className="w-56 h-3 rounded-lg bg-text-secondary uiEffect"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelUI;
