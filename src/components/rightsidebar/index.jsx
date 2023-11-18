import React from "react";
import MyUser from "./MyUser";

const index = () => {
  return (
    <div className="mt-16 space-y-[1px] px-2 pr-6">
      <MyUser user={true} />
      <div className="ml-8 pt-2 pb-1 px-2 flex items-center justify-between">
        <h4 className="text-text-secondary text-sm font-semibold">
          Suggested for you
        </h4>
        <button className="text-sm font-semibold text-text-primary">
          See All
        </button>
      </div>
      {/* <div className="flex flex-col items-start justify-start w-full" > */}
      {[0, 1, 2, 3, 4].map((el, idx) => (
        <MyUser key={idx} />
      ))}
      {/* </div> */}
    </div>
  );
};

export default index;
