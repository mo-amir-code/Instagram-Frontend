import { httpAxios } from "../../../services/httpAxios";

export const newPost = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.post("/app/new-post", data);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.message);
      rejected(err.response.data);
    }
  });
};

export const newVideoPost = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.post("/app/new-video-post", data);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.message);
      rejected(err.response.data);
    }
  });
};

export const fetchMyUserPosts = (id) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.get(`/app/fetch-my-user-posts?id=${id}`);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.message);
      rejected(err.response.data);
    }
  });
};

export const fetchUserPost = (username) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.get(
        `/app/fetch-user-posts?username=${username}`
      );
      resolved(response.data);
    } catch (err) {
      console.log(err.response.message);
      rejected(err.response.data);
    }
  });
};

export const fetchPosts = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.get(`/app/fetch-posts`, {
        params: { ...data },
      });
      resolved(response.data);
    } catch (err) {
      console.log(err.response.message);
      rejected(err.response.data);
    }
  });
};

export const likePost = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.patch(`/app/like-post`, data);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.message);
      rejected(err.response.data);
    }
  });
};

export const removeLikedPost = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.patch(`/app/remove-like`, data);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.message);
      rejected(err.response.data);
    }
  });
};

export const postComment = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.patch(`/app/post-comment`, data);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      rejected(err.response.data);
    }
  });
};

export const savePost = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.patch(`/app/save-post`, data);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      rejected(err.response.data);
    }
  });
};

export const removeSavedPost = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.patch(`/app/remove-saved-post`, data);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      rejected(err.response.data);
    }
  });
};

export const followUser = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.patch(`/app/follow-user`, data);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      rejected(err.response.data);
    }
  });
};

export const unFollowUser = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.patch(`/app/unfollow-user`, data);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      rejected(err.response.data);
    }
  });
};

export const fetchPostInfo = (id) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.get(`/app/fetch-post?id=${id}`);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      rejected(err.response.data);
    }
  });
};

export const fetchExplorePosts = () => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.get(`/app/fetch-explore`);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      rejected(err.response.data);
    }
  });
};

export const commentLike = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.patch(`/app/comment-like`, data);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      rejected(err.response.data);
    }
  });
};

export const commentDisLike = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.patch(`/app/remove-comment-like`, data);
      resolved(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      rejected(err.response.data);
    }
  });
};

export const fetchReels = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.get(`/app/fetch-reels`, {
        params: { ...data },
      });
      resolved(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      rejected(err.response.data);
    }
  });
};

export const fetchSearchResults = (data) => {
  return new Promise(async (resolved, rejected) => {
    try {
      const response = await httpAxios.get(`/app/fetch-search-results`, {
        params: { ...data },
      });
      resolved(response.data);
    } catch (err) {
      console.log(err.response.data.message);
      rejected(err.response.data);
    }
  });
};
