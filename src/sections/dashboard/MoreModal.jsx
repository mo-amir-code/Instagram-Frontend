import {
  BookBookmark,
  GearSix,
  Pulse,
  UserSwitch,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/Auth/authSlice";
import { useNavigate } from "react-router-dom";

const Nav_Buttons = [
  {
    title: "Settings",
    icon: <GearSix size={20} fill="#fff" />,
  },
  {
    title: "Your activity",
    icon: <Pulse size={20} />,
  },
  {
    title: "Saved",
    icon: <BookBookmark size={20} />,
  },
  {
    title: "Report a problem",
    icon: <WarningCircle size={20} />,
  },
  {
    title: "Switch Account",
    icon: <UserSwitch size={20} />,
  },
];

const MoreModal = ({ setModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/auth/signin");
  };

  return (
    <section className="relative rounded-lg w-[270px] flex flex-col bg-modal-bg ">
      <section>
        <div className="flex px-[8px] flex-col space-y-[2px] mt-[6px] border-b border-text-secondary pb-3 ">
          {Nav_Buttons.map((el, idx) => (
            <div
              key={idx}
              className="flex items-center hover:bg-hover-primary p-4 text-text-primary font-medium text-sm space-x-[16px] rounded-lg cursor-pointer transition duration-300"
            >
              {el.icon}
              <h4>{el.title}</h4>
            </div>
          ))}
        </div>
        <div
          onClick={() => handleLogOut()}
          className="mx-[8px] my-2 hover:bg-hover-primary p-4 text-text-primary font-medium text-sm rounded-lg cursor-pointer transition duration-300 "
        >
          Log out
        </div>
      </section>
      <button
        onClick={() => setModal(false)}
        className="absolute top-3 right-3 text-text-primary hover:bg-red-600 rounded-full p-[0.10rem]"
      >
        <X size={14} />
      </button>
    </section>
  );
};

export default MoreModal;
