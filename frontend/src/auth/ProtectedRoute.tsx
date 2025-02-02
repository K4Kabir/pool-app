import { Navigate } from "react-router-dom"


interface IProtectedRouteProps {
    isSignedIn?: boolean
    navigateTo: string
    children: React.ReactNode
}

const ProtectedRoute = ({ isSignedIn, navigateTo, children }: IProtectedRouteProps) => {
    if (!isSignedIn) {
        return <Navigate to={navigateTo} />;
    }
    return children;
};

export default ProtectedRoute;


