/*
 * Login.tsx
 * author: evan kirkiles
 * created on Tue May 09 2023
 * 2023 the nobot space 
 */

import { useContext, useEffect } from "react";
import { AuthContext } from "contexts/AuthContext";
import Login from "components/Login";
import { useLocation, useNavigate } from "react-router";
import { Helmet } from 'react-helmet-async';
import React from "react";

export default React.forwardRef<HTMLDivElement, {}>(function LoginPage(_, ref) {
  const { user } = useContext(AuthContext)!;

  // routing to restore previous URL
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // once logged in, redirect back to the "from" location, starting library processing
  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, from, navigate]);
  if (user) return null;

  return (
    <main className="LoginPage" ref={ref}>
      <Helmet>
        <meta name="theme-color" content="#000000" />
      </Helmet>
      <span className="LoginPage__title">
        NOBOTSPACE
      </span>
      <span className="LoginPage__aws">
        TEST VERSION<br />
        For: CPSC 478
      </span>
      <div className="LoginPage__formcontainer">
        <Login />
      </div>
      <span className="LoginPage__about">
        With automated generation of rigged, playable 3D nobot models.
      </span>
    </main>
  );
});
