import { configureStore } from "@reduxjs/toolkit";
import  userReducer from "./auth";

const store = configureStore({
  reducer: {
    authInfo: userReducer
  },
});

export default store;