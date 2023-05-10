/*
 * RequireAuth.tsx
 * author: evan kirkiles
 * created on Sun May 07 2023
 * 2023 the nobot space 
 */

import { useAppSelector } from "app/hooks";
import { useLocation, Navigate } from 'react-router';
import { LogInState, selectLoggedIn } from "slices/authSlice";

/**
 * 
 * @param param0 
 * @returns 
 */
export default function RequireAuth({ children }: React.PropsWithChildren) {
  const loggedIn = useAppSelector(selectLoggedIn);
  const location = useLocation();
  if (!loggedIn) {
    // redirect to /login page, saving previous location before redirection.
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (loggedIn === LogInState.Refreshing) {
    return <>Refreshing auth...</>;
  }
  return <>{children}</>;
}
