import React from "react";
import svg from "../../assets/loaders/AuthenticationSVG.svg";

const IsLoggedInLoader = () => {
  return (
    <img
      src={svg}
      alt="please log in "
      className="w-[300px] max-sm:w-[150px]"
    />
  );
};

export default IsLoggedInLoader;
