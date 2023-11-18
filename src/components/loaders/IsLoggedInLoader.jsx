import React from "react";
import svg from "../../assets/loaders/AuthenticationSVG.svg"

const IsLoggedInLoader = () => {
  return (
    <img src={svg} alt="please log in " width={"300px"}/>
  );
};

export default IsLoggedInLoader;
