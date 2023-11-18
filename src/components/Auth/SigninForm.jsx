import React from "react";
import LoginWIthGoogleButton from "../buttons/LoginWIthGoogleButton";
import Divider from "./Divider";
import SigninButton from "../buttons/SigninButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signinAsync } from "../../redux/features/Auth/authSlice";

const SigninForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(signinAsync(data));
  };

  return (
    <div className="space-y-3">
      <LoginWIthGoogleButton />
      <Divider />
      <form onSubmit={handleSubmit((data)=>onSubmit(data))} className="text-xs space-y-3">
        <div className="space-y-2">
          <input
            type="text"
            name="email"
            {...register("email", { required: "Username or email is required" })}
            placeholder="username or email"
            className="py-2 px-1 w-full outline-none border border-hover-primary focus:border-text-link rounded-sm"
          />
          <input
            type="text"
            name="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className="py-2 px-1 w-full outline-none border border-hover-primary focus:border-text-link rounded-sm"
          />
        </div>
        <div>
          <p className="text-text-link font-normal text-xs text-center">
            Forgot password?
          </p>
        </div>
        <SigninButton />
      </form>
      <div className="border border-text-secondary text-xs flex items-center justify-center py-4 space-x-2 text-text-primary">
        <span>Don't have an account?</span>{" "}
        <span className="text-text-link">
          <Link to={"/auth/signup"}>Sign up</Link>
        </span>
      </div>
    </div>
  );
};

export default SigninForm;
