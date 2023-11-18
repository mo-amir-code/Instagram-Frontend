import React, { useEffect } from "react";
import Logo from "../assets/logo/instagram.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthLoader from "../components/loaders/AuthLoader";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, loginStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginStatus === "success") {
      navigate("/auth/verify");
    }
    if (isLoggedIn) {
      navigate("/");
    }
  }, [loginStatus, isLoggedIn]);

  return (
    <div className="flex min-h-screen">
      <div className={`w-full flex justify-center items-center`}>
        {loginStatus === "pending" ? (
          <AuthLoader />
        ) : (
          <section className="w-[300px] h-auto py-3">
            <div className="border border-text-secondary pb-5 pt-0 px-4">
              <div className="flex flex-col items-center justify-center">
                <img src={Logo} alt="" width={160} />
              </div>
              <Outlet />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
