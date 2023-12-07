import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userContext } from '../../App';

const PrivetRoute = ({ children }) => {
    const [user, setUser] = useContext(userContext)
    const location = useLocation()

    return user._id ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivetRoute;