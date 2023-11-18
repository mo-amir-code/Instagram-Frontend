import React, { useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import { account_category } from "../constants";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateMyUserAsync } from "../redux/features/user/userSlice";
import { X } from "@phosphor-icons/react";

const EditProfile = ({setEditProfile}) => {
  const [image, setImage] = useState(null);
  const { userInfo, userAvatar, status } = useSelector((state)=>state.user);
  const { loggedInUserId } = useSelector((state)=>state.auth);
  const imageRef = useRef();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const buffer = e.target.result;
        setImage(buffer);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleOnSubmit = (data) =>{
    if(image){
        dispatch(updateMyUserAsync({...data, avatar:image, id:loggedInUserId}))
    }else{
        dispatch(updateMyUserAsync({...data, avatar:null, id:loggedInUserId}))
    }
    
  }

  return (
    <div className="relative w-full h-full p-8">
      <div className="text-text-primary space-y-6 w-full">
        <h4 className="text-2xl font-medium py-4">Edit Profile</h4>
        <form className="px-20 space-y-6 w-full" onSubmit={handleSubmit(handleOnSubmit)} >
          {/* user can change profile image*/}
          <div className="relative flex items-center space-x-8">
            <div className="w-20 flex items-center justify-end">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={userAvatar} alt={userInfo.name} className="w-10" />
              </div>
            </div>
            <div className="flex flex-col pb-1">
              <h2 className="text-base font-semibold">{userInfo.username}</h2>
              <p
                onClick={() => imageRef.current.click()}
                className="text-sm cursor-pointer font-semibold text-text-link"
              >
                Change profile photo
              </p>
            </div>
            <input
              type="file"
              ref={imageRef}
              onChange={handleChangeImage}
              accept="image/*"
              className="hidden"
            />
          </div>
          {/* Name */}
          <div className="flex space-x-8">
            <div className="w-20 flex justify-end">
              <h2 className="text-base font-semibold">Name</h2>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <input
                name="name"
                defaultValue={userInfo.name}
                {...register("name")}
                rows={1}
                className="outline-none rounded-sm focus:bg-transparent bg-transparent border border-hover-primary w-[60%] px-2 py-1"
              />
              <span className="text-text-secondary text-xs"> 12 / 15 </span>
            </div>
          </div>
          {/* Username */}
          <div className="flex space-x-8">
            <div className="w-20 flex justify-end">
              <h2 className="text-base font-semibold">Username</h2>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <input
                name="username"
                defaultValue={userInfo.username}
                {...register("username")}
                rows={1}
                className="outline-none focus:bg-transparent rounded-sm bg-transparent border border-hover-primary w-[60%] px-2 py-1"
              />
              <span className="text-text-secondary text-xs"> 12 / 15 </span>
            </div>
          </div>
          {/* Bio */}
          <div className="flex space-x-8">
            <div className="w-20 flex justify-end">
              <h2 className="text-base font-semibold">Bio</h2>
            </div>
            <div className="w-full flex flex-col space-y-2">
              <textarea
                name="bio"
                defaultValue={userInfo.bio}
                {...register("bio")}
                rows={3}
                cols={12}
                className="outline-none rounded-sm bg-transparent border border-hover-primary w-[60%] px-2 py-1"
              />
              <span className="text-text-secondary text-xs"> 12 / 60 </span>
            </div>
          </div>
          {/* Category */}
          <div className="flex space-x-8">
            <div className="w-20 flex justify-end">
              <h2 className="text-base font-semibold">Category</h2>
            </div>
            <div className="w-full">
              <select
              {...register("category")}
                name="category"
                defaultValue={userInfo.category}
                className="w-[60%] bg-transparent border border-hover-primary rounded-sm editSelect p-1"
              >
                <option value="none">Select Category</option>
                {account_category.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Gender */}
          <div className="flex space-x-8">
            <div className="w-20 flex justify-end">
              <h2 className="text-base font-semibold">Gender</h2>
            </div>
            <div className="w-full flex flex-col">
              <select
                name="gender"
                defaultValue={userInfo.gender}
                {...register("gender")}
                className="w-[60%] bg-transparent border border-hover-primary rounded-sm editSelect p-1"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="TRANSGENDER">Transgender</option>
              </select>
            </div>
          </div>
          {/* Submit button */}
          <div className="px-28">
            <button type="submit" className="text-text-primary text-sm font-semibold bg-text-link py-[0.4rem] rounded-md flex items-center justify-center w-20">
              {status ==="pending"? <div className="loader"></div> : "Submit" }
            </button>
          </div>
        </form>
      </div>
      <button onClick={()=>setEditProfile(false)} className="absolute top-12 right-10 text-text-primary" ><X size={24} /></button>
    </div>
  );
};

export default EditProfile;
