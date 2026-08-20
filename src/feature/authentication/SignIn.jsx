import { useState, useRef, useEffect } from "react";
import Input from "../../components/Input";
import styles from "./Auth.module.css";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authThunks";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { resetStatus } from "./authSlice";
import Loading from "../../components/Loading";

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, auth, loading } = useSelector((state) => state.authState);
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (!error && auth?.role && auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
      if (auth?.role === 1000) navigate("/to-do-app");
      if (auth?.role === 1100) navigate("/admin-dashboard");
    }
    if (error && !auth && !auth?.role) {
      toast.error(error?.error || "Something went wrong . . .");
      dispatch(resetStatus());
    }
  }, [auth, auth?.role, error]);

  const handleSubmit = async () => {
    if (!formValues?.email) {
      setFormErrors((prevValues) => ({
        ...prevValues,
        email: "Email is required",
      }));
      return;
    }
    if (!formValues?.password) {
      setFormErrors((prevValues) => ({
        ...prevValues,
        password: "Password is required",
      }));
      return;
    }

    dispatch(login(formValues));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    setFormErrors((prevValues) => ({ ...prevValues, [name]: "" }));
  };

  return (
    <div className={styles["outer-container"]}>
      <div className="w-100">
        <div className="d-flex justify-content-center">
          <div className="fs-2 fw-bold mb-2 text-light">Todo App</div>
        </div>
        <div>
          <Input
            inputRef={inputRef}
            name={"email"}
            value={formValues?.email}
            placeholder={"your email..."}
            handleInputChange={handleInputChange}
            error={formErrors?.email}
          />
        </div>

        <div className="mt-2">
          <Input
            name={"password"}
            type={"password"}
            value={formValues?.password}
            placeholder={"your password..."}
            handleInputChange={handleInputChange}
            error={formErrors?.password}
          />
        </div>
        <div className="d-flex justify-content-between mt-2">
          <div>
            <Link to="/register">
              <span>Register</span>
            </Link>
          </div>
          <div>
            <Button
              className="btn btn-primary"
              handleClick={handleSubmit}
              buttonText="Login"
            />
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default SignIn;
