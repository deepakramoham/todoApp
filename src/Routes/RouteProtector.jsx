import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RouteProtector = ({ role }) => {
  const { auth } = useSelector((state) => state.authState) || {};

  return (
    <>
      {auth?.accessToken && auth?.role === role ? (
        <Outlet />
      ) : auth?.accessToken && auth?.role !== role ? (
        <Navigate to="/unauthorized" replace />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default RouteProtector;
