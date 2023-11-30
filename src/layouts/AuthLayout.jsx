import React, { useEffect, useState } from "react";
import Logo from "../assets/logo/instagram.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileLoader from "../components/loaders/ProfileLoader";
import { X } from "@phosphor-icons/react";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [showAccounts, setShowAccounts] = useState(true);
  const { isLoggedIn, loginStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginStatus === "success") {
      navigate("/auth/verify");
    }
    if (isLoggedIn) {
      navigate("/");
    }
  }, [loginStatus, isLoggedIn]);

  const hanldeHome = () => {
    navigate("/");
  };

  const handleCloseAccounts = () => {
    setShowAccounts(false);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className={`w-full flex justify-center items-center`}>
          {loginStatus === "pending" ? (
            <ProfileLoader />
          ) : (
            <section className="w-[300px] h-auto py-3 space-y-2">
              <div className="border border-text-secondary pb-5 pt-0 px-4">
                <div className="flex flex-col items-center justify-center">
                  <img src={Logo} alt="" width={160} />
                </div>
                <Outlet />
              </div>
              <div className="border border-text-secondary px-4 text-xs text-text-primary flex items-center justify-center py-3">
                <p>
                  <span
                    onClick={() => hanldeHome()}
                    className="text-text-link cursor-pointer"
                  >
                    Explore
                  </span>{" "}
                  without signin/signup
                </p>
              </div>
              {showAccounts && (
                <div className="absolute top-0 right-0">
                  <div className="bg-bg-primary border border-text-secondary px-4 text-xs text-text-primary flex flex-col items-start justify-center py-3 space-y-2 relative">
                    <div>
                      <h4>
                        <strong>Account 1</strong>
                      </h4>
                      <div className="flex items-start flex-col justify-center">
                        <p>Email: demo@gmail.com</p>
                        <p>password: Qwerty12!@</p>
                      </div>
                    </div>
                    <div>
                      <h4>
                        <strong>Account 2</strong>
                      </h4>
                      <div className="flex items-start flex-col justify-center">
                        <p>Email: demo@gmail.com</p>
                        <p>password: Qwerty12!@</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCloseAccounts()}
                      className="absolute top-[0.2rem] right-2"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
