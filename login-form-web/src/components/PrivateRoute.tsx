import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./useAuth"; // Replace with your auth hook

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return false ? (
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
