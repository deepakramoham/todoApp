import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../feature/authentication/authSlice";
import Button from "../Button";
import { Link } from "react-router-dom";
const NavBar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state?.authState);
  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(logOut());
  };
  return (
    <nav className="d-flex justify-content-between align-items-center p-2 bg-dark">
      <div className="text-white fw-bold fs-5">Todo App</div>
      <div className="d-flex gap-2 align-items-center">
        <div className="text-info">
          {auth?.role === 1000 ? (
            <Link to="/user-profile">
              <span>{auth?.name}</span>
            </Link>
          ) : (
            <span>{auth?.name}</span>
          )}
        </div>
        <div>
          <Button
            handleClick={handleLogout}
            className="btn btn-warning"
            buttonText={"LogOut"}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
