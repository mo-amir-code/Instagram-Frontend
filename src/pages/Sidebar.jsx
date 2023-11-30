import React, { useState } from "react";
import Logo from "../sections/dashboard/logo";
import {
  Chats,
  Compass,
  FilmReel,
  Heart,
  House,
  MagnifyingGlass,
  List,
  PlusCircle,
  User,
  InstagramLogo,
} from "@phosphor-icons/react";
import Dot from "../components/Dot";
import MoreModal from "../sections/dashboard/MoreModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setActive,
  setNavModal,
  toggleIsNewNotification,
  toggleNewPostModal,
} from "../redux/features/app/appSlice";
import toast from "react-hot-toast";
import NtfAlert from "../components/notifcations/NtfAlert";
import { useEffect } from "react";
import { fetchNotificationsCountAsync } from "../redux/features/app/appAsyncThunk";

const Sidebar = ({ pcNavModal }) => {
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const { active, width } = useSelector((state) => state.app);
  const { isLoggedIn, username, loggedInUserId } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Nav_Buttons = [
    {
      title: "Home",
      icon: (
        <House
          size={!pcNavModal && width >= 1280 ? 26 : 30}
          className="group-hover:scale-110 group-active:scale-90 transition-all ease-in-out duration-200"
        />
      ),
    },
    {
      title: "Search",
      icon: (
        <MagnifyingGlass
          size={!pcNavModal && width >= 1280 ? 26 : 30}
          className="group-hover:scale-110 group-active:scale-90 transition-all ease-in-out duration-200"
          color={pcNavModal === "search" ? "red" : "#fff"}
        />
      ),
    },
    {
      title: "Explore",
      icon: (
        <Compass
          size={!pcNavModal && width >= 1280 ? 26 : 30}
          className="group-hover:scale-110 group-active:scale-90 transition-all ease-in-out duration-200"
        />
      ),
    },
    {
      title: "Reels",
      icon: (
        <FilmReel
          size={!pcNavModal && width >= 1280 ? 26 : 30}
          className="group-hover:scale-110 group-active:scale-90 transition-all ease-in-out duration-200"
        />
      ),
    },
    {
      title: "Messages",
      icon: (
        <Chats
          size={!pcNavModal && width >= 1280 ? 26 : 30}
          className="group-hover:scale-110 group-active:scale-90 transition-all ease-in-out duration-200"
          color={pcNavModal === "messages" ? "red" : "#fff"}
        />
      ),
    },
    {
      title: "Notifications",
      icon: (
        <Heart
          size={!pcNavModal && width >= 1280 ? 26 : 30}
          className="group-hover:scale-110 group-active:scale-90 transition-all ease-in-out duration-200"
          color={pcNavModal === "notifications" ? "red" : "#fff"}
        />
      ),
    },
    {
      title: "Create",
      icon: (
        <PlusCircle
          size={!pcNavModal && width >= 1280 ? 26 : 30}
          className="group-hover:scale-110 group-active:scale-90 transition-all ease-in-out duration-200"
        />
      ),
    },
    {
      title: "Profile",
      icon: (
        <User
          size={!pcNavModal && width >= 1280 ? 26 : 30}
          className="group-hover:scale-110 group-active:scale-90 transition-all ease-in-out duration-200"
        />
      ),
    },
  ];

  const handleNavbar = (idx) => {
    if (idx !== 6) {
      // if(idx !== 4){
      dispatch(setActive(idx));
      // }
    }
    switch (idx) {
      case 0:
        navigate("/");
        dispatch(setNavModal(null));
        break;
      case 1:
        dispatch(setNavModal("search"));
        break;
      case 2:
        navigate("/explore");
        dispatch(setNavModal(null));
        break;
      case 3:
        navigate("/reels");
        dispatch(setNavModal(null));
        break;
      case 4:
        if (!isLoggedIn) {
          toast.error("Login your account");
          break;
        }
        dispatch(setNavModal("messages"));
        navigate("/direct/inbox");
        break;
      case 5:
        dispatch(setNavModal("notifications"));
        break;
      case 6:
        if (!isLoggedIn) {
          toast.error("Login your account");
          break;
        }
        dispatch(setNavModal(null));
        dispatch(toggleNewPostModal());
        break;
      case 7:
        if (isLoggedIn) {
          navigate(`/${username}`);
        } else {
          navigate(`/signin-error`);
        }
        dispatch(setNavModal(null));
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchNotificationsCountAsync({ userId: loggedInUserId }));
      setTimeout(() => {
        dispatch(toggleIsNewNotification());
      }, 2500);
    }
  }, []);

  return (
    <>
      <section
        className={`p-[8px] pb-[25px] ${
          !pcNavModal && width >= 1280 ? "w-[250px]" : "w-[75px]"
        } flex flex-col justify-between h-full`}
      >
        <section>
          <div className={`${pcNavModal || width > 1280 ? "py-5 px-1" : ""}`}>
            {pcNavModal || width < 1280 ? (
              <div className="ml-0 py-3 group flex items-center justify-center hover:bg-hover-primary rounded-lg cursor-pointer">
                <InstagramLogo
                  size={!pcNavModal && width >= 1280 ? 26 : 30}
                  color="#fff"
                  className="group-hover:scale-110 group-active:scale-90 transition-all ease-in-out duration-200"
                />
              </div>
            ) : (
              width >= 1280 && <Logo />
            )}
          </div>
          <div className="flex flex-col pl-[4px] space-y-[2px] mt-[6px]">
            {Nav_Buttons.map((el, idx) => (
              <div
                key={idx}
                onClick={() => handleNavbar(idx)}
                className={`flex ${
                  idx === 5 ? "relative" : null
                } group items-center hover:bg-hover-primary py-[11px] mr-[8px] pl-[8px] text-text-primary font-medium space-x-[16px] rounded-lg cursor-pointer transition duration-300`}
              >
                <div className="flex items-center space-x-2">
                  {active === idx && !pcNavModal && width >= 1280 && <Dot />}
                  {el.icon}
                </div>
                {!pcNavModal && width >= 1280 && <h4>{el.title}</h4>}
                {idx === 5 && <NtfAlert />}
              </div>
            ))}
          </div>
        </section>
        <section className="relative">
          <div
            className="pl-[4px]"
            onClick={() => {
              setOpenMoreModal((prev) => !prev);
              dispatch(setNavModal(null));
            }}
          >
            <div className="flex items-center hover:bg-hover-primary py-[11px] mr-[8px] pl-[8px] text-text-primary font-medium space-x-[16px] rounded-lg cursor-pointer transition-opacity ease-in-out">
              <List
                size={!pcNavModal && width >= 1280 ? 26 : 30}
                className="group-hover:scale-110 group-active:scale-90 transition-all ease-in-out duration-200"
              />
              {!pcNavModal && width >= 1280 && <h4>More</h4>}
            </div>
          </div>
          {openMoreModal && (
            <div className="absolute bottom-[104%] left-1 slideModalUpToDown">
              <MoreModal setModal={setOpenMoreModal} />
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default Sidebar;
