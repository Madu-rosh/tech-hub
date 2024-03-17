import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the import path as necessary

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
