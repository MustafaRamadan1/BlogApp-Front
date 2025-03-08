import { Link } from "react-router";
import useUserStore from "../store/zustandStore";
import Cookies from "js-cookie";

const NavBar = () => {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  return (
    <nav className="p-4 bg-yellow-400 text-sm font-medium flex justify-between">
      <Link to="/posts">
        <h2>Hello , {user?.name}</h2>
      </Link>
      <button
        className="text-xs cursor-pointer"
        onClick={() => {
          updateUser({ name: "", email: "" });
          Cookies.remove("userToken");
          localStorage.removeItem("user");
        }}
      >
        Sign out
      </button>
    </nav>
  );
};

export default NavBar;
