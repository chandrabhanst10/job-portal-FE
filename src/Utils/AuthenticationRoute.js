import { useSelector } from 'react-redux';
import { Navigate, } from 'react-router-dom';

export const AuthenticationRoute = ({ children }) => {
    const { authentication } = useSelector((state) => state.user);
    return authentication ? children : <Navigate to="/login" />;
}
export const AuthRoute = ({ children }) => {
    const { authentication } = useSelector((state) => state.user);
    return authentication ? <Navigate to="/" replace /> : children;
};
export const AuthSubscription = ({ children }) => {
    const { showSubscriptionHeader } = useSelector((state) => state.user);
    return showSubscriptionHeader ? <Navigate to="/" replace /> : children;
};
