import React from "react";
import Story from "../components/stories";
import Post from "../components/homeposts";
import RightSideBar from "../components/rightsidebar";

const Home = () => {

  return (
    <section className="flex h-full">
      <section className="flex-grow flex flex-col">
        <Story />
        <Post />
      </section>
      <section className="w-[360px]">
        <RightSideBar />
      </section>
    </section>
  );
};

export default Home;
