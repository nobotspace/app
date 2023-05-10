/*
 * AuthContext.tsx
 * author: evan kirkiles
 * created on Thu Feb 23 2023
 * 2023 experimount
 */

import { createContext, useEffect, useState } from 'react';
import {
  CognitoIdToken,
  CognitoUser,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { clearAWSCredentials, updateAWSCredentials, userPool } from 'api/aws';
import { useAppDispatch } from 'app/hooks';
import { LogInState, setAuth, setLogInState } from 'slices/authSlice';

// refresh token when 15 minutes away from refresh state
const REFRESH_BEFORE_MINUTES = 15;

type AuthContextType = {
  user: CognitoUser | null;
  onSignIn: (user: CognitoUser | null, idToken: CognitoIdToken | null) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/**
 * Maintains the currently-logged in cognito user
 * @param param0
 * @returns
 */
export default function AuthContextProvider({
  children,
}: React.PropsWithChildren) {
  // every time the cognito user changes, we need to update the login
  const [cognitoUser, setCognitoUser] = useState(userPool.getCurrentUser());
  const dispatch = useAppDispatch();

  // when user is set by the Login method // on startup, get a new JWT Token
  useEffect(() => {
    // function to pass to each of our getSession // refreshSession
    function validateSession(err: Error, session: CognitoUserSession | null) {
      if (!err && session?.isValid()) {
        if (
          (session.getIdToken().getExpiration() - Date.now() / 1000) / 60 <
          REFRESH_BEFORE_MINUTES
        ) {
          setLogInState(LogInState.Refreshing);
          cognitoUser!.refreshSession(
            session.getRefreshToken(),
            validateSession
          );
        } else {
          // propagate new JWTToken throughout the app
          const IdToken = session.getIdToken();
          dispatch(
            setAuth({
              jwtToken: IdToken.getJwtToken(),
              sub: IdToken.payload.sub,
            })
          );
          updateAWSCredentials(IdToken);
        }
      } else {
        // if (err) console.error(err.message || JSON.stringify(err));
        dispatch(setAuth(null));
        return;
      }
    }

    // now check our cognito user
    if (!cognitoUser) {
      dispatch(setAuth(null));
    } else {
      // get current session in order to get the JWT token
      cognitoUser.getSession(validateSession);
    }
  }, [cognitoUser, dispatch]);

  // set cognito user also updates the redux state
  const onSignIn = (
    user: CognitoUser | null,
    IdToken: CognitoIdToken | null
  ) => {
    setCognitoUser(user);
    dispatch(
      setAuth(
        IdToken
          ? { jwtToken: IdToken.getJwtToken(), sub: IdToken.payload.sub }
          : null
      )
    );
  };

  // sign out clears the cognito user
  const signOut = () => {
    if (!cognitoUser) return;
    dispatch(setAuth(null));
    cognitoUser.signOut();
    clearAWSCredentials();
    setCognitoUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: cognitoUser,
        onSignIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
