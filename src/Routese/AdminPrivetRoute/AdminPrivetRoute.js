import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userContext } from '../../App';

const AdminPrivetRoute = ({children}) => {
    const [user, setUser] = useContext(userContext)
    const location = useLocation()

    return user.role === "admin" ? children : <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default AdminPrivetRoute;