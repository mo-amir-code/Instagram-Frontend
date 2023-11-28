import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import DashboardLayout from "../layouts";
import Explore from "../pages/Explore";
import AuthLayout from "../layouts/AuthLayout";
import SignupForm from "../components/Auth/SignupForm";
import SigninForm from "../components/Auth/SigninForm";
import OTPVerifyForm from "../components/Auth/OTPVerifyForm";
import { useSelector } from "react-redux";
import LoginAccount from "../pages/LoginAccount";
import ProfilePage from "../pages/ProfilePage";
import Reels from "../pages/Reels";
import Messages from "../pages/Messages";
import { useEffect } from "react";
import { connectSocket } from "../socket";
import StoryCanvasPage from "../pages/StoryCanvas";

const router = () => {
  const { isLoggedIn, loggedInUserId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      connectSocket(loggedInUserId);
    }
  }, [isLoggedIn]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "p/:id",
          // element: <Home />,
        },
        {
          path: "explore",
          element: <Explore />,
        },
        {
          path: "create/story",
          element: <StoryCanvasPage />,
        },
        {
          path: "reels",
          element: <Reels />,
        },
        {
          path: "direct/:userId",
          element: <Messages />,
        },
        {
          path: ":profile",
          element: <ProfilePage />,
        },
        {
          path: "signin-error",
          element: <LoginAccount />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "signup",
          element: <SignupForm />,
        },
        {
          path: "signin",
          element: <SigninForm />,
        },
        {
          path: "verify",
          element: <OTPVerifyForm />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default router;
