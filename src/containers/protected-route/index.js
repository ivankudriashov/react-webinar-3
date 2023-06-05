import {memo} from "react";
import { Navigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

function ProtectedRoute({isAuth, children, url}) {
  const select = useSelector(state => ({
    loading: state.login.loading,
    // isAuth: state.login.isAuth,
  }));

  if(select.loading) {
    return null
  }

  // Захардкоженные переходы
  // if(select.isAuth) {
  //   return <Navigate to={'/'} />;
  // }

  // if(!select.isAuth) {
  //   return <Navigate to={'/login'} />;
  // }

  if(isAuth) {
    return <Navigate to={url} />;
  }

  return (
    children
  );
}

export default memo(ProtectedRoute);
