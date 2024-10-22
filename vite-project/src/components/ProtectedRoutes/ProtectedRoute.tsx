import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Context/UseAuth';

type Props = { children: React.ReactNode }

const ProtectedRoute = ({children}: Props) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    const { isAdmin } = useAuth();
    const { user } = useAuth();


  return isLoggedIn() && isAdmin() ? (
    <>{children}</> ) 
    : 
    (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;