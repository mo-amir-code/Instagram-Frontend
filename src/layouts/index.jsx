import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import Search from "../sections/dashboard/Search";
import Message from "../sections/dashboard/Message";
import Notification from "../sections/dashboard/Notification";
import { useSelector } from "react-redux";
import NewPost from "../sections/dashboard/NewPost";
import PostPage from "../pages/PostPage";

const index = () => {
  const { pcNavModal, newPostModal, postPageStatus } = useSelector(
    (state) => state.app
  );

  return (
    <>
      <div className="flex min-h-screen">
        <div
          className={`w-[245px] bg-bg-primary border-r border-hover-primary z-10`}
        >
          <div
            className={`h-screen sticky top-0 left-0 ${
              pcNavModal && "w-[75px]"
            }`}
          >
            <Sidebar pcNavModal={pcNavModal} />
          </div>
          <div className="fixed top-0 left-[4.5rem]">
            {(() => {
              switch (pcNavModal) {
                case "search":
                  return <Search />;
                case "messages":
                  return <Message />;
                case "notifications":
                  return <Notification />;
                default:
                  return <></>;
              }
            })()}
          </div>
          {newPostModal && <NewPost />}
        </div>
        <div className="bg-bg-primary flex-grow z-0">
          <div className="w-[1035px] mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </div>
      <PostPage open={postPageStatus}/>
    </>
  );
};

export default index;
