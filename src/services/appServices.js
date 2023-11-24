export const getCroppedImg = ({ file, croppedArea, setCroppedImage }) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;

    image.onload = () => {
      ctx.drawImage(
        image,
        croppedArea.x,
        croppedArea.y,
        croppedArea.width,
        croppedArea.height,
        0,
        0,
        croppedArea.width,
        croppedArea.height
      );

      canvas.toBlob((blobData) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64data = reader.result;
          setCroppedImage(base64data);
          resolve(base64data);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(blobData);
      }, "image/jpeg");
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
};

export const filterPosts = (posts, newPosts) => {
  const mPosts = newPosts.filter((nPost) => {
    return !posts.find((oPost) => oPost._id === nPost._id);
  });

  if (posts) {
    return [...posts, ...mPosts];
  }
  return mPosts;
};

export const calculateUploadedTime = (date) => {
  const newDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate - newDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const week = Math.floor(days / 7);
  const month = Math.floor(days / 30);
  const year = Math.floor(days / 365);

  if (year > 0) {
    return `${year}y`;
  } else if (month > 0) {
    return `${month}m`;
  } else if (week > 0) {
    return `${week}w`;
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}min`;
  } else if (seconds > 0) {
    return `${seconds}s`;
  }

  return hours;
};

export const fullUploadWord = (time) => {
  switch (time.at(-1)) {
    case "s":
      return fullString(time, "second");
    case "h":
      return fullString(time, "hour");
    case "d":
      return fullString(time, "day");
    case "w":
      return fullString(time, "week");
    case "m":
      return fullString(time, "month");
    case "y":
      return fullString(time, "year");
    default:
      return fullString(time, "minute");
  }
};

const fullString = (str, addStr) => {
  let newStr;
  let uploadTimeNum;

  if (str.slice(-3) === "min") {
    newStr = `${str.slice(0, -3)} ${addStr.toUpperCase()}`;
    uploadTimeNum = parseInt(str.slice(0, -3));
  } else {
    newStr = `${str.slice(0, -1)} ${addStr.toUpperCase()}`;
    // console.log(newStr);
    uploadTimeNum = parseInt(str.slice(0, -1));
  }

  if (uploadTimeNum > 1) {
    return `${newStr}S`;
  } else {
    return newStr;
  }
};

export const pushNewLike = (posts, postId, userId) => {
  const newPosts = posts;
  const postIndex = posts.findIndex((el) => el._id === postId);
  const post = posts.find((el) => el._id === postId);
  post.likes.push(userId);
  newPosts[postIndex] = post;
  return newPosts;
};

export const pullLike = (posts, postId, userId) => {
  const newPosts = posts;
  const postIndex = posts.findIndex((el) => el._id === postId);
  const post = posts.find((el) => el._id === postId);
  const newLikes = post.likes.filter((el) => el !== userId);
  post.likes = newLikes;
  newPosts[postIndex] = post;
  return newPosts;
};

export const increamentPostCommentCount = (postId, posts) => {
  const postIndex = posts.findIndex((el) => el._id === postId);
  const post = posts.find((el) => el._id === postId);
  post.comments = post.comments + 1;
  const modifiedPosts = posts;
  modifiedPosts[postIndex] = post;
  return { posts: modifiedPosts, postId: post._id };
};

export const pushNewSaved = (posts, postId, savedId) => {
  const newPosts = posts;
  const postIndex = posts.findIndex((el) => el._id === postId);
  const post = posts.find((el) => el._id === postId);
  post.saved.push(savedId);
  newPosts[postIndex] = post;
  return newPosts;
};

export const pullSaved = (posts, postId, savedId) => {
  const newPosts = posts;
  const postIndex = posts.findIndex((el) => el._id === postId);
  const post = posts.find((el) => el._id === postId);
  const newSaved = post.saved.filter((el) => el !== savedId);
  post.saved = newSaved;
  newPosts[postIndex] = post;
  return newPosts;
};

export const detectLike = (likes, loggedInUserId, setLiked) => {
  if (likes.length > 0) {
    likes.forEach((like) => {
      if (like === loggedInUserId) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    });
  } else {
    setLiked(false);
  }
};

export const detectSave = (saves, loggedInUserId, setIsSaved) => {
  saves.forEach((save) => {
    if (save === loggedInUserId) {
      setIsSaved(true);
    }
  });
  return false;
};

export const detectFollow = (following, id, setFollow) => {
  following.forEach((el) => {
    if (el === id) {
      setFollow(true);
    }
  });
  return false;
};

export const pullPostPageLike = (data, userId) => {
  const likes = data.likes.filter((el) => el !== userId);
  const newData = data;
  newData.likes = likes;
  return newData;
};

export const pushCommentLike = (post, commentId, user) => {
  const postInfo = JSON.parse(JSON.stringify(post));
  const comment = postInfo.comments.find(
    (el) => el._id.toString() === commentId.toString()
  );
  const commentIndex = postInfo.comments.findIndex(
    (el) => el._id.toString() === commentId.toString()
  );
  comment.likes.push(user.toString());
  const newPost = postInfo;
  newPost.comments[commentIndex] = comment;
  return newPost;
};

export const pullCommentLike = (post, commentId, user) => {
  const newPost = JSON.parse(JSON.stringify(post));
  const comment = newPost.comments.find(
    (el) => el._id.toString() == commentId.toString()
  );
  const commentIndex = newPost.comments.findIndex(
    (el) => el._id.toString() === commentId.toString()
  );
  const filteredLikes = comment.likes.filter(
    (el) => el.toString() !== user.toString()
  );
  comment.likes = filteredLikes;
  newPost.comments[commentIndex] = comment;
  console.log(newPost);
  return newPost;
};

export const convertVideoToBase64 = async (file, setFile) => {
  const reader = new FileReader();
  reader.onload = async () => {
    const base64Data = reader.result.split(",")[1];
    setFile(base64Data);
  };
  reader.readAsDataURL(file);
};

export const setConversations = (conversations, payload) => {
  const newConversations = JSON.parse(JSON.stringify(conversations));
  const newPayload = JSON.parse(JSON.stringify(payload));
  const { conversationId, messages, user } = newPayload;

  const convIndex = newConversations.findIndex(
    (el) => el.conversationId === conversationId
  );
  if (convIndex && convIndex !== -1) {
    const currConv = newConversations.find(
      (el) => el.conversationId === conversationId
    );
    const data = {
      conversations: newConversations,
      currMessages: messages,
      currConv,
    };
    return data;
  }

  const data = {
    conversations: newConversations,
    currMessages: messages,
    currConv: { conversationId, user, unread: 0 },
  };
  return data;
};

export const checkConversation = (conversations, currConvId) => {
  const isConv = conversations.find((el) => el.conversationId === currConvId);
  if (isConv) {
    return true;
  } else {
    return false;
  }
};

export const resetUnreadConversation = (convs, currConv) => {
  const conversations = JSON.parse(JSON.stringify(convs));
  const convIndex = conversations.findIndex(
    (conv) => conv.conversationId === currConv
  );
  conversations[convIndex].unread = 0;
  return conversations;
};
