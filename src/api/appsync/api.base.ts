/*
 * api.base.ts
 * author: evan kirkiles
 * created on Tue May 09 2023
 * 2023 the nobot space
 */

import { createApi } from '@reduxjs/toolkit/query/react';
import { appsyncBaseQuery } from 'api/aws';

export const appsyncApi = createApi({
  reducerPath: 'appsyncApi',
  tagTypes: ['User', 'Nobot'],
  baseQuery: appsyncBaseQuery,
  endpoints: (build) => ({}),
});