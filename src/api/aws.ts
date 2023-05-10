/*
 * aws.ts
 * author: evan kirkiles
 * created on Sun May 07 2023
 * 2023 the nobot space 
 */

import { CognitoIdToken, CognitoUserPool } from "amazon-cognito-identity-js";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { S3Client } from "@aws-sdk/client-s3";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { AuthState } from "slices/authSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const Region = process.env.REACT_APP_COGNITO_REGION!;
export const IdentityPoolId = process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID!;
export const UserPoolId = process.env.REACT_APP_COGNITO_USER_POOL_ID!;
export const ClientId = process.env.REACT_APP_COGNITO_CLIENT_ID!;
export const MountsBucket = process.env.REACT_APP_S3_BUCKET_MOUNTS;

// initialize our Cognito User Pool for use in the app
export const userPool = new CognitoUserPool({
  UserPoolId,
  ClientId,
});

// initialize the S3 client. we will update it with authenticated
// credentials once we have a user's JWT Token.
export const Client = {
  S3: new S3Client({
    region: Region,
    credentials: fromCognitoIdentityPool({
      identityPoolId: IdentityPoolId,
      clientConfig: { region: Region },
    }),
  }),
};

/* --------------------------- User authorization --------------------------- */

// updates the AWS credentials of all of our AWS SDK clients
export function updateAWSCredentials(idToken: CognitoIdToken) {
  const credentials = fromCognitoIdentityPool({
    identityPoolId: IdentityPoolId,
    clientConfig: { region: Region },
    logins: {
      [`cognito-idp.${Region}.amazonaws.com/${UserPoolId}`]: idToken.getJwtToken(),
    },
  });
  // update all of the clients
  Client.S3 = new S3Client({
    region: Region,
    credentials,
  });
}

// clears the AWS credentials of the logins
export function clearAWSCredentials() {
  const credentials = fromCognitoIdentityPool({
    identityPoolId: IdentityPoolId,
    clientConfig: { region: Region },
  });
  // reset all of the clients
  Client.S3 = new S3Client({
    region: Region,
    credentials,
  });
}

/* -------------------------------------------------------------------------- */
/*                               Query Endpoints                              */
/* -------------------------------------------------------------------------- */

// Base query for AppSync requests
export const appsyncBaseQuery = graphqlRequestBaseQuery({
  url: process.env.REACT_APP_APPSYNC_URL!,
  prepareHeaders: (_, { getState }) => {
    const {
      auth: { jwtToken },
    } = getState() as { auth: AuthState };
    return new Headers({
      Authorization: `Bearer ${jwtToken}`,
    });
  },
});

// Base query for API Gateway requests
export const apiGatewayBaseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_GATEWAY_URL!,
  prepareHeaders: (_, { getState }) => {
    const {
      auth: { jwtToken },
    } = getState() as { auth: AuthState };
    return new Headers({
      Authorization: `Bearer ${jwtToken}`,
    });
  },
});