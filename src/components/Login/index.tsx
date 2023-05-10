/*
 * index.tsx
 * author: evan kirkiles
 * created on Sun May 07 2023
 * 2023 the nobot space 
 */
import { CognitoIdToken, CognitoUser } from "amazon-cognito-identity-js";
import { useAppSelector } from "app/hooks";
import {AuthContext} from "contexts/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { selectLoggedIn } from "slices/authSlice";
import LoginUserPassword from "./flows/UserPassword";
import LoginNewUser from "./flows/NewUser";
import NewPasswordRequired from "./flows/NewPasswordRequired";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import ConfirmationRequired from "components/Login/flows/ConfirmationRequired";

export enum LoginFlow {
  NewUser,
  UserPassword,
  NewPasswordRequired,
  ConfirmationRequired
}

export interface LoginFlowProps {
  setCurrentFlow: (newFlow: LoginFlow) => void;
  setError: (error: string) => void;
  setCognitoUser: (user: CognitoUser) => void;
  onLoginSuccess: (idToken: CognitoIdToken) => void;
  cognitoUser: CognitoUser | null;
  ref: React.ForwardedRef<HTMLFormElement>;
}

export default function Login() {
  // statefuls
  const stageRef = useRef(null);

  // auth statefuls
  const { onSignIn} = useContext(AuthContext)!;
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);
  const [currentFlow, setCurrentFlow] = useState(LoginFlow.UserPassword);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // logged in status statefuls
  const location = useLocation();
  const navigate = useNavigate();
  const loggedIn = useAppSelector(selectLoggedIn);
  const from = location.state?.from?.pathname || '/';
  // if logged in, redirect back to the "from" location
  useEffect(() => {
    if (loggedIn) {
      navigate(from, { replace: true });
    }
  }, [from, loggedIn, navigate]);

  // function to call when cognito process finishes to propagate the user
  async function onLoginSuccess(idToken: CognitoIdToken) {
    onSignIn(cognitoUser, idToken);
  }

  // parses flow states into the state of the form
  function getCurrentFlowComponent() {
    const flowProps: LoginFlowProps = {
      setCurrentFlow,
      setError,
      cognitoUser,
      setCognitoUser,
      onLoginSuccess,
      ref: stageRef
    };
    switch (currentFlow) {
      case LoginFlow.NewUser:
        return <LoginNewUser {...flowProps} />;
      case LoginFlow.UserPassword:
        return <LoginUserPassword {...flowProps} />;
      case LoginFlow.NewPasswordRequired:
        return <NewPasswordRequired {...flowProps} />;
      case LoginFlow.ConfirmationRequired:
        return <ConfirmationRequired {...flowProps} />;
    }
  }

  return <div className="Login">
    <SwitchTransition>
      <CSSTransition
        key={currentFlow}
        timeout={300}
        classNames="Transition__faderightswitch"
        nodeRef={stageRef}>
        {getCurrentFlowComponent()}
      </CSSTransition>
    </SwitchTransition>
  </div>;
}