import { ReactNode, useEffect } from "react";

import { useLocation, useNavigate } from "react-router";
import useUserStore from "../store/zustandStore";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user.name);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (!user) navigate("/");

    // if (userToken && location.pathname === "/") {
    //   navigate("/blogs");
    // }
  }, [location, navigate, user]);

  return children;
};

export default ProtectedRoute;
