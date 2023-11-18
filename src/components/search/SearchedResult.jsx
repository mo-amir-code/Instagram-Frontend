import React from "react";
import { faker } from "@faker-js/faker";
import { X } from "@phosphor-icons/react";

const SearchedResult = () => {
  return (
    <div className="flex items-center justify-between text-text-primary py-2 px-6 hover:bg-hover-primary transition duration-200 cursor-pointer">
      <div className="flex justify-start space-x-3">
        <div className="rounded-full overflow-hidden w-[40px] h-[40px]">
          <img src={faker.image.avatar()} alt={"name"} width={"40px"} />
        </div>
        <div className="flex flex-col items-center justify-start">
          <h4 className="text-sm font-medium text-start">
            {faker.name.fullName()}
          </h4>
          <p className="text-xs text-start w-full text-text-secondary mt-[2px]">
            {faker.name.fullName()}
          </p>
        </div>
      </div>
      <div className="cursor-pointer">
        <button className="text-xs font-medium">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchedResult;
