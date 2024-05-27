import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./useAuth"; // Replace with your auth hook

interface PrivateRouteProps {
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isLoggedIn = false;

  return isLoggedIn ? (
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
