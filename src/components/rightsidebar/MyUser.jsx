import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  followUserAsync,
  unFollowUserAsync,
} from "../../redux/features/app/appAsyncThunk";
import {
  unFollowingUser,
  updateFollowing,
} from "../../redux/features/Auth/authSlice";
import { detectFollow } from "../../services/appServices";
import { useNavigate } from "react-router-dom";
import eAvatar from "../../assets/images/avatar.jpg";

const MyUser = ({
  user,
  id,
  username,
  name,
  avatar,
  loggedInUserId,
  following,
}) => {
  const [follow, setFollow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      detectFollow(following, id, setFollow);
    }
  }, [following]);

  const handleFollow = () => {
    const data = {
      postUserName: username,
      postUser: id,
      user: loggedInUserId,
    };
    dispatch(followUserAsync(data));
    dispatch(updateFollowing(id));
    setFollow(true);
  };

  const handleUnFollow = () => {
    const data = {
      postUserName: username,
      postUser: id,
      user: loggedInUserId,
    };
    dispatch(unFollowUserAsync(data));
    dispatch(unFollowingUser(id));
    setFollow(false);
  };

  const handleUserProfileView = () => {
    navigate(`/${username}`);
    dispatch(setNavModal(null));
    dispatch(setActive(7));
  };

  return (
    <div className="flex items-center justify-between text-text-primary py-2 ml-8 px-2 mr-1 hover:bg-hover-primary rounded-lg transition duration-200 cursor-pointer">
      <div
        onClick={() => handleUserProfileView()}
        className="flex justify-start space-x-3"
      >
        <div className="rounded-full overflow-hidden w-[45px] h-[45px]">
          <img src={avatar || eAvatar} alt={username} width={"45px"} />
        </div>
        <div className="flex flex-col items-center justify-start">
          <h4 className="text-sm font-medium text-start">{username}</h4>
          <p className="text-xs text-start w-full text-text-secondary mt-[2px]">
            {name}
          </p>
        </div>
      </div>
      <div className="cursor-pointer">
        {follow ? (
          <button
            onClick={() => handleUnFollow()}
            className="text-xs font-medium text-text-link"
          >
            {user ? null : "Following"}
          </button>
        ) : (
          <button
            onClick={() => handleFollow()}
            className="text-xs font-medium text-text-link"
          >
            {user ? null : "Follow"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MyUser;
