import { Navigate, type RouteObject } from "react-router-dom";
import reportRoutes from "./feature/routes";
import NotFoundScreen from "./common/screens/NotFoundScreen";
import { REPORT_ROUTES } from "./constants/routes";
import MainLayout from "./ui/layout/MainLayout";
import ServerOffline from "./common/screens/ServerOffline";

const mainRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={REPORT_ROUTES.LIST} replace />,
      },
      reportRoutes,
      {
        path: "server-offline",
        element: <ServerOffline />,
      },
      {
        path: "*",
        element: <NotFoundScreen />,
      },
    ],
  },
];

export default mainRoutes;
