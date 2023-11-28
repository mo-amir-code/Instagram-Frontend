import React, { useEffect } from "react";
import MyUser from "./MyUser";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeatureUsersAsync } from "../../redux/features/user/userSlice";

const index = () => {
  const { username, avatar, name, loggedInUserId, isLoggedIn, following } = useSelector(
    (state) => state.auth
  );
  const { featureUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeatureUsersAsync());
  }, []);

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <div className="mt-16 space-y-[1px] px-2 pr-6">
      <MyUser user={true} username={username} avatar={avatar} name={name} />
      <div className="ml-8 pt-2 pb-1 px-2 flex items-center justify-between">
        <h4 className="text-text-secondary text-sm font-semibold">
          Suggested for you
        </h4>
        <button className="text-sm font-semibold text-text-primary">
          See All
        </button>
      </div>
      {/* <div className="flex flex-col items-start justify-start w-full" > */}
      {featureUsers
        .filter((user) => user.id !== loggedInUserId)
        .map((user, idx) => (
          <MyUser key={idx} {...user} loggedInUserId={loggedInUserId} following={following}  />
        ))}
      {/* </div> */}
    </div>
  );
};

export default index;
