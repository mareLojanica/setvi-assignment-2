import { lazy } from "react";
import { Outlet, type RouteObject } from "react-router-dom";
import Loader from "../../ui/components/Loader";
import { ReportsProvider } from "../../providers/ReportsProvider.tsx";
import { REPORT_ROUTES } from "../../constants/routes.ts";

const ReportDashboardScreen = Loader(
  lazy(() => import("../screens/ReportDashboardScreen.tsx"))
);
const ReportEditScreen = Loader(
  lazy(() => import("../screens/ReportEditScreen"))
);
const ReportCreatePage = Loader(
  lazy(() => import("../screens/ReportCreateScreen"))
);
const ReportGenerateDraftScreen = Loader(
  lazy(() => import("../screens/ReportGenerateDraftScreen"))
);
const SummarizeReportScreen = Loader(
  lazy(() => import("../screens/SummarizeReportScreen"))
);
const PreviewReportScreen = Loader(
  lazy(() => import("../screens/PreviewReportScreen"))
);
const reportRoutes: RouteObject = {
  path: REPORT_ROUTES.BASE,
  element: (
    <ReportsProvider>
      <Outlet />
    </ReportsProvider>
  ),
  children: [
    { path: "", element: <ReportDashboardScreen /> },
    { path: REPORT_ROUTES.CREATE, element: <ReportCreatePage /> },
    {
      path: REPORT_ROUTES.GENERATE_DRAFT,
      element: <ReportGenerateDraftScreen />,
    },
    {
      path: "summarize/:reportId",
      element: <SummarizeReportScreen />,
    },
    {
      path: "preview/:reportId",
      element: <PreviewReportScreen />,
    },
    {
      path: `:reportId`,
      element: <ReportEditScreen />,
    },
  ],
};

export default reportRoutes;
