import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "../feature/authentication/SignIn";
import SignUp from "../feature/authentication/SignUp";
import ErrorBoundary from "./ErrorBoundary";
import RouteProtector from "./RouteProtector";
// import Todo from "../feature/user/Todo";
import UserProfile from "../feature/authentication/UserProfile";
// import AdminDashBoard from "../feature/manage_user/AdminDashBoard";
import Unauthorized from "../pages/Unauthorized";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const Todo = lazy(() => import("../feature/user/Todo"));
const AdminDashBoard = lazy(
  () => import("../feature/manage_user/AdminDashBoard"),
);

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
            element: (
              <Suspense fallback={<Loading />}>
                <Todo />
              </Suspense>
            ),
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
            Component: (
              <Suspense fallback={<Loading />}>
                <AdminDashBoard />
              </Suspense>
            ),
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
