/*
 * UserPassword.tsx
 * author: evan kirkiles
 * created on Tue May 09 2023
 * 2023 the nobot space 
 */

import { forwardRef, useCallback, useEffect, useState } from "react";
import { userPool } from "api/aws";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { LoginFlow, LoginFlowProps } from "components/Login";

export default forwardRef<HTMLFormElement, LoginFlowProps>(
  function LoginUserPassword(
    { setCurrentFlow, setError, setCognitoUser, onLoginSuccess },
    ref
  ) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setIsLoading] = useState(false);

    // submission form for authenticating the user
    const onSubmit = useCallback(
      (e?: React.FormEvent) => {
        e && e.preventDefault();
        if (!username || !password) return;
        const cognitoUser = new CognitoUser({
          Username: username,
          Pool: userPool,
        });
        setCognitoUser(cognitoUser);
        setIsLoading(true);
        cognitoUser.authenticateUser(
          new AuthenticationDetails({
            Username: username,
            Password: password,
          }),
          {
            onSuccess: function (result) {
              onLoginSuccess(result.getIdToken());
              setIsLoading(false);
            },
            onFailure: function (result) {
              setError(result);
              setIsLoading(false);
            },
            newPasswordRequired: () => {
              setCurrentFlow(LoginFlow.NewPasswordRequired);
            },
          }
        );
        return false;
      },
      [
        username,
        password,
        setCognitoUser,
        onLoginSuccess,
        setError,
        setCurrentFlow,
      ]
    );

    // useeffect submits
    useEffect(() => {
      const listener = (event: KeyboardEvent) => {
        if (loading) return;
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          onSubmit();
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }, [onSubmit, loading]);

    return (
      <form onSubmit={onSubmit} className="Login__form" ref={ref}>
      <h1 className="Login__title">SIGN IN</h1>
        <input
          value={username}
          className="Login__forminput"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username or email"
          required
          type="username"
          name="username"
        />
        <input
          value={password}
          className="Login__forminput"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          type="password"
          name="password"
        />
        <button type="submit" className="Login__formsubmit">
          SUBMIT
        </button>
      <button type="button" onClick={() => setCurrentFlow(LoginFlow.NewUser)}>
        Don't have an account?
      </button>
      </form>
    );
  }
);
