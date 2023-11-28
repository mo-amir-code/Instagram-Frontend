import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMyUserPosts,
  newPost,
  fetchPosts,
  likePost,
  removeLikedPost,
  postComment,
  savePost,
  removeSavedPost,
  followUser,
  unFollowUser,
  fetchPostInfo,
  fetchExplorePosts,
  fetchUserPost,
  commentLike,
  commentDisLike,
  newVideoPost,
  fetchReels,
  fetchSearchResults,
  fetchNotificationsCount,
  fetchNotifications,
} from "./appAPI";

export const newPostAsync = createAsyncThunk("app/newpost", async (data) => {
  const response = await newPost(data);
  return response;
});

export const fetchMyUserPostAsync = createAsyncThunk(
  "app/fetchmyuserpost",
  async (id) => {
    const response = await fetchMyUserPosts(id);
    return response;
  }
);

export const fetchUserPostAsync = createAsyncThunk(
  "app/fetchUserPost",
  async (username) => {
    const response = await fetchUserPost(username);
    return response;
  }
);

export const fetchPostsAsync = createAsyncThunk(
  "app/fetchposts",
  async (data) => {
    const response = await fetchPosts(data);
    return response;
  }
);

export const likePostAsync = createAsyncThunk("app/likepost", async (data) => {
  const response = await likePost(data);
  return response;
});

export const removeLikedPostAsync = createAsyncThunk(
  "app/removelikedpost",
  async (data) => {
    const response = await removeLikedPost(data);
    return response;
  }
);

export const postCommentAsync = createAsyncThunk(
  "app/postcomment",
  async (data) => {
    const response = await postComment(data);
    return response;
  }
);

export const savePostAsync = createAsyncThunk("app/savepost", async (data) => {
  const response = await savePost(data);
  return response;
});

export const removeSavedPostAsync = createAsyncThunk(
  "app/removesavedpost",
  async (data) => {
    const response = await removeSavedPost(data);
    return response;
  }
);

export const followUserAsync = createAsyncThunk(
  "app/followuser",
  async (data) => {
    const response = await followUser(data);
    return response;
  }
);

export const unFollowUserAsync = createAsyncThunk(
  "app/unfollowuser",
  async (data) => {
    const response = await unFollowUser(data);
    return response;
  }
);

export const fetchPostInfoAsync = createAsyncThunk(
  "app/fetchPostInfo",
  async (id) => {
    const response = await fetchPostInfo(id);
    return response;
  }
);

export const fetchExplorePostsAsync = createAsyncThunk(
  "app/fetchExplorePosts",
  async (data) => {
    const response = await fetchExplorePosts(data);
    return response;
  }
);

export const commentLikeAsync = createAsyncThunk(
  "app/commentLike",
  async (data) => {
    const response = await commentLike(data);
    return response;
  }
);

export const commentDisLikeAsync = createAsyncThunk(
  "app/commentDisLike",
  async (data) => {
    const response = await commentDisLike(data);
    return response;
  }
);

export const newVideoPostAsync = createAsyncThunk(
  "app/newVideoPost",
  async (data) => {
    const response = await newVideoPost(data);
    return response;
  }
);

export const fetchReelsAsync = createAsyncThunk(
  "app/fetchReels",
  async (data) => {
    const response = await fetchReels(data);
    return response;
  }
);

export const fetchSearchResultsAsync = createAsyncThunk(
  "app/fetchSearchResults",
  async (data) => {
    const response = await fetchSearchResults(data);
    return response;
  }
);

export const fetchNotificationsCountAsync = createAsyncThunk(
  "app/fetchNotificationsCount",
  async (data) => {
    const response = await fetchNotificationsCount(data);
    return response;
  }
);

export const fetchNotificationsAsync = createAsyncThunk(
  "app/fetchNotifications",
  async (data) => {
    const response = await fetchNotifications(data);
    return response;
  }
);
