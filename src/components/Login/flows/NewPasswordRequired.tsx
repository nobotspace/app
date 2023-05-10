/*
 * NewPasswordRequired.tsx
 * author: evan kirkiles
 * created on Tue May 09 2023
 * 2023 the nobot space 
 */

import { forwardRef, useCallback, useEffect, useState } from "react";
import { LoginFlowProps } from "components/Login";

export default forwardRef<HTMLFormElement, LoginFlowProps>(function LoginUserPassword({
  setError,
  cognitoUser,
  onLoginSuccess,
}, ref) {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [loading, setIsLoading] = useState(false);

  // submission form for authenticating the user
  const onSubmit = useCallback(
    (e?: React.FormEvent) => {
      e && e.preventDefault();
      if (!password1 || !password2 || !cognitoUser) return;
      setIsLoading(true);
      cognitoUser?.completeNewPasswordChallenge(password1, {
        name
      }, {
        onSuccess: function(result) {
          onLoginSuccess(result.getIdToken());
          setIsLoading(false);
        },
        onFailure: function(err) {
          setError(err);
          setIsLoading(false);
        },
      });
      return false;
    },
    [
      cognitoUser,
      name,
      password1,
      password2,
      onLoginSuccess,
      setError,
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
    <h1 className="Login__title">SET PASSWORD</h1>
      <input
        value={name}
        className="Login__forminput"
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        type="text"
        name="name"
      />
      <input
        value={password1}
        className="Login__forminput"
        onChange={(e) => setPassword1(e.target.value)}
        placeholder="Password"
        required
        type="password"
        name="password"
      />
      <input
        value={password2}
        className="Login__forminput"
        onChange={(e) => setPassword2(e.target.value)}
        placeholder="Verify password"
        required
        type="password"
        name="password"
      />
      <button type="submit" className="Login__formsubmit">
        SUBMIT
      </button>
    </form>
  );
});
