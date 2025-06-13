import MainLayout from "./ui/layout/MainLayout";
import ReportsDashboard from "./feature/ReportsDashboard/components/ReportsDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <MainLayout>
      <ReportsDashboard />
      <ToastContainer position="top-right" autoClose={3000} />
    </MainLayout>
  );
};

export default App;
