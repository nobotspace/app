/*
 * api.base.ts
 * author: evan kirkiles
 * created on Wed May 10 2023
 * 2023 the nobot space 
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthState } from "slices/authSlice";


export const appsyncApi = createApi({
  reducerPath: "apigatewayApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_GATEWAY_URL!,
    prepareHeaders: (_, { getState }) => {
      const {
        auth: { jwtToken },
      } = getState() as { auth: AuthState };
      return new Headers({
        Authorization: `Bearer ${jwtToken}`,
      });
    },
  }),
  endpoints: () => ({

  }),
});
