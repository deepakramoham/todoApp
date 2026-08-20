import authReducer from "../../feature/authentication/authSlice";
import taskReducer from "../../feature/user/taskSlice";
import userReducer from "../../feature/manage_user/userSlice";

const rootReducer = {
  authState: authReducer,
  taskState: taskReducer,
  userState: userReducer,
};

export default rootReducer;
