import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "../feature/authentication/SignIn";
import SignUp from "../feature/authentication/SignUp";
import ErrorBoundary from "./ErrorBoundary";
import RouteProtector from "./RouteProtector";
import Todo from "../feature/user/Todo";
import UserProfile from "../feature/authentication/UserProfile";
import AdminDashBoard from "../feature/manage_user/AdminDashBoard";
import Unauthorized from "../pages/Unauthorized";

const router = createBrowserRouter([
  { path: "/", Component: SignIn, ErrorBoundary: ErrorBoundary },
  { path: "/login", Component: SignIn, ErrorBoundary: ErrorBoundary },
  { path: "/register", Component: SignUp, ErrorBoundary: ErrorBoundary },
  {
    Component: App,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        element: <RouteProtector role={1000} />,
        ErrorBoundary: ErrorBoundary,
        children: [
          {
            path: "/to-do-app",
            Component: Todo,
          },
          {
            path: "/user-profile",
            Component: UserProfile,
          },
        ],
      },
      {
        element: <RouteProtector role={1100} />,
        ErrorBoundary: ErrorBoundary,
        children: [
          {
            path: "/admin-dashboard",
            Component: AdminDashBoard,
          },
        ],
      },
    ],
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
    ErrorBoundary: ErrorBoundary,
  },
]);

export default router;
