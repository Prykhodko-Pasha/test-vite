import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../scripts";

const PrivateRoutes = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/"} />;
};

export default PrivateRoutes;
