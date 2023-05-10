/*
 * NewUser.tsx
 * author: evan kirkiles
 * created on Tue May 09 2023
 * 2023 the nobot space 
 */

import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { userPool } from "api/aws";
import { LoginFlow, LoginFlowProps } from "components/Login";
import { forwardRef, useCallback, useEffect, useState } from "react";

export default forwardRef<HTMLFormElement, LoginFlowProps>(
  function LoginNewUser(
    { setCurrentFlow, setError, setCognitoUser, onLoginSuccess },
    ref
  ) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);

  // submission form for authenticating the user
  const onSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e && e.preventDefault();
      if (password !== password1) {
        setError("Passwords must match.")
        return false;
      }
      setIsLoading(true);
      const attribEmail = new CognitoUserAttribute({
        Name: 'email',
        Value: email
      });
      userPool.signUp(username, password, [attribEmail], [], function (err, result) {
        setIsLoading(false);
        if (err) {
          setError(err.message || JSON.stringify(err));
          return;
        }
        console.log(result);
        if (!result) {
          console.error("No result returned");
          return;
        }
        const cognitoUser = result.user;
        if (cognitoUser) setCognitoUser(cognitoUser);
        if (!result.userConfirmed) {
          setCurrentFlow(LoginFlow.ConfirmationRequired);
        } else {
          setCurrentFlow(LoginFlow.UserPassword);
        }
      });
      return false;
    },
    [ 
      email,
      password,
      password1,
      username,
      setError,
      setCognitoUser,
      setCurrentFlow
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
    <form onSubmit={onSubmit} className="Login__form" name="NewUser" ref={ref}>
    <h1 className="Login__title">SIGN UP</h1>
    <input
        value={username}
        className="Login__forminput"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        type="username"
        name="username"
      /> <input
      value={email}
      className="Login__forminput"
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      required
      type="email"
      name="email"
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
      <input
        value={password1}
        className="Login__forminput"
        placeholder="Confirm Password"
        onChange={(e) => setPassword1(e.target.value)}
        required
        type="password"
        name="password1"
      />
      <button type="submit" className="Login__formsubmit">
        SUBMIT
      </button>
      <button type="button" onClick={() => setCurrentFlow(LoginFlow.UserPassword)}>
        Already have an account?
      </button>
    </form>
  )
});