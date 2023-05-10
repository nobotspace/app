/*
 * ConfirmationRequired.tsx
 * author: evan kirkiles
 * created on Tue May 09 2023
 * 2023 the nobot space 
 */

import { LoginFlow, LoginFlowProps } from "components/Login";
import { forwardRef, useCallback, useEffect, useState } from "react";

export default forwardRef<HTMLFormElement, LoginFlowProps>(
  function LoginConfirmationRequired(
    { setCurrentFlow, setError, setCognitoUser, cognitoUser },
    ref
  ) {
  const [confirmCode, setConfirmCode] = useState("");
  const [loading, setIsLoading] = useState(false);

  // submission form for authenticating the user
  const onSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      e && e.preventDefault();
      setIsLoading(true);
      cognitoUser?.confirmRegistration(confirmCode, true, (err, result) => {
        if (err) {
          setError(err.message || JSON.stringify(err));
          return;
        }
        setCurrentFlow(LoginFlow.UserPassword);
      });
      return false;
    },
    [ 
      cognitoUser,
      confirmCode,
      setError,
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
    <h1 className="Login__title">CONFIRM EMAIL</h1>
    <span>Please enter the code that was sent to your email.</span>
    <input
        value={confirmCode}
        className="Login__forminput"
        onChange={(e) => setConfirmCode(e.target.value)}
        placeholder="Confirmation code"
        required
        type="text"
        name="confirmation"
      />
      <button type="submit" className="Login__formsubmit">
        SUBMIT
      </button>
    </form>
  )
});