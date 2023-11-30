import React from "react";
import { faker } from "@faker-js/faker";

const border_color =
  "linear-gradient(45deg, rgba(131,58,180,1) 0%, rgba(255,220,128,1) 8%, rgba(252,175,69,1) 19%, rgba(247,119,55,1) 25%, rgba(245,96,64,1) 32%, rgba(253,29,29,1) 42%, rgba(225,48,108,1) 49%, rgba(181,54,141,1) 55%, rgba(193,53,132,1) 68%, rgba(131,58,180,1) 79%, rgba(88,81,216,1) 92%, rgba(64,93,230,1) 100%)";

const Highlight = ({ mode }) => {
  return (
    <div className="space-y-2">
      <div
        style={{ border: `2px solid #363636` }}
        className="rounded-full p-[2px] cursor-pointer"
      >
        <div
          className={`flex justify-center items-center rounded-full overflow-hidden ${
            mode === "mobile" ? "w-[50px] h-[50px]" : "w-[80px] h-[80px]"
          }`}
        >
          <img
            src={faker.image.avatar()}
            alt={faker.person.fullName()}
            className="object-cover"
          />
        </div>
      </div>
      <h4 className="text-xs text-text-primary font-semibold text-center">
        {faker.database.type()}
      </h4>
    </div>
  );
};

export default Highlight;
