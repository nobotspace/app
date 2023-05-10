/*
 * Logout.tsx
 * author: evan kirkiles
 * created on Mon Feb 20 2023
 * 2023 channel studio
 */
import { useAppDispatch } from 'app/hooks';
import {AuthContext} from 'contexts/AuthContext';
import { useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { resetAuth } from 'slices/authSlice';

export default function LogoutPage() {
  const { signOut } = useContext(AuthContext)!;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(resetAuth());
    signOut();
    navigate("/login", { replace: true });
  }, [signOut, navigate, dispatch]);
  return (null);
}
