import React from "react";
import notFound from "../assets/loaders/notFound.svg";
import { useNavigate } from "react-router-dom";

const NotFound = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-black text-text-primary">
      <div className="w-[40%] max-sm:w-[80%] flex flex-col items-center space-y-4">
        <img src={notFound} alt="not found" />
        <div className="space-y-0 flex flex-col items-center justify-center">
          <h4 className="text-2xl max-md:text-xl max-sm:text-lg font-semibold">
            {message ? message : "Page not found!"}
          </h4>
          <p className="text-sm">
            Go back{" "}
            <span
              onClick={() => navigate("/")}
              className="text-text-link cursor-pointer"
            >
              home
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
