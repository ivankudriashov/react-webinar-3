import {memo} from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({isAuth, children, url}) {
  if(isAuth) {
    return <Navigate to={url} />;
  }

  return (
    children
  );
}

export default memo(ProtectedRoute);
