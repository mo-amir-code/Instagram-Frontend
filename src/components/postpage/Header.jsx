import React from "react";
import { DotsThree } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  postPageStatusToggle,
  setActive,
} from "../../redux/features/app/appSlice";
import avatar from "../../assets/images/avatar.jpg";

const Header = ({ user }) => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const handleUserView = () => {
    naviagte(`/${user.username}`);
    dispatch(setActive(7));
    dispatch(postPageStatusToggle(false));
  };

  return (
    <div className="flex items-center justify-between p-4 text-text-primary border-b border-hover-primary">
      <div className="flex items-center justify-start space-x-4">
        {/* profile image */}
        <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
          <img src={user.avatar || avatar} alt={user.username} width={"30px"} />
        </div>
        {/* Username and location */}
        <div className="flex flex-col text-xs">
          <span
            onClick={() => handleUserView()}
            className="text-sm font-medium cursor-pointer"
          >
            {user.username}
          </span>
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
