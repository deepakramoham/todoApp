import { useState, useRef, useEffect } from "react";
import Input from "../../components/Input";
import styles from "./Auth.module.css";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { register } from "./authThunks";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
const SignUp = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const inputRef = useRef(null);

  const { loading } = useSelector((state) => state.authState);

  const dispatch = useDispatch();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleSubmit = async () => {
    if (!formValues?.name) {
      setFormErrors((prevValues) => ({
        ...prevValues,
        name: "Name is required",
      }));
      return;
    }
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

    dispatch(register(formValues));
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
            name={"name"}
            value={formValues?.name}
            placeholder={"your name..."}
            handleInputChange={handleInputChange}
            error={formErrors?.name}
          />
        </div>
        <div>
          <Input
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
            <Link to="/login">
              <span>Already User ?</span>
            </Link>
          </div>
          <div>
            <Button
              className="btn btn-primary"
              handleClick={handleSubmit}
              buttonText="Register"
            />
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default SignUp;
