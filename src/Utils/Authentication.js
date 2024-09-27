import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

export const Authentication = ({ children }) => {
    const { authentication } = useSelector((state) => state.user);
    return authentication ? children : <Navigate to="/login" />;
}
export const AuthRoute = ({ children }) => {
    // const { authentication } = useSelector((state) => state.user);
    // const navigate = useNavigate();

    // const navigateUser = useCallback(() => {
    //     navigate(-1);
    // }, [navigate])
    // useEffect(() => {
    //     if (authentication) {
    //         // Navigate back if authenticated
    //         navigateUser()
    //     }
    // }, [authentication, navigate,navigateUser]);

    // // If not authenticated, render children or redirect to login
    // return !authentication ? children : navigateUser();
    const { authentication } = useSelector((state) => state.user);

    // If the user is authenticated, redirect them to the home page or another appropriate page
    if (authentication) {
        return <Navigate to="/" replace />;
    }

    // If not authenticated, render the children components (e.g., Login or Register)
    return children;
}
