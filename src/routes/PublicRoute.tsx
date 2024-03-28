import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook/auth";

export default function PublicRoutes() {
  const { user } = useAuth();

  const isAuthenticated = (): boolean => {
    if (user) return true;

    return false;
  };

  return isAuthenticated() ? <Navigate to="/home" /> : <Outlet />;
}
