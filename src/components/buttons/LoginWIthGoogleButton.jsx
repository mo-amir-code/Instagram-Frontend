import React from "react";
import { GoogleLogo } from "@phosphor-icons/react";

const LoginWIthGoogleButton = () => {
  return (
    <button className="text-text-primary flex items-center justify-center text-xs font-semibold bg-google-button w-full py-2 rounded-lg space-x-1 ">
        <GoogleLogo size={20} />
        <span>Log in with Google</span>
    </button>
  );
};

export default LoginWIthGoogleButton;
