import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice"
import appReducer from "./features/app/appSlice"
import userReducer from "./features/user/userSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        user: userReducer,
    },
})

export default store