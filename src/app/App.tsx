/*
 * App.tsx
 * author: evan kirkiles
 * created on Sun May 07 2023
 * 2023 the nobot space 
 */
// import { useRef } from 'react';
import { Route, Routes, useLocation } from "react-router";
import RequireAuth from 'components/Requires/RequireAuth';
import { useRef } from "react";
import LoginPage from "views/Login";
import LogoutPage from "views/Logout";
import Layout from "views/Layout";
import Home from "views/Home";
import Play from "views/Play";

function App() {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <Routes location={location}>
      <Route path="/login" element={<LoginPage ref={pageRef} />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route
        path="*"
        element={
          <RequireAuth>
            <Layout ref={pageRef}>
              <Routes location={location}>
                <Route path="/nobots" element={<Play />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </Layout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
