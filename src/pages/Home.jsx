import React from "react";
import Story from "../components/stories";
import Post from "../components/homeposts";
import RightSideBar from "../components/rightsidebar";
import { useSelector } from "react-redux";

const Home = () => {
  const { width } = useSelector((state) => state.app);

  return (
    <section className="flex justify-center h-full overflow-y-auto">
      <section className="flex-grow flex flex-col items-center">
        <Story />
        <Post />
      </section>
      {width >= 1280 && (
        <section className="w-[360px]">
          <RightSideBar />
        </section>
      )}
    </section>
  );
};

export default Home;
