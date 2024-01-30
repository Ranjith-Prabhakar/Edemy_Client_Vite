import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminDash from "./pages/AdminDashBoard";
type Props = {};

const App = (props: Props) => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admin_dashbord" element={<AdminDash />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
