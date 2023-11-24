import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import authReducer from "./features/Auth/authSlice";
import storage from "redux-persist/lib/storage";
import appReducer from "./features/app/appSlice";
import userReducer from "./features/user/userSlice";
import { persistStore } from "redux-persist";

// Persisting storage
const authPersistConfige = {
  key: "auth",
  storage,
};

const appPersistConfige = {
  key: "app",
  storage,
  whitelist: ["active", "pcNavModal"],
};

const persistedAuthReducer = persistReducer(authPersistConfige, authReducer);
const persistedAppReducer = persistReducer(appPersistConfige, appReducer);

const rootReducers = combineReducers({
  app: persistedAppReducer,
  auth: persistedAuthReducer,
  user: userReducer,
});

// Store part

const store = configureStore({
  reducer: rootReducers,
});

const persistor = persistStore(store);

export { store, persistor };
