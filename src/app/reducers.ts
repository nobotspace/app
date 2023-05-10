/*
 * reducers.ts
 * author: evan kirkiles
 * created on Sun May 07 2023
 * 2023 the nobot space 
 */

import { combineReducers } from "@reduxjs/toolkit";
import { appsyncApi } from "api/appsync/api.base";
import authReducer from "slices/authSlice";
// import uiReducer from "slices/uiSlice";
// import { prolificApi } from "api/prolific/api.base";
// import { mountsApi } from "api/mounts/api.base";

const rootReducer = combineReducers({
  auth: authReducer,
  [appsyncApi.reducerPath]: appsyncApi.reducer,
  // ui: uiReducer,
  // [prolificApi.reducerPath]: prolificApi.reducer,
});

export default rootReducer;
