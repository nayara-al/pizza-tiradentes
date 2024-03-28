import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/auth";

export function PrivateRoutes() {
  const { user } = useAuth();

  const isAuthenticated = (): boolean => {
    if (user) return true;

    return false;
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
