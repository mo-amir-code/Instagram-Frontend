import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActive, setNavModal } from "../../redux/features/app/appSlice";
import eAvatar from "../../assets/images/avatar.jpg"

const SearchedResult = ({ id, name, username, avatar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserView = () => {
    navigate(`/${username}`);
    dispatch(setNavModal(null))
    dispatch(setActive(7))
  };

  return (
    <div
      onClick={()=>handleUserView()}
      className="flex items-center justify-between text-text-primary py-2 px-6 hover:bg-hover-primary transition duration-200 cursor-pointer"
    >
      <div className="flex justify-start space-x-3">
        <div className="rounded-full overflow-hidden w-[40px] h-[40px]">
          <img src={avatar || eAvatar} alt={username} width={"40px"} />
        </div>
        <div className="flex flex-col items-center justify-start">
          <h4 className="text-sm font-medium text-start">{username}</h4>
          <p className="text-xs text-start w-full text-text-secondary mt-[2px]">
            {name}
          </p>
        </div>
      </div>
      <div className="cursor-pointer">
        {/* <button className="text-xs font-medium">
          <X size={20} />
        </button> */}
      </div>
    </div>
  );
};

export default SearchedResult;
