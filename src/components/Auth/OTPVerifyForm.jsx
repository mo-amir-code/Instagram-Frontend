import React from "react";
import LoginWIthGoogleButton from "../buttons/LoginWIthGoogleButton";
import Divider from "./Divider";
import VerifyButton from "../buttons/VerifyButton";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { verifyAsync } from "../../redux/features/Auth/authSlice"
import { getLSItem } from "../../services/AuthServices";

const SigninForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
      let otp = '';
      for(let key in data){
        otp += `${data[key]}`
      }
      const email = getLSItem("email")
      dispatch(verifyAsync({email, otp}));
  };

  return (
    <div className="space-y-3">
      <LoginWIthGoogleButton />
      <Divider />
      <form onSubmit={handleSubmit((data)=>onSubmit(data))} className="text-xs space-y-3">
        <div className="space-x-1 grid grid-cols-5">
          {[1, 2, 3, 4, 5].map((el, idx) => (
            <input
              key={idx}
              type="number"
              {...register(`input${el}`, { required: true, maxLength: 1 })}
              name={`input${el}`}
              placeholder="-"
              className="py-2 outline-none border border-hover-primary focus:border-text-link rounded-sm text-center"
              maxLength={1}
            />
          ))}
        </div>
        <VerifyButton />
      </form>
    </div>
  );
};

export default SigninForm;
