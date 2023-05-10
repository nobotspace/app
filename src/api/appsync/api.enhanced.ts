/*
 * api.enhanced.ts
 * author: evan kirkiles
 * created on Tue May 09 2023
 * 2023 the nobot space
 */

import { apiGatewayBaseQuery } from 'api/aws';
import { api as appsyncGeneratedApi } from './api.generated';

export const appsyncApi = appsyncGeneratedApi
  .injectEndpoints({
    endpoints: (build) => ({
      // creates a nobot in the system by calling the API Gateway URL
      createNobot: build.mutation<
        { id: string; user_id: string },
        { user_id: string }
      >({
        queryFn: async (arg, api, extraOptions, baseQuery) => {
          const resp = await apiGatewayBaseQuery(
            {
              url: '/nobots/generate',
              method: 'POST',
              body: {},
            },
            api,
            extraOptions
          );
          return {
            data: resp.data as { id: string; user_id: string },
          };
        },
        invalidatesTags: (result) =>
          result ? [{ type: 'Nobot' }, { type: 'Nobot', id: result.id }] : [],
      }),
    }),
  })
  .enhanceEndpoints({
    endpoints: {
      GetUser: {
        providesTags: (result) =>
          result?.getUser ? [{ type: 'User', id: result.getUser.id }] : [],
      },
      ListNobots: {
        providesTags: (result) =>
          result?.listNobots ? [{ type: 'Nobot' }] : [],
      },
    },
  });

export const { useGetUserQuery, useLazyGetUserQuery, useCreateNobotMutation } =
  appsyncApi;
