import { faker } from "@faker-js/faker";
import React from "react";

const CmtNtf = () => {
  return (
    <div className="flex items-center justify-between text-text-primary py-2 px-2 hover:bg-hover-primary rounded-lg transition duration-200 cursor-pointer space-x-2">
      <div className="flex justify-center items-center space-x-3">
        <div className="flex items-center justify-center">
          <div className="rounded-full overflow-hidden w-[45px] h-[45px] flex items-center justify-centerr">
            <img src={faker.image.avatar()} alt={"name"} width={"45px"} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-start">
          <h4 className="text-sm font-medium text-start">
            {faker.name.fullName()}{" "}
            <span className="font-normal">commented: 🔥🔥🔥🔥😍😍</span>
          </h4>
          <p className="text-xs text-start w-full text-text-secondary mt-[2px]">
            {faker.number.int(24)}h
          </p>
        </div>
      </div>
      <div className="cursor-pointer">
        <img src={faker.image.avatar()} alt="" width={"40px"} />
        {/* <button className="text-sm font-semibold bg-text-link text-text-primary py-[0.4rem] px-5 rounded-lg">
          Follow
        </button> */}
      </div>
    </div>
  );
};

export default CmtNtf;
