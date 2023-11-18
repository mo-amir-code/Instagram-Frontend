import React from "react";
import LoginWIthGoogleButton from "../buttons/LoginWIthGoogleButton";
import Divider from "./Divider";
import SignupButton from "../buttons/SignupButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signupAsync } from "../../redux/features/Auth/authSlice";

const SignupForm = () => { 
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(signupAsync(data))
  }

  return (
    <>
    <div className="space-y-3">
      <div className="flex flex-col items-center justify-center">
        <p
          className="text-center text-sm font-semibold text-text-secondary"
          style={{ lineHeight: 1.2 }}
        >
          Sign up to see photos and videos from your friends.
        </p>
      </div>
      <LoginWIthGoogleButton />
      <Divider />
      <form onSubmit={handleSubmit((data)=>onSubmit(data))} className="text-xs space-y-3">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="py-2 px-1 w-full outline-none border border-hover-primary focus:border-text-link rounded-sm"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                message: "email is not valid",
              },
            })}
          />
          <input
            type="text"
            name="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className="py-2 px-1 w-full outline-none border border-hover-primary focus:border-text-link rounded-sm"
          />
          <input
            type="text"
            name="username"
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
            className="py-2 px-1 w-full outline-none border border-hover-primary focus:border-text-link rounded-sm"
          />
          <input
            type="text"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            name="password"
            className="py-2 px-1 w-full outline-none border border-hover-primary focus:border-text-link rounded-sm"
          />
          <select
            className="py-2 px-1 w-full outline-none border border-hover-primary focus:border-text-link rounded-sm"
            {...register("gender", { required: "Gender is required" })}
          >
            <option name="GENDER" value={"GENDER"}>
              GENDER
            </option>
            <option name="MALE" value={"MALE"}>
              MALE
            </option>
            <option name="FEMALE" value={"FEMALE"}>
              FEMALE
            </option>
            <option name="TRANSGENDER" value={"TRANSGENDER"}>
              TRANSGENDER
            </option>
          </select>
        </div>
        <div className="space-y-3">
          <p
            className="text-center text-[0.68rem] font-normal text-text-secondary"
            style={{ lineHeight: 1.2 }}
          >
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <span className="text-text-link">Learn More</span>
          </p>
          <p
            className="text-center text-[0.68rem] font-normal text-text-secondary"
            style={{ lineHeight: 1.2 }}
          >
            By signing up, you agree to our{" "}
            <span className="text-text-link">Terms , Privacy Policy</span> and{" "}
            <span className="text-text-link">Cookies Policy</span>.
          </p>
        </div>
        <SignupButton />
      </form>
      <div className="border border-text-secondary text-xs flex items-center justify-center py-4 space-x-2 text-text-primary">
        <span>Have an account?</span>{" "}
        <span className="text-text-link">
          <Link to={"/auth/signin"}>Log in</Link>
        </span>
      </div>
    </div>
    </>
  );
};

export default SignupForm;
