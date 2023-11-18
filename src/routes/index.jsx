import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
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

const router = () => {

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
          path: ":profile",
          element: <ProfilePage/>,
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
