import React from "react";
import { DotsThree } from "@phosphor-icons/react";

const Header = ({user}) => {
  return (
    <div className="flex items-center justify-between p-4 text-text-primary border-b border-hover-primary">
      <div className="flex items-center justify-start space-x-4">
        {/* profile image */}
        <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
          <img src={user.avatar} alt={user.username} width={"30px"} />
        </div>
        {/* Username and location */}
        <div className="flex flex-col text-xs">
          <span className="text-sm font-medium">{user.username}</span>
          <span className="font-normal">Noida</span>
        </div>
      </div>

      <div>
        <DotsThree size={26} />
      </div>
    </div>
  );
};

export default Header;
