import React, { useEffect } from "react";
import Post from "../components/Post";
import Reel from "../components/Reel";
import { useDispatch, useSelector } from "react-redux";
import { fetchExplorePostsAsync } from "../redux/features/app/appAsyncThunk";
import HomePostsLoader from "../components/loaders/HomePostsLoader";

const Explore = () => {
  const dispatch = useDispatch();
  const { explorePosts, exploreStatus } = useSelector((state) => state.app);

  useEffect(() => {
    if (!exploreStatus) dispatch(fetchExplorePostsAsync());
  }, []);

  if (!exploreStatus) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <HomePostsLoader />
      </div>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-3 gap-2 p-4">
        {explorePosts.map((post) => {
          if (post.type === "post") {
            return <Post key={post._id} {...post} />;
          } else {
            return <Reel key={post._id} {...post} />;
          }
        })}
      </div>
    </section>
  );
};

export default Explore;
