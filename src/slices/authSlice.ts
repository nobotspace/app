/*
 * authSlice.ts
 * author: evan kirkiles
 * created on Sun May 07 2023
 * 2023 the nobot space 
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export enum LogInState {
  None,
  Refreshing,
  LoggedIn,
}

export interface AuthState {
  loggedIn: LogInState;
  jwtToken: string | null;
  sub: string | null;
}

const initialState: AuthState = {
  loggedIn: LogInState.None,
  jwtToken: null,
  sub: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => initialState,
    setAuth: (state, { payload }: PayloadAction<{ jwtToken: string, sub: string} | null>) => {
      if (!payload) {
        state.loggedIn = LogInState.None;
        state.jwtToken = null;
        state.sub = null;
        return;        
      }
      state.loggedIn = LogInState.LoggedIn;
      state.jwtToken = payload.jwtToken;
      state.sub = payload.sub;
    },
    setLogInState: (state, { payload }: PayloadAction<LogInState>) => {
      state.loggedIn = payload;
    },
  },
});

export const { resetAuth, setAuth, setLogInState } = authSlice.actions;

export default authSlice.reducer;

export const selectJwtToken = (state: RootState) => state.auth.jwtToken;
export const selectLoggedIn = (state: RootState) => state.auth.loggedIn;
export const selectSub = (state: RootState) => state.auth.sub;

