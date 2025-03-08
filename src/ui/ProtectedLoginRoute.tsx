import { ReactNode, useEffect } from "react";

import { useLocation, useNavigate } from "react-router";
import useUserStore from "../store/zustandStore";

const ProtectedLoginRoute = ({ children }: { children: ReactNode }) => {
  
  const user = useUserStore((state) => state.user.name);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate("/posts");
    }
  }, [location, navigate, user]);

  return children;
};

export default ProtectedLoginRoute;
