import React, { useEffect, useState } from "react";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import HomePostsLoader from "../loaders/HomePostsLoader";
import { fetchPostsAsync } from "../../redux/features/app/appAsyncThunk";

const index = () => {
  const dispatch = useDispatch();
  const { posts, totalPost } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(
      fetchPostsAsync({ results: posts.length, totalResult: totalPost })
    );
  }, []);

  const fetchData = () => {
    if (totalPost) {
      dispatch(
        fetchPostsAsync({ results: posts.length, totalResult: totalPost })
      );
    }
  };

  return (
    <div className="text-text-primary">
      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={fetchData}
        hasMore={posts.length != totalPost}
        loader={
          <div className="h-full w-full flex items-center justify-center">
            <HomePostsLoader />
          </div>
        }
      >
        <div className="flex flex-col items-center w-full space-y-6 py-8">
          {posts
            .slice(0)
            .reverse()
            .map((el, idx) => (
              <Post key={idx} {...el} />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default index;
