/*
 * store.ts
 * author: evan kirkiles
 * created on Sun May 07 2023
 * 2023 the nobot space
 */

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import localforage from "localforage";
import rootReducer from "./reducers";
import { appsyncApi } from "api/appsync/api.base";

// persisted reducer for maintaining logged-in status
const persistedReducer = persistReducer(
  {
    key: "nobotspace",
    storage: localforage,
    whitelist: ["auth", "ui"],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ignored actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(appsyncApi.middleware)
});

// Export persisted store here
export const persistedStore = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
