import React, { useEffect } from "react";
import Post from "../components/Post";
import Reel from "../components/Reel";
import { useDispatch, useSelector } from "react-redux";
import { fetchExplorePostsAsync } from "../redux/features/app/appAsyncThunk";
import HomePostsLoader from "../components/loaders/HomePostsLoader";
import InfiniteScroll from "react-infinite-scroll-component";

const Explore = () => {
  const dispatch = useDispatch();
  const { explorePosts, explorePostsTotal, exploreStatus } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    if (!exploreStatus) {
      const data = {
        results: explorePosts.length,
        totalResult: explorePostsTotal,
      };
      dispatch(fetchExplorePostsAsync(data));
    }
  }, []);

  const fetchData = () => {
    console.log(explorePostsTotal);
    const data = {
      results: explorePosts.length,
      totalResult: explorePostsTotal,
    };
    dispatch(fetchExplorePostsAsync(data));
  };

  if (!exploreStatus) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <HomePostsLoader />
      </div>
    );
  }

  return (
    <section className="w-full overflow-y-auto">
      <InfiniteScroll
        dataLength={explorePosts.length} //This is important field to render the next data
        next={fetchData}
        hasMore={explorePosts.length != explorePostsTotal}
        loader={
          <div className="flex items-center justify-center w-full py-8">
            <HomePostsLoader />
          </div>
        }
      >
        <div className="grid grid-cols-3 gap-2 p-4 w-full h-full">
          {explorePosts.map((post) => {
            if (post.type === "post") {
              return <Post key={post._id} {...post} />;
            } else {
              return <Reel key={post._id} {...post} />;
            }
          })}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default Explore;
