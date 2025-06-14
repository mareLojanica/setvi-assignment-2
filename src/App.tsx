import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRoutes } from "react-router-dom";
import mainRoutes from "./app.routes";

const App = () => {
  const routing = useRoutes(mainRoutes);
  return (
    <>
      {routing}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
