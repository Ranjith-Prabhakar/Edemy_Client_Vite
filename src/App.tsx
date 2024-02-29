import "./assets/App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/User_Instructro/Home";
import PageNotFound from "./pages/PageNotFound";
import UserRoute from "./Routes/InstructorRoute";
import useGetUser from "./hooks/useGetUser";
import AuthRoute from "./Routes/AuthRoute";
import AdminRoute from "./Routes/AdminRoute";
import InstructorRoute from "./Routes/InstructorRoute";

const App = () => {
  const userName = useGetUser().name;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth/*"
          element={userName ? <Navigate to={"/"} /> : <AuthRoute />}
        />
        <Route path="/user/*" element={<UserRoute />} />
        <Route path="/instructor/*" element={<InstructorRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
